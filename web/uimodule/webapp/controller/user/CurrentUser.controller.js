sap.ui.define([
    "../BaseController",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.user.CurrentUser", {
            onInit: function () {
                this._setDefault();
            },
            _setDefault: function () {
                const oView = this.getView();
                oView.setModel(new sap.ui.model.json.JSONModel(), "user");
                oView.setModel(new sap.ui.model.json.JSONModel(), "roles");
                this._userModel = oView.getModel("user");
                this._rolesModel = oView.getModel("roles");
                this.getUser();
                this.getRoles();
            },
            getUser: function () {
                this.callSDK("GET", "/app/users/currentUser", undefined, this.setUser);
            },
            getRoles: function () {
                this.callSDK("GET", "/app/group", undefined, this.setRoles);
            },
            setUser: function (data, xhr) {
                this._userModel.setProperty("/", data);
                this.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
            },
            setRoles: function (data) {
                this._rolesModel.setProperty("/", data);
            },
            onAddUserRoleCollection: function (oEvent) {
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
                    this.callSDK("POST", "/app/group", oGroups, this.getUser);
                });
            },
            onOpenDialog: function () {
                let aRoles = this._rolesModel.getProperty("/resources");
                let aUserRoles = this._userModel.getProperty("/groups");
                const newRoles = aRoles.filter(role => {
                    const iIndex = aUserRoles.findIndex(userRole => role.id === userRole.value);
                    if (iIndex > -1) return false;
                    return true;
                });

                this._rolesModel.setProperty("/resources", newRoles);

                const oView = this.getView();

                if (!this.oDialog) {
                    this.oDialog = Fragment.load({
                        name: `com.myorg.myUI5App.view.user.dialog.RolesDialog`,
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
            onDeleteUserRole: async function (oEvent) {
                let oListItem = oEvent.getParameter("listItem");
                let bCheck = await this.showWarningBox();
                let oDelete = {
                    groupId: oListItem.getTitle(),
                    userId: this._userModel.getProperty("/id")
                };

                if (bCheck) {
                    this.callSDK("DELETE", "/app/group", oDelete, this.getUser);
                }
            },
            onCreateUserRole: function (oEvent) {
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
                    this.callSDK("POST", "/app/group", oGroups, this.getUser);
                });
            }
        });
    });
