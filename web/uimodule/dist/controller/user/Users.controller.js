sap.ui.define(["../BaseController","sap/ui/core/Fragment","sap/m/MessageBox"],function(e,s,t){"use strict";return e.extend("com.myorg.myUI5App.controller.user.Users",{onInit:function(){this._setDefault()},getUserObj:function(){return{userName:"",name:{familyName:"",givenName:""},emails:[{type:"string",value:"",primary:true}],origin:"sap.default",schemas:["urn:scim:schemas:core:1.0"],phoneNumbers:[{value:""}]}},_setDefault:function(){const e=this.getView();const s=new sap.ui.model.json.JSONModel({user:this.getUserObj(),userState:"edit"});const t=new sap.ui.model.json.JSONModel;e.setModel(s,"user");e.setModel(t,"roles");this._userModel=e.getModel("user");this._rolesModel=e.getModel("roles");this._FCL=this.getView().byId("fcl");this.getUsers();this.getRoles()},getRoles:function(){const e=this;jQuery.ajax({url:"/app/group",type:"GET",success:function(s,t,o){console.log(s);e._rolesModel.setProperty("/",s)},error:function(e){console.log(e)}})},getUsers:function(){const e=this;jQuery.ajax({url:"/app/users",type:"GET",async:false,headers:{"X-CSRF-Token":"Fetch"},success:function(s,t,o){e.csrfToken=o.getResponseHeader("x-csrf-token");e._userModel.setProperty("/users",s);if(e._userPath){e._userModel.setProperty("/user",e._userModel.getProperty(e._userPath))}},error:function(e){console.log(e)}})},onUserItemPress:function(e){const s=e.getParameter("listItem");const t=s.getBindingContextPath("user");const o=JSON.parse(JSON.stringify(this._userModel.getProperty(t)));this._userModel.setProperty("/user",o);this._userPath=t;this._FCL.getLayout()==="OneColumn"?this.onFCLTwoColumn():""},onSubmit:function(){if(!this.validationCheck())return;const e=this._userModel.getProperty("/user");const s=this._userModel.getProperty("/userState");e.userName=`${e.name.familyName} ${e.name.givenName}`;s==="create"?this.setUser():this.editUser()},setUser:function(){const e=this;const s=this._userModel.getProperty("/user");s.displayName="displayName test";jQuery.ajax({url:"/app/users",type:"POST",data:JSON.stringify(s),headers:{"Content-Type":"application/json","X-CSRF-Token":e.csrfToken},success:function(s,t,o){t==="success"?new sap.m.MessageToast.show("생성 성공"):"";e.getUsers()},error:function(e){console.log(e)}});this.onClose()},editUser:function(){const e=this;const s=this._userModel.getProperty("/user");jQuery.ajax({url:"/app/users",type:"PUT",data:JSON.stringify(s),headers:{"Content-Type":"application/json","X-CSRF-Token":e.csrfToken},success:function(s,t,o){t==="success"?new sap.m.MessageToast.show("변경 성공"):"";e.getUsers()},error:function(e){console.log(e)}});this.onClose()},deleteUser:async function(){const e=this;const s=this._userModel.getProperty("/user").id;const t=await this.showWarningBox();if(t){jQuery.ajax({url:"/app/users",type:"DELETE",data:JSON.stringify({id:s}),headers:{"Content-Type":"application/json","X-CSRF-Token":e.csrfToken},success:function(s,t,o){t==="success"?new sap.m.MessageToast.show("삭제 성공"):"";e.onFCLOneColumn();e.getUsers()},error:function(e){console.log(e)}})}},showWarningBox:function(){return new Promise((e,s)=>{t.alert("정말 삭제하시겠습니까?",{icon:"WARNING",actions:[t.Action.OK,t.Action.CANCEL],emphasizedAction:t.Action.OK,onClose:function(s){s==="OK"?e(true):e(false)}})})},onUserRoleDelete:async function(e){const s=e.getParameter("listItem");const t=await this.showWarningBox();const o=this;const r={groupId:s.getTitle(),userId:this._userModel.getProperty("/user/id")};if(t){jQuery.ajax({url:"/app/group",type:"DELETE",data:JSON.stringify(r),headers:{"Content-Type":"application/json","X-CSRF-Token":o.csrfToken},success:function(e,s,t){s==="success"?new sap.m.MessageToast.show("삭제 성공"):"";o.getUsers()},error:function(e){console.log(e)}})}},onSetRole:function(e){const s=this;const t=e.getParameter("selectedItems");const o=t.map(e=>e.getTitle());const r=this._userModel.getProperty("/user/id");o.forEach(e=>{const t={id:e,group:{type:"USER",value:r,origin:"sap.default"}};jQuery.ajax({url:"/app/group",type:"POST",data:JSON.stringify(t),headers:{"Content-Type":"application/json","X-CSRF-Token":s.csrfToken},success:function(e,t,o){t==="success"?new sap.m.MessageToast.show("역활 추가 성공"):"";s.getUsers()},error:function(e){console.log(e)}})})},onOpenDialog:function(e){const t=this.getCustomDataKey(e.getSource());const o=this.getCustomDataValue(e.getSource());this._dialogName=t;switch(o){case"Create":this._userModel.setProperty("/user",this.getUserObj());this._userModel.setProperty("/userState","create");this._FCL.getLayout()!=="OneColumn"?this.onFCLOneColumn():"";break;case"Edit":this._userModel.setProperty("/userState","edit");break;case"addRole":let e=this._rolesModel.getProperty("/resources");let s=this._userModel.getProperty("/user/groups");const t=e.filter(e=>{const t=s.findIndex(s=>e.id===s.value);if(t>-1)return false;return true});this._rolesModel.setProperty("/resources",t);break}const r=this.getView();if(!this[t]){this[t]=s.load({name:`com.myorg.myUI5App.view.user.${t}`,controller:this})}this[t].then(e=>{r.addDependent(e);e.open()})},onClose:function(){const e=this._dialogName;this[e].then(e=>e.close())},getCustomDataKey(e){const s=e.getCustomData()[0].getKey();return s},getCustomDataValue(e){const s=e.getCustomData()[0].getValue();return s}})});