sap.ui.define([
    "./UserCommon",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.user.Roles", {
            onInit: function () {
                this._setDefault();
            },
            _setDefault: function () {
                let oView = this.getView();
                oView.setModel(new sap.ui.model.json.JSONModel(), "users");
                oView.setModel(new sap.ui.model.json.JSONModel(), "roles");
                oView.setModel(new sap.ui.model.json.JSONModel(this.getRoleTemplate()), "role");
                this._usersModel = oView.getModel("users");
                this._rolesModel = oView.getModel("roles");
                this._roleModel = oView.getModel("role");
                this._FCL = oView.byId("fcl");
                this.getRoles();
                this.getUsers();

            },
            getUsers: function () {
                this.callSDK("GET", "/app/users", undefined, this.setUsers);
            },
            getRoles: function () {
                this.callSDK("GET", "/app/group", undefined, this.setRoles);
            },
            setRoles: function (data, xhr) {
                this.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
                this._rolesModel.setProperty("/", data);
            },
            setUsers: function (data) {
                this._usersModel.setProperty("/", data);
            },
            getRoleTemplate: function () {
                return {
                    "displayName": "",
                    "description": "",
                };
            },
            onOpenDialog: function () {
                let oView = this.getView();

                if (!this.oDialog) {
                    this.oDialog = Fragment.load({
                        name: `com.myorg.myUI5App.view.user.CreateRoleDialog`,
                        controller: this
                    });
                }

                this.oDialog.then(dialog => {
                    oView.addDependent(dialog);
                    dialog.open();
                });
            },
            onClose: function () {
                this.oDialog.then(dialog => dialog.close());
            },
            onSubmit: function () {
                let oRole = this._roleModel.getProperty("/");
                this.callSDK("POST", "/app/group/role", oRole, this.getRoles);
            },
            onRoleItemPress: function (oEvent) {
                let oListItem = oEvent.getParameter("listItem");
                let sPath = oListItem.getBindingContextPath("roles");
                let oBinding = this._rolesModel.getProperty(`${sPath}`);
                let aUsers = this._usersModel.getProperty("/resources");
                let aBindingUsers = oBinding.members;

                //role에는 아이디만들어오고 이메일이나 이름이 안들어와서..
                let aUserFilter = aUsers.filter(oUser => {
                    let iIndex = aBindingUsers.findIndex(oBindingUser => oUser.id === oBindingUser.value);
                    if (iIndex > -1) return true;
                    return false;
                });

                oBinding.members = aUserFilter;
                this._roleModel.setProperty("/members", oBinding);
                this._FCL.getLayout() === "OneColumn" ? this.onFCLTwoColumn() : "";
            }

        });
    });
