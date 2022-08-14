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
                this._FCL = this.getView().byId("fcl");
                const oView = this.getView();
                const oUserModel = new sap.ui.model.json.JSONModel({ user: this.getUserObj(), userState: "edit" });
                oView.setModel(oUserModel, "user");
                this._userModel = oView.getModel("user");
                this.getUsers();
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
            onCreateDialog: function () {
                this._userModel.setProperty("/user", this.getUserObj());
                this._userModel.setProperty("/userState", "create");
                this._FCL.getLayout()!=="OneColumn" ? this.onFCLOneColumn() : "";
                this.onOpenUserDialog();
            },
            onEditDialog: function () {
                this._userModel.setProperty("/userState", "edit");
                this.onOpenUserDialog();
            },
            onSubmit: function () {
                const sUserState = this._userModel.getProperty("/userState");
                sUserState === "create" ? this.setUser() : this.editUser();
            },
            setUser: function () {
                if(!this.validationCheck()) return;
                const _self = this;
                this.addUserName();
                
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

                this._userModel.setProperty("/user", this.getUserObj());
                this.onClose();
            },
            editUser: function () {
                if(!this.validationCheck()) return;
                const _self = this;               
                this.addUserName();
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
            addUserName : function(){              
                const oUser = this._userModel.getProperty("/user");
                oUser.userName = `${oUser.name.familyName} ${oUser.name.givenName}`;
            },
            deleteUser: async function (oEvent) {
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
            onOpenUserDialog: function () {
                const oView = this.getView();

                if (!this.oDialog) {
                    this.oDialog = Fragment.load({
                        name: "com.myorg.myUI5App.view.UserDialog",
                        controller: this
                    })
                }

                this.oDialog.then(dialog => {
                    oView.addDependent(dialog);
                    dialog.open();
                });
            },
            onClose: function () {
                this.oDialog.then(dialog => dialog.close());
            },
            validationCheck: function () {
                const mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
                let oUserFormContent = sap.ui.getCore().byId("userForm").getContent();
                let oUserFormInputs = oUserFormContent.filter(oControl => oControl.getMetadata().getElementName() === "sap.m.Input");
                let bCheck = true;
                
                //forEach에서 break나 continue사용못해서 some
                //return false 면 continue / true break;
                oUserFormInputs.some( oInput => {
                    let oInputValue = oInput.getValue();
                    
                    if (!oInputValue) {
                        oInput.setValueState("Error");
                        bCheck = false;
                        return false;
                    }

                    if (oInput.getType() === "Email" && !oInputValue.match(mailregex)) {
                        console.log(`emails`);
                        oInput.setValueState("Error");
                        bCheck = false;
                        return false;
                    }
                    
                    oInput.setValueState("None");
                })
                return bCheck;
            }
        });
    }
);
