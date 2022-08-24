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
                oView.setModel(new sap.ui.model.json.JSONModel(), "Collections");
                oView.setModel(new sap.ui.model.json.JSONModel(this.getRoleTemplate()), "Collection");
                oView.setModel(new sap.ui.model.json.JSONModel(), "roles");
                oView.setModel(new sap.ui.model.json.JSONModel({ state: "Create" }), "state");
                this._usersModel = oView.getModel("users");
                this._CollectionsModel = oView.getModel("Collections");
                this._CollectionModel = oView.getModel("Collection");
                this._rolesModel = oView.getModel("roles");
                this._state = oView.getModel("state");
                this._FCL = oView.byId("fcl");
                this.getRoleCollections();
                this.getRoles();
                this.getUsers();
            },
            getUsers: function () {
                this.callSDK("GET", "/app/users", undefined, this.setUsers);
            },
            setUsers: function (data) {
                this._usersModel.setProperty("/", data);
            },
            getRoleCollections: function () {
                this.callSDK("GET", "/app/role-collection", undefined, this.setRoleCollections);
            },
            setRoleCollections: function (data, xhr) {
                this.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
                this._CollectionsModel.setProperty("/", data);
                if (this._CollectionPath) this.setRoleCollection();
            },
            setRoleCollection: function () {
                let oCollection = this._CollectionsModel.getProperty(this._CollectionPath);
                this._CollectionModel.setProperty("/", oCollection);
            },
            getRoles: function () {
                this.callSDK("GET", "/app/roles", undefined, this.setRoles);
            },
            setRoles: function (data, xhr) {
                this.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
                this._rolesModel.setProperty("/", data);
            },
            getRoleTemplate: function () {
                return {
                    "name": "",
                    "description": "",
                };
            },
            onSearch: function (oEvent) {
                let oBinding = this.getView().byId("collectionTable").getBinding("items");
                let sValue = oEvent.getParameter("query");
                let aFilters = [];

                if (sValue) {
                    aFilters.push(new sap.ui.model.Filter("name", "Contains", sValue));
                }

                oBinding.filter([aFilters]);

            },
            onOpenDialog: function (oEvent) {
                let oView = this.getView();
                let sDialogName = this.getCustomDataKey(oEvent.getSource());
                let sDialogValue = this.getCustomDataValue(oEvent.getSource());
                this._dialogName = sDialogName;

                switch (sDialogValue) {
                    case "Create":
                        this._CollectionModel.setProperty("/", this.getRoleTemplate());
                        this._FCL.getLayout() !== "OneColumn" ? this.onFCLOneColumn() : "";
                        this._state.setProperty("/state", "Create");
                        break;
                    case "Edit":
                        this._state.setProperty("/state", "Edit");
                        break;
                    case "addUser":
                        let aUsers = this._usersModel.getProperty("/resources");
                        let aCollectionUsers = this._CollectionModel.getProperty("/userReferences");
                        let newUsers = aUsers.filter(user => {
                            let iIndex = aCollectionUsers.findIndex(CollectionUser => user.id === CollectionUser.id);
                            if (iIndex > -1) return false;
                            return true;
                        });

                        //add 했을때 Users는 다시 콜하지 않기때문에 기존데이터는 변경하면 안됨
                        //this._usersModel.setProperty("/resources", newUsers);
                        this._usersModel.setProperty("/filter", newUsers);
                        break;

                    case "addRole":
                        let aRoles = this._rolesModel.getProperty("/");
                        let aCollectionRoles = this._CollectionModel.getProperty("/roleReferences");
                        if (aCollectionRoles) {
                            let newRoles = aRoles.filter(role => {
                                let iIndex = aCollectionRoles.findIndex(CollectionRef => role.name === CollectionRef.name);
                                if (iIndex > -1) return false;
                                return true;
                            });

                            this._rolesModel.setProperty("/", newRoles);
                        }
                        break;
                }

                if (!this[sDialogName]) {
                    this[sDialogName] = Fragment.load({
                        id: this.getView().getId(),
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
                let oForm = this.getView().byId("collectionForm");
                if (!this.validationCheck(oForm)) return;

                let oCollection = this._CollectionModel.getProperty("/");
                if (this._state.getProperty("/state") === "Create") {
                    this.createCollection(oCollection);
                } else {
                    this.editCollection(oCollection); 1
                }

                this.onClose();
            },
            createCollection: function (oCollection) {
                this.callSDK("POST", "/app/role-collection", oCollection, this.getRoleCollections);
            },
            editCollection: function ({ name, description }) {
                let oGroups = { id: name, collection: { description } };
                this.callSDK("PUT", "/app/role-collection", oGroups, this.getRoleCollections);
            },
            onCollectionsItemPress: function (oEvent) {
                let oView = this.getView();
                let oAddRoleBtn = oView.byId("addRoleBtn");
                let oRoleTable = oView.byId("roleTable");
                let oListItem = oEvent.getParameter("listItem");
                let sPath = oListItem.getBindingContextPath("Collections");
                let oCollection = this._CollectionsModel.getProperty(sPath);
                this._CollectionModel.setProperty("/", oCollection);
                this._CollectionPath = sPath;
                this._FCL.getLayout() === "OneColumn" ? this.onFCLTwoColumn() : "";

                //readOnly가 true 이면 수정 못함
                if (oCollection.isReadOnly) {
                    oAddRoleBtn.setEnabled(false);
                    oRoleTable.setMode("None");
                    return;
                }
                oRoleTable.setMode("Delete");
                oAddRoleBtn.setEnabled(true);
            },
            deleteRoleCollection: async function () {
                let sCollectionId = this._CollectionModel.getProperty("/name");
                let bCheck = await this.showWarningBox();

                if (bCheck) {
                    this.callSDK("DELETE", "/app/role-collection", { id: sCollectionId }, this.getRoleCollections);
                    this.onFCLOneColumn();
                }
            },
            onAddUserCollection: function (oEvent) {
                let oSelectedItems = oEvent.getParameter("selectedItems");
                let aUserId = oSelectedItems.map(selectedItem => selectedItem.getTitle());
                let sCollectionId = this._CollectionModel.getProperty("/name");

                aUserId.forEach(userId => {
                    let oGroups = {
                        id: sCollectionId,
                        group: {
                            "type": "USER",
                            "value": userId,
                            "origin": "sap.default"
                        }
                    }
                    this.callSDK("POST", "/app/group", oGroups, this.getRoleCollections);
                })
            },
            deleteCollectionUser: async function (oEvent) {
                let oListItem = oEvent.getParameter("listItem");
                let bCheck = await this.showWarningBox();

                let oDelete = {
                    groupId: this._CollectionModel.getProperty("/name"),
                    userId: this._CollectionModel.getProperty(`${oListItem.getBindingContextPath("Collection")}/id`)
                };

                if (bCheck) {
                    this.callSDK("DELETE", "/app/group", oDelete, this.getRoleCollections);
                }
            },
            onRolesSearch: function (oEvent) {
                let sValue = oEvent.getParameter("value");
                let oFilter = new sap.ui.model.Filter("name", "Contains", sValue);
                let oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter([oFilter]);
            },
            onDeleteRoleFromRoleCollection: async function (oEvent) {
                let oListItem = oEvent.getParameter("listItem");
                let bCheck = await this.showWarningBox();
                let sPath = oListItem.getBindingContextPath("Collection");
                if (bCheck) {
                    let oCollection = this._CollectionModel.getProperty(sPath);
                    let oRoleCollectionName = this._CollectionModel.getProperty("/name");
                    let oDelete = {
                        roleCollectionName: oRoleCollectionName,
                        roleName: oCollection.name,
                        roleTemplateAppId: oCollection.roleTemplateAppId,
                        roleTemplateName: oCollection.roleTemplateName
                    };
                    this.callSDK("DELETE", "/app/role-collection/role", oDelete, this.getRoleCollections);
                }
            },
            addRolesToRoleCollection: function (oEvent) {
                let oSelectedItems = oEvent.getParameter("selectedItems");
                let oRoles = {
                    collectionName: this._CollectionModel.getProperty("/name"),
                    roleReference: []
                };

                oSelectedItems.forEach(seletedItem => {
                    let sPath = seletedItem.getBindingContextPath("roles");
                    let oBindingRole = this._rolesModel.getProperty(sPath);
                    let referenceTemplate = {
                        description: oBindingRole.description,
                        name: oBindingRole.name,
                        roleTemplateAppId: oBindingRole.roleTemplateAppId,
                        roleTemplateName: oBindingRole.roleTemplateName
                    };
                    oRoles.roleReference.push(referenceTemplate);
                });

                this.callSDK("PUT", "/app/role-collection/role", oRoles, this.getRoleCollections);
            },
        });
    });
