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
                let oView = this.getView();
                oView.setModel(new sap.ui.model.json.JSONModel(), "user");
                oView.setModel(new sap.ui.model.json.JSONModel(), "users");
                oView.setModel(new sap.ui.model.json.JSONModel(), "roles");
                this._userState = "Edit";
                this._userModel = oView.getModel("user");
                this._usersModel = oView.getModel("users");
                this._rolesModel = oView.getModel("roles");
                this._FCL = this.getView().byId("fcl");
                this.getUsers();
                this.getRoles();
            },
            getUsers: function () {
                this.callSDK("GET", "/app/users", undefined, this.setUsers);
            },
            getRoles: function () {
                this.callSDK("GET", "/app/group", undefined, this.setRoles);
            },
            setUsers: function (data, xhr) {
                this.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
                this._usersModel.setProperty("/", data);
                if (this._userPath) this.setUser();
            },
            setUser: function () {
                this._userModel.setProperty("/", this._usersModel.getProperty(this._userPath));
            },
            setRoles: function (data) {
                this._rolesModel.setProperty("/", data);
            },
            onUserItemPress: function (oEvent) {
                let oListItem = oEvent.getParameter("listItem");
                let sPath = oListItem.getBindingContextPath("users");
                let oBinding = JSON.parse(JSON.stringify(this._usersModel.getProperty(sPath)));
                this._userModel.setProperty("/", oBinding);
                this._userPath = sPath;
                this._FCL.getLayout() === "OneColumn" ? this.onFCLTwoColumn() : "";
            },
            onSubmit: function () {
                if (!this.validationCheck()) return;
                let oUser = this._userModel.getProperty("/");
                oUser.userName = `${oUser.name.familyName} ${oUser.name.givenName}`;
                this._userState === "create" ? this.saveUser() : this.editUser();
            },
            saveUser: function () {
                let oUser = this._userModel.getProperty("/");
                oUser.displayName = "displayName test";
                this.callSDK("POST", "/app/users", oUser, this.getUsers);
                this.onClose();
            },
            editUser: function () {
                let oUser = this._userModel.getProperty("/");
                this.callSDK("PUT", "/app/users", oUser, this.getUsers);
                this.onClose();
            },
            deleteUser: async function () {
                let sUserId = this._userModel.getProperty("/id");
                let bCheck = await this.showWarningBox();

                if (bCheck) {
                    this.callSDK("DELETE", "/app/users", { id: sUserId }, this.getUsers);
                }
            },
            onOpenDialog: function (oEvent) {
                let sDialogName = this.getCustomDataKey(oEvent.getSource());
                let sDialogValue = this.getCustomDataValue(oEvent.getSource());
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
                        let newRoles = aRoles.filter(role => {
                            let iIndex = aUserRoles.findIndex(userRole => role.id === userRole.value);
                            if (iIndex > -1) return false;
                            return true;
                        })

                        this._rolesModel.setProperty("/resources", newRoles);
                        break;
                }

                let oView = this.getView();

                if (!this[sDialogName]) {
                    this[sDialogName] = Fragment.load({
                        name: `com.myorg.myUI5App.view.user.dialog.${sDialogName}`,
                        controller: this
                    })
                }

                this[sDialogName].then(dialog => {
                    oView.addDependent(dialog);
                    dialog.open();
                });
            },
            onClose: function () {
                let sDialogName = this._dialogName;
                this[sDialogName].then(dialog => dialog.close());
            },
            onDeleteUserRole: async function (oEvent) {
                let oListItem = oEvent.getParameter("listItem");
                let bCheck = await this.showWarningBox();
                let oDelete = {
                    groupId: oListItem.getTitle(),
                    userId: this._userModel.getProperty("/id")
                };

                if (bCheck) {
                    this.callSDK("DELETE", "/app/group", oDelete, this.getUsers);
                }
            },
            onAddUserRole: function (oEvent) {
                let oSelectedItems = oEvent.getParameter("selectedItems");
                let aRoleId = oSelectedItems.map(selectedItem => selectedItem.getTitle());
                let sUserId = this._userModel.getProperty("/id");

                aRoleId.forEach(roleId => {
                    let oGroups = {
                        id: roleId,
                        group: {
                            "type": "USER",
                            "value": sUserId,
                            "origin": "sap.default"
                        }
                    };
                    this.callSDK("POST", "/app/group", oGroups, this.getUsers);
                });
            }
        });
    }
);
