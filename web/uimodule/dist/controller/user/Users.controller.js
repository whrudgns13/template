sap.ui.define(["../BaseController","sap/ui/core/Fragment","sap/m/MessageBox"],function(e,t,s){"use strict";return e.extend("com.myorg.myUI5App.controller.user.Users",{onBeforeRendering:function(){this._setDefault()},getUserObj:function(){return{userName:"",name:{familyName:"",givenName:""},emails:[{type:"string",value:"",primary:true}],origin:"sap.default",schemas:["urn:scim:schemas:core:1.0"]}},_setDefault:function(){this.onFCLOneColumn();let e=this.getView();e.setModel(new sap.ui.model.json.JSONModel,"user");e.setModel(new sap.ui.model.json.JSONModel,"users");e.setModel(new sap.ui.model.json.JSONModel,"collections");this._userState="Edit";this._userModel=e.getModel("user");this._usersModel=e.getModel("users");this._collectionsModel=e.getModel("collections");this._FCL=this.getView().byId("fcl");this.getUsers();this.getRoleCollections()},getUsers:function(){this.callSDK("GET","/app/users",undefined,this.setUsers)},getRoleCollections:function(){this.callSDK("GET","/app/group",undefined,this.setRoleCollections)},setUsers:function(e,t){this.csrfToken=t.getResponseHeader("X-CSRF-Token");this._usersModel.setProperty("/",e);if(this._userPath)this.setUser()},setUser:function(){this._userModel.setProperty("/",this._usersModel.getProperty(this._userPath))},setRoleCollections:function(e){this.collectionsData=e.resources;this._collectionsModel.setProperty("/",e)},onUserItemPress:function(e){let t=e.getParameter("listItem");let s=t.getBindingContextPath("users");let i=JSON.parse(JSON.stringify(this._usersModel.getProperty(s)));this._userModel.setProperty("/",i);this._userPath=s;this._FCL.getLayout()==="OneColumn"?this.onFCLTwoColumn():""},onSubmit:function(){let e=this.getView().byId("userForm");if(!this.validationCheck(e))return;let t=this._userModel.getProperty("/");t.userName=`${t.name.familyName} ${t.name.givenName}`;this._userState==="create"?this.saveUser():this.editUser()},saveUser:function(){let e=this._userModel.getProperty("/");e.displayName="displayName test";this.callSDK("POST","/app/users",e,this.getUsers);this.onClose()},editUser:function(){let e=this._userModel.getProperty("/");this.callSDK("PUT","/app/users",e,this.getUsers);this.onClose()},deleteUser:async function(){let e=this._userModel.getProperty("/id");let t=await this.showWarningBox();if(t){this.callSDK("DELETE","/app/users",{id:e},this.getUsers)}},onOpenDialog:function(e){let s=this.getCustomDataKey(e.getSource());let i=this.getCustomDataValue(e.getSource());this._dialogName=s;switch(i){case"Create":this._userModel.setProperty("/",this.getUserObj());this._userState="create";this._FCL.getLayout()!=="OneColumn"?this.onFCLOneColumn():"";break;case"Edit":this._userState="edit";break;case"addCollection":let e=this.collectionsData;let t=this._userModel.getProperty("/groups");let s=e.filter(e=>{let s=t.findIndex(t=>e.id===t.value);if(s>-1)return false;return true});this._collectionsModel.setProperty("/resources",s);break}let o=this.getView();if(!this[s]){this[s]=t.load({id:o.getId(),name:`com.myorg.myUI5App.view.user.dialog.${s}`,controller:this})}this[s].then(e=>{o.addDependent(e);e.open()})},onClose:function(){let e=this._dialogName;this[e].then(e=>e.close())},onDeleteUserRole:async function(e){let t=e.getParameter("listItem");let s=await this.showWarningBox();let i={groupId:t.getTitle(),userId:this._userModel.getProperty("/id")};if(s){this.callSDK("DELETE","/app/group",i,this.getUsers)}},onAddUserRoleCollection:function(e){let t=e.getParameter("selectedItems");let s=t.map(e=>e.getTitle());let i=this._userModel.getProperty("/id");s.forEach(e=>{let t={id:e,group:{type:"USER",value:i,origin:"sap.default"}};this.callSDK("POST","/app/group",t,this.getUsers)})}})});