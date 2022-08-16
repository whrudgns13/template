sap.ui.define(
    [
        "../BaseController",
        "sap/ui/core/Fragment",
        "sap/m/MessageBox"
    ],
    function (Controller, Fragment, MessageBox) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.user.Users", {
            onInit: function () {
                this._setDefault();
            },
            getUserObj: function () {
                return {
                    "userName": "",
                    "name": {
                        "familyName": "",
                        "givenName": ""
                    },
                    "emails": [
                        {
                            "type": "string",
                            "value": "",
                            "primary": true
                        }
                    ],
                    "origin": "sap.default",
                    "schemas": ["urn:scim:schemas:core:1.0"],
                    "phoneNumbers": [
                        {
                            "value": ""
                        }
                    ]
                }
            },
            _setDefault: function () {
                const oView = this.getView();
                const oUserModel = new sap.ui.model.json.JSONModel({ user: this.getUserObj(), userState: "edit" });
                const oRolesModel = new sap.ui.model.json.JSONModel();
                oView.setModel(oUserModel, "user");
                oView.setModel(oRolesModel,"roles");
                this._userModel = oView.getModel("user");
                this._rolesModel = oView.getModel("roles");
                this._FCL = this.getView().byId("fcl");
                this.getUsers();
                this.getRoles();
            },
            getRoles : function(){
                const _self = this;
                jQuery.ajax({
                    url: "/app/group",
                    type: "GET",
                    success: function (data, textStatus, xhr) {
                        console.log(data);
                        _self._rolesModel.setProperty("/",data);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },
            getUsers: function () {
                const _self = this;

                //헤더에 CSRF-Token : "Fetch"하면 response header에서 csrfToken이 옴
                jQuery.ajax({
                    url: "/app/users",
                    type: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (data, textStatus, xhr) {
                        _self.csrfToken = xhr.getResponseHeader("x-csrf-token");
                        _self._userModel.setProperty("/users", data);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },
            onUserItemPress : function(oEvent){
                const oListItem = oEvent.getParameter("listItem");
                const sPath = oListItem.getBindingContextPath("user");
                const bindingObj = JSON.parse(JSON.stringify(this._userModel.getProperty(sPath)));
                this._userModel.setProperty("/user",bindingObj);
                this._FCL.getLayout()==="OneColumn" ? this.onFCLTwoColumn() : "";
            },
            onCreateDialog: function (oEvent) {
                this._userModel.setProperty("/user", this.getUserObj());
                this._userModel.setProperty("/userState", "create");
                this._FCL.getLayout()!=="OneColumn" ? this.onFCLOneColumn() : "";
                this._dialogName = this.getCustomDataKey(oEvent.getSource());
                this.onOpenDialog();
            },
            onEditDialog: function (oEvent) {
                this._userModel.setProperty("/userState", "edit");
                this._dialogName = this.getCustomDataKey(oEvent.getSource());
                this.onOpenDialog(oEvent);
            },
            getCustomDataKey(oControl){
                const sCustomDataKey = oControl.getCustomData()[0].getKey();
                return sCustomDataKey;
            },
            onSubmit: function () {
                if(!this.validationCheck()) return;
                const oUser = this._userModel.getProperty("/user");
                const sUserState = this._userModel.getProperty("/userState");
                oUser.userName = `${oUser.name.familyName} ${oUser.name.givenName}`;
                sUserState === "create" ? this.setUser() : this.editUser();                
            },
            setUser: function () {
                const _self = this;
                const oUser = this._userModel.getProperty("/user");
                oUser.displayName = "displayName test";
                
                //get요청 외에는 csrf-token을 보내줘야 거부안당함
                //approuter에서 csrfProtection를 false로 하면 csrf-token안보내도 됨
                jQuery.ajax({
                    url: "/app/users",
                    type: "POST",
                    data: JSON.stringify(oUser),
                    headers: {
                        'Content-Type': 'application/json',
                        "X-CSRF-Token": _self.csrfToken
                    },
                    success: function (data, status, xhr) {
                        status === "success" ? new sap.m.MessageToast.show("생성 성공") : "";
                        _self.getUsers();
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
                
                this.onClose();
            },
            editUser: function () {
                const _self = this;          
                const oUser = this._userModel.getProperty("/user");

                jQuery.ajax({
                    url: "/app/users",
                    type: "PUT",
                    data: JSON.stringify(oUser),
                    headers: {
                        'Content-Type': 'application/json',
                        "X-CSRF-Token": _self.csrfToken
                    },
                    success: function (data, status, xhr) {
                        status === "success" ? new sap.m.MessageToast.show("변경 성공") : "";
                        _self.getUsers();
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });

                this.onClose();
            },
            deleteUser: async function () {
                const _self = this;
                const sUserId = this._userModel.getProperty("/user").id;
                const bCheck = await this.showWarningBox();

                if (bCheck) {
                    jQuery.ajax({
                        url: "/app/users",
                        type: "DELETE",
                        data: JSON.stringify({ id: sUserId }),
                        headers: {
                            'Content-Type': 'application/json',
                            "X-CSRF-Token": _self.csrfToken
                        },
                        success: function (data, status, xhr) {
                            status === "success" ? new sap.m.MessageToast.show("삭제 성공") : "";
                            _self.onFCLOneColumn();
                            _self.getUsers();
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });
                }
            },
            showWarningBox: function () {
                return new Promise((resolve, reject) => {
                    MessageBox.alert("정말 삭제하시겠습니까?", {
                        icon: "WARNING",
                        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {
                            sAction === "OK" ? resolve(true) : resolve(false);
                        }
                    });
                });
            },
            onRoleConfirm : function(oEvent){
                const oSelectedItems = oEvent.getParameter("selectedItems");
            },
            onOpenDialog: function (oEvent) {
                if(oEvent) this._dialogName = this.getCustomDataKey(oEvent.getSource());
                
                const oView = this.getView();
                const sDialogName = this._dialogName;
                
                if (!this[sDialogName]) {
                    this[sDialogName] = Fragment.load({
                        name: `com.myorg.myUI5App.view.user.${sDialogName}`,
                        controller: this
                    })
                }

                this[sDialogName].then(dialog => {
                    oView.addDependent(dialog);
                    dialog.open();
                });
            },
            onClose: function () {
                const sDialogName = this._dialogName;
                this[sDialogName].then(dialog => dialog.close());
            }
        });
    }
);
