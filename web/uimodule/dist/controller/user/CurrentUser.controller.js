sap.ui.define(["../BaseController","sap/ui/core/Fragment"],function(e,t){"use strict";return e.extend("com.myorg.myUI5App.controller.user.CurrentUser",{onInit:function(){this._setDefault()},_setDefault:function(){const e=this.getView();e.setModel(new sap.ui.model.json.JSONModel,"user");e.setModel(new sap.ui.model.json.JSONModel,"roles");this._userModel=e.getModel("user");this._rolesModel=e.getModel("roles");this.getUser();this.getRoles()},getUser:function(){this.callSDK("GET","/app/users/currentUser",undefined,this.setUser)},getRoles:function(){this.callSDK("GET","/app/group",undefined,this.setRoles)},setUser:function(e,t){this._userModel.setProperty("/",e);this.csrfToken=t.getResponseHeader("X-CSRF-Token")},setRoles:function(e){this._rolesModel.setProperty("/",e)},onAddUserRoleCollection:function(e){let t=e.getParameter("selectedItems");let s=t.map(e=>e.getTitle());let o=this._userModel.getProperty("/id");s.forEach(e=>{let t={id:e,group:{type:"USER",value:o,origin:"sap.default"}};this.callSDK("POST","/app/group",t,this.getUser)})},onOpenDialog:function(){let e=this._rolesModel.getProperty("/resources");let s=this._userModel.getProperty("/groups");const o=e.filter(e=>{const t=s.findIndex(t=>e.id===t.value);if(t>-1)return false;return true});this._rolesModel.setProperty("/resources",o);const r=this.getView();if(!this.oDialog){this.oDialog=t.load({name:`com.myorg.myUI5App.view.user.dialog.RolesDialog`,controller:this})}this.oDialog.then(e=>{r.addDependent(e);e.open()})},onClose:function(){this.oDialog.then(e=>e.close())},onDeleteUserRole:async function(e){let t=e.getParameter("listItem");let s=await this.showWarningBox();let o={groupId:t.getTitle(),userId:this._userModel.getProperty("/id")};if(s){this.callSDK("DELETE","/app/group",o,this.getUser)}},onCreateUserRole:function(e){let t=e.getParameter("selectedItems");let s=t.map(e=>e.getTitle());let o=this._userModel.getProperty("/id");s.forEach(e=>{let t={id:e,group:{type:"USER",value:o,origin:"sap.default"}};this.callSDK("POST","/app/group",t,this.getUser)})}})});