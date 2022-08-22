sap.ui.define([
    "../BaseController",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.role.RoleCollections", {
            onInit: function () {
                this._setDefault();
            },
            _setDefault: function () {
                let oView = this.getView();
                oView.setModel(new sap.ui.model.json.JSONModel(), "users");
                //oView.setModel(new sap.ui.model.json.JSONModel(), "usersFilter");
                oView.setModel(new sap.ui.model.json.JSONModel(), "roles");
                oView.setModel(new sap.ui.model.json.JSONModel(this.getRoleTemplate()), "role");
                this._usersModel = oView.getModel("users");
                //this._usersFilterModel = oView.getModel("usersFilter");
                this._rolesModel = oView.getModel("roles");
                this._roleModel = oView.getModel("role");
                this._FCL = oView.byId("fcl");
                this.getRoleColleactions();
                this.getUsers();
                this._roleState = "Create";
            },
            getUsers: function () {
                this.callSDK("GET", "/app/users", undefined, this.setUsers);
            },
            setUsers: function (data) {
                this._usersModel.setProperty("/", data);
            },
            getRoleColleactions: function () {
                this.callSDK("GET", "/app/group", undefined, this.setRoleColleactions);
            },
            setRoleColleactions: function (data, xhr) {
                this.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
                this._rolesModel.setProperty("/", data);
                if (this._rolePath) this.setRoleColleaction();
            },
            setRoleColleaction: function () {
                this._roleModel.setProperty("/", this.userFilter(this._rolePath));
            },
            getRoleTemplate: function () {
                return {
                    "name": "",
                    "description": "",
                };
            },
            onOpenDialog: function (oEvent) {
                let oView = this.getView();
                let sDialogName = this.getCustomDataKey(oEvent.getSource());
                let sDialogValue = this.getCustomDataValue(oEvent.getSource());
                this._dialogName = sDialogName;

                switch (sDialogValue) {
                    case "Create":
                        this._roleModel.setProperty("/", this.getRoleTemplate());
                        this._FCL.getLayout() !== "OneColumn" ? this.onFCLOneColumn() : "";
                        this._roleState = "Create";
                        break;
                    case "Edit":
                        this._roleState = "Edit";
                        break;
                    case "addUser":
                        let aUsers = this._usersModel.getProperty("/resources");
                        let aRoleUsers = this._roleModel.getProperty("/members");
                        let newUsers = aUsers.filter(user => {
                            let iIndex = aRoleUsers.findIndex(userRole => user.id === userRole.id);
                            if (iIndex > -1) return false;
                            return true;
                        });

                        //add 했을때 Users는 다시 콜하지 않기때문에 기존데이터는 변경하면 안됨
                        this._usersModel.setProperty("/filter", newUsers);
                        break;
                }

                if (!this[sDialogName]) {
                    this[sDialogName] = Fragment.load({
                        name: `com.myorg.myUI5App.view.role.dialog.${sDialogName}`,
                        controller: this
                    });
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
            onSubmit: function () {
                let oRole = this._roleModel.getProperty("/");
                this.callSDK("POST", "/app/role-colleaction", oRole, this.getRoleColleactions);
            },
            onRoleItemPress: function (oEvent) {
                let oListItem = oEvent.getParameter("listItem");
                let sPath = oListItem.getBindingContextPath("roles");
                this._rolePath = sPath;
                this._roleModel.setProperty("/", this.userFilter(sPath));
                this._FCL.getLayout() === "OneColumn" ? this.onFCLTwoColumn() : "";
            },
            userFilter: function (sPath) {
                let aUsers = this._usersModel.getProperty("/resources");
                let oBinding = this._rolesModel.getProperty(sPath);
                let aBindingUsers = oBinding.members;

                //role에는 아이디만들어오고 이메일이나 이름이 안들어와서..
                let aUserFilter = aUsers.filter(oUser => {
                    return aBindingUsers.some(oBindingUser => {
                        if (oBindingUser.value) {
                            return oUser.id === oBindingUser.value
                        }
                        return oUser.id === oBindingUser.id
                    });
                });

                oBinding.members = aUserFilter;
                return oBinding;
            },
            deleteRole: async function () {
                let sRoleId = this._roleModel.getProperty("/id");
                let bCheck = await this.showWarningBox();

                if (bCheck) {
                    this.callSDK("DELETE", "/app/group/role", { id: sRoleId }, this.getRoleColleactions);
                    this.onFCLOneColumn();
                }
            },
            onAddUserRole: function (oEvent) {
                let oSelectedItems = oEvent.getParameter("selectedItems");
                let aUserId = oSelectedItems.map(selectedItem => selectedItem.getTitle());
                let sRoleId = this._roleModel.getProperty("/id");

                aUserId.forEach(userId => {
                    let oGroups = {
                        id: sRoleId,
                        group: {
                            "type": "USER",
                            "value": userId,
                            "origin": "sap.default"
                        }
                    }
                    this.callSDK("POST", "/app/group", oGroups, this.getRoleColleactions);
                })
            },
            deleteRoleUser: async function (oEvent) {
                let oListItem = oEvent.getParameter("listItem");
                let bCheck = await this.showWarningBox();
                console.log(oListItem);

                let oDelete = {
                    groupId: this._roleModel.getProperty("/id"),
                    userId: this._roleModel.getProperty(`${oListItem.getBindingContextPath("role")}/id`)
                };

                if (bCheck) {
                    this.callSDK("DELETE", "/app/group", oDelete, this.getRoleColleactions);
                }
            },
        });
    });
