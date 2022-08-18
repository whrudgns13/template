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
                const oUserModel = new sap.ui.model.json.JSONModel();
                const oUsersModel = new sap.ui.model.json.JSONModel();
                const oRolesModel = new sap.ui.model.json.JSONModel();
                oView.setModel(oUserModel, "user");
                oView.setModel(oUsersModel, "users");
                oView.setModel(oRolesModel, "roles");
                this._userState = "Edit";
                this._userModel = oView.getModel("user");
                this._usersModel = oView.getModel("users");
                this._rolesModel = oView.getModel("roles");
                this._FCL = this.getView().byId("fcl");
                this.callSDK("GET");
                this.callSDK("GET",{},"/app/group");
            },
            onUserItemPress: function (oEvent) {
                const oListItem = oEvent.getParameter("listItem");
                const sPath = oListItem.getBindingContextPath("users");
                const oBinding = JSON.parse(JSON.stringify(this._usersModel.getProperty(sPath)));
                this._userModel.setProperty("/", oBinding);
                this._userPath = sPath;
                this._FCL.getLayout() === "OneColumn" ? this.onFCLTwoColumn() : "";
            },
            onSubmit: function () {
                if (!this.validationCheck()) return;
                const oUser = this._userModel.getProperty("/");
                oUser.userName = `${oUser.name.familyName} ${oUser.name.givenName}`;
                this._userState === "create" ? this.saveUser() : this.editUser();
            },
            saveUser: function () {
                const oUser = this._userModel.getProperty("/");
                oUser.displayName = "displayName test";
                this.callSDK("POST",oUser);
                this.onClose();
            },
            editUser: function () {
                const oUser = this._userModel.getProperty("/");
                this.callSDK("PUT",oUser);
                this.onClose();
            },
            deleteUser: async function () {
                const sUserId = this._userModel.getProperty("/id");
                const bCheck = await this.showWarningBox();

                if (bCheck) {
                    this.callSDK("DELETE",{id : sUserId});
                }
            },
            onOpenDialog: function (oEvent) {
                const sDialogName = this.getCustomDataKey(oEvent.getSource());
                const sDialogValue = this.getCustomDataValue(oEvent.getSource());
                this._dialogName = sDialogName;

                switch (sDialogValue) {
                    case "Create":
                        this._userModel.setProperty("/", this.getUserObj());
                        this._userState = "create";
                        this._FCL.getLayout() !== "OneColumn" ? this.onFCLOneColumn() : "";
                        break;
                    case "Edit":
                        this._userState = "edit";
                        break;
                    case "addRole":
                        let aRoles = this._rolesModel.getProperty("/resources");
                        let aUserRoles = this._userModel.getProperty("/groups");
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
