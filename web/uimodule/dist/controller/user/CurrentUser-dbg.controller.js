sap.ui.define([
    "../BaseController",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment ,MessageBox) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.user.CurrentUser", {
            onInit: function () {
                this._setDefault();
            },
            _setDefault: function () {
                const oView = this.getView();
                const oUserModel = new sap.ui.model.json.JSONModel({ user: {}});
                const oRolesModel = new sap.ui.model.json.JSONModel();
                oView.setModel(oUserModel, "user");
                oView.setModel(oRolesModel, "roles");
                this._userModel = oView.getModel("user");
                this._rolesModel = oView.getModel("roles");
                this.callSDK("GET",{},"/app/users/currentUser");
                this.callSDK("GET",{},"/app/group");
            },
            onDeleteUserRole: async function (oEvent) {
                const oListItem = oEvent.getParameter("listItem");
                const bCheck = await this.showWarningBox();
                const oDelete = {
                    groupId: oListItem.getTitle(),
                    userId: this._userModel.getProperty("/user/id")
                };

                if (bCheck) {
                    this.callSDK("DELETE", oDelete, "/app/group");
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
                    this.callSDK("POST", oGroups, "/app/group");
                });
            },
            onOpenDialog: function (oEvent) {
                let aRoles = this._rolesModel.getProperty("/resources");
                let aUserRoles = this._userModel.getProperty("/user/groups");
                const newRoles = aRoles.filter(role => {
                    const iIndex = aUserRoles.findIndex(userRole => role.id === userRole.value);
                    if (iIndex > -1) return false;
                    return true;
                });

                this._rolesModel.setProperty("/resources", newRoles);

                const oView = this.getView();

                if (!this.oDialog) {
                    this.oDialog = Fragment.load({
                        name: `com.myorg.myUI5App.view.user.RoleDialog`,
                        controller: this
                    })
                }

                this.oDialog.then(dialog => {
                    oView.addDependent(dialog);
                    dialog.open();
                });
            },
            onRoleSearch: function (oEvent) {
                const sValue = oEvent.getParameter("value");
                const oFilter = new sap.ui.model.Filter("id", "Contains", sValue);
                const oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter([oFilter]);
            },
            onClose: function () {
                this.oDialog.then(dialog => dialog.close());
            },
        });
    });
