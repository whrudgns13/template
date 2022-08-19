sap.ui.define([
    "./UserCommon"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.user.UserOverview", {
            onInit: function () {
                this._setDefault();
            },
            _setDefault: function () {
                let oView = this.getView();
                oView.setModel(new sap.ui.model.json.JSONModel(), "users");
                oView.setModel(new sap.ui.model.json.JSONModel(), "roles");
                this._usersModel = oView.getModel("users");
                this._rolesModel = oView.getModel("roles");
                this.getUsers();
                this.getRoles();
            },
            getUsers: function () {
                this.callSDK("GET", "/app/users", undefined, this.setUsers);
            },
            getRoles: function () {
                this.callSDK("GET", "/app/group", undefined, this.setRoles);
            },
            setUsers: function (data) {
                this._usersModel.setProperty("/", data);
            },
            setRoles: function (data) {
                this._rolesModel.setProperty("/", data);
            },
            onTilePress: function (oEvent) {
                let oCustomDataKey = this.getCustomDataKey(oEvent.getSource())
                this.navTo(oCustomDataKey);
            }
        });
    });
