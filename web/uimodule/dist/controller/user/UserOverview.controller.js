sap.ui.define(["./UserCommon"],function(e){"use strict";return e.extend("com.myorg.myUI5App.controller.user.UserOverview",{onInit:function(){this._setDefault()},_setDefault:function(){let e=this.getView();e.setModel(new sap.ui.model.json.JSONModel,"users");e.setModel(new sap.ui.model.json.JSONModel,"roles");this._usersModel=e.getModel("users");this._rolesModel=e.getModel("roles");this.getUsers();this.getRoles()},getUsers:function(){this.callSDK("GET","/app/users",undefined,this.setUsers)},getRoles:function(){this.callSDK("GET","/app/group",undefined,this.setRoles)},setUsers:function(e){this._usersModel.setProperty("/",e)},setRoles:function(e){this._rolesModel.setProperty("/",e)},onTilePress:function(e){let s=this.getCustomDataKey(e.getSource());this.navTo(s)}})});