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
                oView.setModel(oRolesModel, "roles");
                this._userModel = oView.getModel("user");
                this._rolesModel = oView.getModel("roles");
                this._FCL = this.getView().byId("fcl");
                this.callSDK("GET");
                this.callSDK("GET",{},"/app/group");
            },
            onUserItemPress: function (oEvent) {
                const oListItem = oEvent.getParameter("listItem");
                const sPath = oListItem.getBindingContextPath("user");
                const bindingObj = JSON.parse(JSON.stringify(this._userModel.getProperty(sPath)));
                this._userModel.setProperty("/user", bindingObj);
                this._userPath = sPath;
                this._FCL.getLayout() === "OneColumn" ? this.onFCLTwoColumn() : "";
            },
            onSubmit: function () {
                if (!this.validationCheck()) return;
                const oUser = this._userModel.getProperty("/user");
                const sUserState = this._userModel.getProperty("/userState");
                oUser.userName = `${oUser.name.familyName} ${oUser.name.givenName}`;
                sUserState === "create" ? this.saveUser() : this.editUser();
            },
            saveUser: function () {
                const oUser = this._userModel.getProperty("/user");
                oUser.displayName = "displayName test";
                this.callSDK("POST",oUser);
                this.onClose();
            },
            editUser: function () {
                const oUser = this._userModel.getProperty("/user");
                this.callSDK("PUT",oUser);
                this.onClose();
            },
            deleteUser: async function () {
                const _self = this;
                const sUserId = this._userModel.getProperty("/user/id");
                const bCheck = await this.showWarningBox();

                if (bCheck) {
                    this.callSDK("DELETE",{id : sUserId});
                }
            },
            onDeleteUserRole: async function (oEvent) {
                const oListItem = oEvent.getParameter("listItem");
                const bCheck = await this.showWarningBox();
                const oDelete = {
                    groupId: oListItem.getTitle(),
                    userId: this._userModel.getProperty("/user/id")
                };

                if (bCheck) {
                    this.callSDK("DELETE",oDelete,"/app/group");
                }
            },
            onCreateUserRole: function (oEvent) {
                const oSelectedItems = oEvent.getParameter("selectedItems");
                const aRoleId = oSelectedItems.map(selectedItem => selectedItem.getTitle());
                const sUserId = this._userModel.getProperty("/user/id");

                aRoleId.forEach(roleId => {
                    const oGroups = {
                        id: roleId,
                        group: {
                            "type": "USER",
                            "value": sUserId,
                            "origin": "sap.default"
                        }
                    };
                    this.callSDK("POST",oGroups,"/app/group");
                });
            },
            onOpenDialog: function (oEvent) {
                const sDialogName = this.getCustomDataKey(oEvent.getSource());
                const sDialogValue = this.getCustomDataValue(oEvent.getSource());
                this._dialogName = sDialogName;

                switch (sDialogValue) {
                    case "Create":
                        this._userModel.setProperty("/user", this.getUserObj());
                        this._userModel.setProperty("/userState", "create");
                        this._FCL.getLayout() !== "OneColumn" ? this.onFCLOneColumn() : "";
                        break;
                    case "Edit":
                        this._userModel.setProperty("/userState", "edit");
                        break;
                    case "addRole":
                        let aRoles = this._rolesModel.getProperty("/resources");
                        let aUserRoles = this._userModel.getProperty("/user/groups");
                        const newRoles = aRoles.filter(role => {
                            const iIndex = aUserRoles.findIndex(userRole => role.id === userRole.value);
                            if (iIndex > -1) return false;
                            return true;
                        });

                        this._rolesModel.setProperty("/resources", newRoles);
                        break;
                }

                const oView = this.getView();

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
            onRoleSearch : function(oEvent){
                const sValue = oEvent.getParameter("value");
                const oFilter = new sap.ui.model.Filter("id", "Contains", sValue);
                const oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter([oFilter]);
            },
            onClose: function () {
                const sDialogName = this._dialogName;
                this[sDialogName].then(dialog => dialog.close());
            },
            getCustomDataKey(oControl) {
                const sCustomDataKey = oControl.getCustomData()[0].getKey();
                return sCustomDataKey;
            },
            getCustomDataValue(oControl) {
                const sCustomDataValue = oControl.getCustomData()[0].getValue();
                return sCustomDataValue;
            },
        });
    }
);
