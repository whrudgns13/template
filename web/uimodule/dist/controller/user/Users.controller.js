sap.ui.define(["./UserCommon","sap/ui/core/Fragment","sap/m/MessageBox"],function(e,t,s){"use strict";return e.extend("com.myorg.myUI5App.controller.user.Users",{onInit:function(){this._setDefault()},getUserObj:function(){return{userName:"",name:{familyName:"",givenName:""},emails:[{type:"string",value:"",primary:true}],origin:"sap.default",schemas:["urn:scim:schemas:core:1.0"],phoneNumbers:[{value:""}]}},_setDefault:function(){let e=this.getView();let t=new sap.ui.model.json.JSONModel;let s=new sap.ui.model.json.JSONModel;let r=new sap.ui.model.json.JSONModel;e.setModel(t,"user");e.setModel(s,"users");e.setModel(r,"roles");this._userState="Edit";this._userModel=e.getModel("user");this._usersModel=e.getModel("users");this._rolesModel=e.getModel("roles");this._FCL=this.getView().byId("fcl");this.callSDK("GET","/app/users");this.callSDK("GET","/app/group")},onUserItemPress:function(e){let t=e.getParameter("listItem");let s=t.getBindingContextPath("users");let r=JSON.parse(JSON.stringify(this._usersModel.getProperty(s)));this._userModel.setProperty("/",r);this._userPath=s;this._FCL.getLayout()==="OneColumn"?this.onFCLTwoColumn():""},onSubmit:function(){if(!this.validationCheck())return;let e=this._userModel.getProperty("/");e.userName=`${e.name.familyName} ${e.name.givenName}`;this._userState==="create"?this.saveUser():this.editUser()},saveUser:function(){let e=this._userModel.getProperty("/");e.displayName="displayName test";this.callSDK("POST","/app/users",e);this.onClose()},editUser:function(){let e=this._userModel.getProperty("/");this.callSDK("PUT","/app/users",e);this.onClose()},deleteUser:async function(){let e=this._userModel.getProperty("/id");let t=await this.showWarningBox();if(t){this.callSDK("DELETE","/app/users",{id:e})}},onOpenDialog:function(e){let s=this.getCustomDataKey(e.getSource());let r=this.getCustomDataValue(e.getSource());this._dialogName=s;switch(r){case"Create":this._userModel.setProperty("/",this.getUserObj());this._userState="create";this._FCL.getLayout()!=="OneColumn"?this.onFCLOneColumn():"";break;case"Edit":this._userState="edit";break;case"addRole":let e=this._rolesModel.getProperty("/resources");let t=this._userModel.getProperty("/groups");let s=e.filter(e=>{let s=t.findIndex(t=>e.id===t.value);if(s>-1)return false;return true});this._rolesModel.setProperty("/resources",s);break}let i=this.getView();if(!this[s]){this[s]=t.load({name:`com.myorg.myUI5App.view.user.${s}`,controller:this})}this[s].then(e=>{i.addDependent(e);e.open()})},getCustomDataKey(e){let t=e.getCustomData()[0].getKey();return t},getCustomDataValue(e){let t=e.getCustomData()[0].getValue();return t}})});