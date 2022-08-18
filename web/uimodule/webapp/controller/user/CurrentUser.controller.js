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
                const oUserModel = new sap.ui.model.json.JSONModel();
                const oRolesModel = new sap.ui.model.json.JSONModel();
                oView.setModel(oUserModel, "user");
                oView.setModel(oRolesModel, "roles");
                this._userModel = oView.getModel("user");
                this._rolesModel = oView.getModel("roles");
                this.callSDK("GET",{},"/app/users/currentUser");
                this.callSDK("GET",{},"/app/group");
            },
            onOpenDialog: function (oEvent) {
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
                        name: `com.myorg.myUI5App.view.user.RoleDialog`,
                        controller: this
                    })
                }

                this.oDialog.then(dialog => {
                    oView.addDependent(dialog);
                    dialog.open();
                });
            }
        });
    });
