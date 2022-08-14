sap.ui.define(["../BaseController","sap/ui/core/Fragment","sap/m/MessageBox"],function(e,s,t){"use strict";return e.extend("com.myorg.myUI5App.controller.user.Users",{onInit:function(){this._setDefault()},getUserObj:function(){return{userName:"",name:{familyName:"",givenName:""},emails:[{type:"string",value:"",primary:true}],origin:"sap.default",schemas:["urn:scim:schemas:core:1.0"],phoneNumbers:[{value:""}]}},_setDefault:function(){this._FCL=this.getView().byId("fcl");const e=this.getView();const s=new sap.ui.model.json.JSONModel({user:this.getUserObj(),userState:"edit"});e.setModel(s,"user");this._userModel=e.getModel("user");this.getUsers()},getUsers:function(){const e=this;jQuery.ajax({url:"/app/users",type:"GET",async:false,headers:{"X-CSRF-Token":"Fetch"},success:function(s,t,o){e.csrfToken=o.getResponseHeader("x-csrf-token");e._userModel.setProperty("/users",s)},error:function(e){console.log(e)}})},onUserItemPress:function(e){const s=e.getParameter("listItem");const t=s.getBindingContextPath("user");const o=JSON.parse(JSON.stringify(this._userModel.getProperty(t)));this._userModel.setProperty("/user",o);this._FCL.getLayout()==="OneColumn"?this.onFCLTwoColumn():""},onCreateDialog:function(){this._userModel.setProperty("/user",this.getUserObj());this._userModel.setProperty("/userState","create");this._FCL.getLayout()!=="OneColumn"?this.onFCLOneColumn():"";this.onOpenUserDialog()},onEditDialog:function(){this._userModel.setProperty("/userState","edit");this.onOpenUserDialog()},onSubmit:function(){const e=this._userModel.getProperty("/userState");e==="create"?this.setUser():this.editUser()},setUser:function(){if(!this.validationCheck())return;const e=this;this.addUserName();jQuery.ajax({url:"/app/users",type:"POST",data:JSON.stringify(oUser),headers:{"Content-Type":"application/json","X-CSRF-Token":e.csrfToken},success:function(s,t,o){t==="success"?new sap.m.MessageToast.show("생성 성공"):"";e.getUsers()},error:function(e){console.log(e)}});this._userModel.setProperty("/user",this.getUserObj());this.onClose()},editUser:function(){if(!this.validationCheck())return;const e=this;this.addUserName();jQuery.ajax({url:"/app/users",type:"PUT",data:JSON.stringify(oUser),headers:{"Content-Type":"application/json","X-CSRF-Token":e.csrfToken},success:function(s,t,o){t==="success"?new sap.m.MessageToast.show("변경 성공"):"";e.getUsers()},error:function(e){console.log(e)}});this.onClose()},addUserName:function(){const e=this._userModel.getProperty("/user");e.userName=`${e.name.familyName} ${e.name.givenName}`},deleteUser:async function(e){const s=this;const t=this._userModel.getProperty("/user").id;const o=await this.showWarningBox();if(o){jQuery.ajax({url:"/app/users",type:"DELETE",data:JSON.stringify({id:t}),headers:{"Content-Type":"application/json","X-CSRF-Token":s.csrfToken},success:function(e,t,o){t==="success"?new sap.m.MessageToast.show("삭제 성공"):"";s.getUsers()},error:function(e){console.log(e)}})}},showWarningBox:function(){return new Promise((e,s)=>{t.alert("정말 삭제하시겠습니까?",{icon:"WARNING",actions:[t.Action.OK,t.Action.CANCEL],emphasizedAction:t.Action.OK,onClose:function(s){s==="OK"?e(true):e(false)}})})},onOpenUserDialog:function(){const e=this.getView();if(!this.oDialog){this.oDialog=s.load({name:"com.myorg.myUI5App.view.UserDialog",controller:this})}this.oDialog.then(s=>{e.addDependent(s);s.open()})},onClose:function(){this.oDialog.then(e=>e.close())},validationCheck:function(){const e=/^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;let s=sap.ui.getCore().byId("userForm").getContent();let t=s.filter(e=>e.getMetadata().getElementName()==="sap.m.Input");let o=true;t.some(s=>{let t=s.getValue();if(!t){s.setValueState("Error");o=false;return false}if(s.getType()==="Email"&&!t.match(e)){console.log(`emails`);s.setValueState("Error");o=false;return false}s.setValueState("None")});return o}})});