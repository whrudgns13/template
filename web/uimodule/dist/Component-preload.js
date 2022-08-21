//@ui5-bundle com/myorg/myUI5App/Component-preload.js
sap.ui.require.preload({
	"com/myorg/myUI5App/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/myorg/myUI5App/model/models"],function(e,t,i){"use strict";return e.extend("com.myorg.myUI5App.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"com/myorg/myUI5App/controller/App.controller.js":function(){sap.ui.define(["./BaseController"],function(o){"use strict";return o.extend("com.myorg.myUI5App.controller.controller.App",{onInit:function(){this.getPermission()},getPermission:function(){const o=this;jQuery.ajax({url:"/app",type:"GET",success:function(n,e,s){console.log(n);console.log(e);console.log(s);o.setModel(new sap.ui.model.json.JSONModel(n))},error:function(n){o.navTo("Forbidden");console.log("Error");console.log(n)}})}})});
},
	"com/myorg/myUI5App/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent","com/myorg/myUI5App/model/formatter"],function(e,t,o,n){"use strict";return e.extend("com.myorg.myUI5App.controller.BaseController",{formatter:n,getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},navTo:function(e,t,o){this.getRouter().navTo(e,t,o)},getRouter:function(){return o.getRouterFor(this)},onNavBack:function(){const e=t.getInstance().getPreviousHash();if(e!==undefined){window.history.back()}else{this.getRouter().navTo("appHome",{},true)}},getCustomDataKey(e){let t=e.getCustomData()[0].getKey();return t},getCustomDataValue(e){let t=e.getCustomData()[0].getValue();return t}})});
},
	"com/myorg/myUI5App/controller/MainToolPage.controller.js":function(){sap.ui.define(["./BaseController"],function(e){"use strict";return e.extend("com.myorg.myUI5App.controller.MainToolPage",{onItemSelect:function(e){const t=e.getParameter("item");this.navTo(t.getKey())}})});
},
	"com/myorg/myUI5App/controller/MainView.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/core/Fragment","sap/m/MessageBox"],function(e,t,s){"use strict";return e.extend("com.myorg.myUI5App.controller.MainView",{onInit:function(){this._setDefault()},getUserObj:function(){return{userName:"",name:{familyName:"",givenName:""},emails:[{type:"string",value:"",primary:true}],origin:"sap.default",schemas:["urn:scim:schemas:core:1.0"],phoneNumbers:[{value:""}]}},_setDefault:function(){const e=this.getView();const t=new sap.ui.model.json.JSONModel({user:this.getUserObj(),userState:"edit"});e.setModel(t,"user");this._userModel=e.getModel("user");this.getUsers();this.getCurrentUser()},getUsers:function(){const e=this;jQuery.ajax({url:"/app/users",type:"GET",async:false,headers:{"X-CSRF-Token":"Fetch"},success:function(t,s,o){e.csrfToken=o.getResponseHeader("x-csrf-token");e._userModel.setProperty("/users",t)},error:function(e){console.log(e)}})},getCurrentUser:function(){let e=this;jQuery.ajax({url:"/app/users/currentUser",type:"GET",async:false,success:function(t,s,o){e._userModel.setProperty("/currentUser",t)},error:function(e){console.log(e)}})},onTableModeChange:function(e){const t=this.getView();let s=t.byId("usersTable");let o=e.getSource();if(s.getMode()!=="Delete"){o.setType("Emphasized");s.setMode("Delete");return}o.setType("Default");s.setMode("None")},onCreateDialog:function(){if(this._userModel.getProperty("/userState")==="edit"){this._userModel.setProperty("/user",this.getUserObj())}this._userModel.setProperty("/userState","create");this.onOpenUserDialog()},onEditDialog:function(e){const t=e.getSource().getParent();const s=t.getBindingContextPath("user");let o=this._userModel;let n=JSON.parse(JSON.stringify(o.getProperty(s)));o.setProperty("/userState","edit");o.setProperty("/user",n);this.onOpenUserDialog()},onSubmit:function(){const e=this._userModel.getProperty("/userState");e==="create"?this.setUser():this.editUser()},setUser:function(){if(!this.validationCheck())return;const e=this;let t=this._userModel.getProperty("/user");t.userName=`${t.name.familyName} ${t.name.givenName}`;jQuery.ajax({url:"/app/users",type:"POST",data:JSON.stringify(t),headers:{"Content-Type":"application/json","X-CSRF-Token":e.csrfToken},success:function(t,s,o){s==="success"?new sap.m.MessageToast.show("생성 성공"):"";e.getUsers()},error:function(e){console.log(e)}});this._userModel.setProperty("/user",this.getUserObj());this.onClose()},editUser:function(){console.log(this.validationCheck());if(!this.validationCheck())return;const e=this;const t=this._userModel.getProperty("/user");t.userName=`${t.name.familyName} ${t.name.givenName}`;jQuery.ajax({url:"/app/users",type:"PUT",data:JSON.stringify(t),headers:{"Content-Type":"application/json","X-CSRF-Token":e.csrfToken},success:function(t,s,o){s==="success"?new sap.m.MessageToast.show("변경 성공"):"";e.getUsers()},error:function(e){console.log(e)}});this.onClose()},onDeleteUser:async function(e){const t=this;const s=e.getParameters("listItem").listItem;const o=s.getBindingContextPath("user");const n=this._userModel.getProperty(o).id;const r=await this.showWarningBox();if(r){jQuery.ajax({url:"/app/users",type:"DELETE",data:JSON.stringify({id:n}),headers:{"Content-Type":"application/json","X-CSRF-Token":t.csrfToken},success:function(e,s,o){s==="success"?new sap.m.MessageToast.show("삭제 성공"):"";t.getUsers()},error:function(e){console.log(e)}})}},showWarningBox:function(){return new Promise((e,t)=>{s.alert("정말 삭제하시겠습니까?",{icon:"WARNING",actions:[s.Action.OK,s.Action.CANCEL],emphasizedAction:s.Action.OK,onClose:function(t){t==="OK"?e(true):e(false)}})})},onOpenUserDialog:function(){const e=this.getView();if(!this.oDialog){this.oDialog=t.load({name:"com.myorg.myUI5App.view.UserDialog",controller:this})}this.oDialog.then(t=>{e.addDependent(t);t.open()})},onClose:function(){this.oDialog.then(e=>e.close())},validationCheck:function(){const e=/^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;let t=sap.ui.getCore().byId("userForm").getContent();let s=t.filter(e=>e.getMetadata().getElementName()==="sap.m.Input");let o=true;s.some(t=>{let s=t.getValue();if(!s){t.setValueState("Error");o=false;return false}if(t.getType()==="Email"&&!s.match(e)){console.log(`emails`);t.setValueState("Error");o=false;return false}t.setValueState("None")});return o}})});
},
	"com/myorg/myUI5App/controller/events/EventLogs.controller.js":function(){sap.ui.define(["../BaseController"],function(e){"use strict";return e.extend("com.myorg.myUI5App.events.EventLogs",{onInit:function(){this.getEvents()},getEvents:function(){jQuery.ajax({url:"/app/events",type:"GET",success:function(e){console.log(e)},error:function(e){console.log(e)}})}})});
},
	"com/myorg/myUI5App/controller/security/Settings.controller.js":function(){sap.ui.define(["../BaseController","../../model/formatter"],function(e,t){"use strict";return e.extend("com.myorg.myUI5App.security.Settings",{formatter:t,onInit:function(){const e=this.getView();const t=new sap.ui.model.json.JSONModel({enabled:false,visible:true});e.setModel(t,"setting");this._slider=e.getModel("setting");this.getSetting()},getSetting:function(){const e=this;jQuery.ajax({url:"/app/security",type:"GET",async:false,headers:{"X-CSRF-Token":"Fetch"},success:function(t,s,n){e.csrfToken=n.getResponseHeader("x-csrf-token");t.tokenPolicySettings=e.tokenTimeConversion(t.tokenPolicySettings);e._slider.setProperty("/security",t)},error:function(e){console.log(e)}})},tokenTimeConversion:function(e){e.accessTokenValidity=e.accessTokenValidity/60;e.refreshTokenValidity=e.refreshTokenValidity/3600;return e},getUpdateTokenSettings:function(){const e=this._slider.getProperty("/security/tokenPolicySettings/accessTokenValidity")*60;const t=this._slider.getProperty("/security/tokenPolicySettings/refreshTokenValidity")*3600;const s={tokenPolicySettings:{accessTokenValidity:e,refreshTokenValidity:t}};return s},onTokenTimeSave:function(){const e=this;jQuery.ajax({url:"/app/security",data:JSON.stringify(e.getUpdateTokenSettings()),type:"PATCH",headers:{"Content-Type":"application/json","X-CSRF-Token":e.csrfToken},success:function(t,s,n){if(s==="success")new sap.m.MessageToast.show("변경 성공");e.onChangeState()},error:function(e){console.log(e)}})},onChangeState:function(){let e=this._slider.getProperty("/enabled");let t=this._slider.getProperty("/visible");this._slider.setProperty("/enabled",!e);this._slider.setProperty("/visible",!t)}})});
},
	"com/myorg/myUI5App/controller/user/CurrentUser.controller.js":function(){sap.ui.define(["./UserCommon","sap/ui/core/Fragment"],function(e,t){"use strict";return e.extend("com.myorg.myUI5App.controller.user.CurrentUser",{onInit:function(){this._setDefault()},_setDefault:function(){const e=this.getView();e.setModel(new sap.ui.model.json.JSONModel,"user");e.setModel(new sap.ui.model.json.JSONModel,"roles");this._userModel=e.getModel("user");this._rolesModel=e.getModel("roles");this.getUser();this.getRoles()},getUser:function(){this.callSDK("GET","/app/users/currentUser",undefined,this.setUser)},getRoles:function(){this.callSDK("GET","/app/group",undefined,this.setRoles)},setUser:function(e,t){this._userModel.setProperty("/",e);this.csrfToken=t.getResponseHeader("X-CSRF-Token")},setRoles:function(e){this._rolesModel.setProperty("/",e)},onOpenDialog:function(){let e=this._rolesModel.getProperty("/resources");let s=this._userModel.getProperty("/groups");const o=e.filter(e=>{const t=s.findIndex(t=>e.id===t.value);if(t>-1)return false;return true});this._rolesModel.setProperty("/resources",o);const r=this.getView();if(!this.oDialog){this.oDialog=t.load({name:`com.myorg.myUI5App.view.user.RolesDialog`,controller:this})}this.oDialog.then(e=>{r.addDependent(e);e.open()})},onClose:function(){this.oDialog.then(e=>e.close())},onDeleteUserRole:async function(e){let t=e.getParameter("listItem");let s=await this.showWarningBox();let o={groupId:t.getTitle(),userId:this._userModel.getProperty("/id")};if(s){this.callSDK("DELETE","/app/group",o,this.getUser)}},onCreateUserRole:function(e){let t=e.getParameter("selectedItems");let s=t.map(e=>e.getTitle());let o=this._userModel.getProperty("/id");s.forEach(e=>{let t={id:e,group:{type:"USER",value:o,origin:"sap.default"}};this.callSDK("POST","/app/group",t,this.getUser)})}})});
},
	"com/myorg/myUI5App/controller/user/Roles.controller.js":function(){sap.ui.define(["./UserCommon","sap/ui/core/Fragment"],function(e,t){"use strict";return e.extend("com.myorg.myUI5App.controller.user.Roles",{onInit:function(){this._setDefault()},_setDefault:function(){let e=this.getView();e.setModel(new sap.ui.model.json.JSONModel,"users");e.setModel(new sap.ui.model.json.JSONModel,"roles");e.setModel(new sap.ui.model.json.JSONModel(this.getRoleTemplate()),"role");this._usersModel=e.getModel("users");this._rolesModel=e.getModel("roles");this._roleModel=e.getModel("role");this._FCL=e.byId("fcl");this.getRoles();this.getUsers()},getUsers:function(){this.callSDK("GET","/app/users",undefined,this.setUsers)},getRoles:function(){this.callSDK("GET","/app/group",undefined,this.setRoles)},setRoles:function(e,t){this.csrfToken=t.getResponseHeader("X-CSRF-Token");this._rolesModel.setProperty("/",e)},setUsers:function(e){this._usersModel.setProperty("/",e)},getRoleTemplate:function(){return{displayName:"",description:""}},onOpenDialog:function(){let e=this.getView();if(!this.oDialog){this.oDialog=t.load({name:`com.myorg.myUI5App.view.user.CreateRoleDialog`,controller:this})}this.oDialog.then(t=>{e.addDependent(t);t.open()})},onClose:function(){this.oDialog.then(e=>e.close())},onSubmit:function(){let e=this._roleModel.getProperty("/");this.callSDK("POST","/app/group/role",e,this.getRoles)},onRoleItemPress:function(e){let t=e.getParameter("listItem");let o=t.getBindingContextPath("roles");let s=this._rolesModel.getProperty(o);let l=this._usersModel.getProperty("/resources");let i=s.members;let n=l.filter(e=>i.some(t=>e.id===t.value));s.members=n;this._roleModel.setProperty("/",s);this._FCL.getLayout()==="OneColumn"?this.onFCLTwoColumn():""}})});
},
	"com/myorg/myUI5App/controller/user/UserCommon.js":function(){sap.ui.define(["../BaseController","sap/m/MessageBox"],function(e,t){"use strict";return e.extend("com.myorg.myUI5App.controller.user.UserCommon",{callSDK:function(e,t,n,o){let s=this;let a=i(e);jQuery.ajax({url:t,type:e,headers:a,data:JSON.stringify(n),success:function(t,n,s){if(n==="success"){o.bind(this)(t,s)}r(e,n)}.bind(s),error:function(e){console.log(e)}});function i(e){if(e!=="GET"){return{"Content-Type":"application/json","X-CSRF-Token":s.csrfToken}}return{"X-CSRF-Token":"Fetch"}}function r(e,n){if(n==="success"){switch(e){case"POST":new sap.m.MessageToast.show("생성 성공");break;case"PUT":new sap.m.MessageToast.show("변경 성공");break;case"DELETE":new sap.m.MessageToast.show("삭제 성공");t==="/app/users"?s.onFCLOneColumn():"";break}}}},onRoleSearch:function(e){let t=e.getParameter("value");let n=new sap.ui.model.Filter("id","Contains",t);let o=e.getParameter("itemsBinding");o.filter([n])},onFCLOneColumn:function(){let e=this.getView().byId("fcl");e.setLayout("OneColumn")},onFCLTwoColumn:function(){let e=this.getView().byId("fcl");e.setLayout("TwoColumnsBeginExpanded")},validationCheck:function(){let e=/^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;let t=sap.ui.getCore().byId("userForm").getContent();let n=t.filter(e=>e.getMetadata().getElementName()==="sap.m.Input");let o=true;n.some(t=>{let n=t.getValue();if(!n){t.setValueState("Error");o=false;return false}if(t.getType()==="Email"&&!n.match(e)){t.setValueState("Error");o=false;return false}t.setValueState("None")});return o},showWarningBox:function(){return new Promise((e,n)=>{t.alert("정말 삭제하시겠습니까?",{icon:"WARNING",actions:[t.Action.OK,t.Action.CANCEL],emphasizedAction:t.Action.OK,onClose:function(t){t==="OK"?e(true):e(false)}})})}})});
},
	"com/myorg/myUI5App/controller/user/UserOverview.controller.js":function(){sap.ui.define(["./UserCommon"],function(e){"use strict";return e.extend("com.myorg.myUI5App.controller.user.UserOverview",{onInit:function(){this._setDefault()},_setDefault:function(){let e=this.getView();e.setModel(new sap.ui.model.json.JSONModel,"users");e.setModel(new sap.ui.model.json.JSONModel,"roles");this._usersModel=e.getModel("users");this._rolesModel=e.getModel("roles");this.getUsers();this.getRoles()},getUsers:function(){this.callSDK("GET","/app/users",undefined,this.setUsers)},getRoles:function(){this.callSDK("GET","/app/group",undefined,this.setRoles)},setUsers:function(e){this._usersModel.setProperty("/",e)},setRoles:function(e){this._rolesModel.setProperty("/",e)},onTilePress:function(e){let s=this.getCustomDataKey(e.getSource());this.navTo(s)}})});
},
	"com/myorg/myUI5App/controller/user/Users.controller.js":function(){sap.ui.define(["./UserCommon","sap/ui/core/Fragment","sap/m/MessageBox"],function(e,t,s){"use strict";return e.extend("com.myorg.myUI5App.controller.user.Users",{onInit:function(){this._setDefault()},getUserObj:function(){return{userName:"",name:{familyName:"",givenName:""},emails:[{type:"string",value:"",primary:true}],origin:"sap.default",schemas:["urn:scim:schemas:core:1.0"],phoneNumbers:[{value:""}]}},_setDefault:function(){let e=this.getView();e.setModel(new sap.ui.model.json.JSONModel,"user");e.setModel(new sap.ui.model.json.JSONModel,"users");e.setModel(new sap.ui.model.json.JSONModel,"roles");this._userState="Edit";this._userModel=e.getModel("user");this._usersModel=e.getModel("users");this._rolesModel=e.getModel("roles");this._FCL=this.getView().byId("fcl");this.getUsers();this.getRoles()},getUsers:function(){this.callSDK("GET","/app/users",undefined,this.setUsers)},getRoles:function(){this.callSDK("GET","/app/group",undefined,this.setRoles)},setUsers:function(e,t){this.csrfToken=t.getResponseHeader("X-CSRF-Token");this._usersModel.setProperty("/",e);if(this._userPath)this.setUser()},setUser:function(){this._userModel.setProperty("/",this._usersModel.getProperty(this._userPath))},setRoles:function(e){this._rolesModel.setProperty("/",e)},onUserItemPress:function(e){let t=e.getParameter("listItem");let s=t.getBindingContextPath("users");let r=JSON.parse(JSON.stringify(this._usersModel.getProperty(s)));this._userModel.setProperty("/",r);this._userPath=s;this._FCL.getLayout()==="OneColumn"?this.onFCLTwoColumn():""},onSubmit:function(){if(!this.validationCheck())return;let e=this._userModel.getProperty("/");e.userName=`${e.name.familyName} ${e.name.givenName}`;this._userState==="create"?this.saveUser():this.editUser()},saveUser:function(){let e=this._userModel.getProperty("/");e.displayName="displayName test";this.callSDK("POST","/app/users",e,this.getUsers);this.onClose()},editUser:function(){let e=this._userModel.getProperty("/");this.callSDK("PUT","/app/users",e,this.getUsers);this.onClose()},deleteUser:async function(){let e=this._userModel.getProperty("/id");let t=await this.showWarningBox();if(t){this.callSDK("DELETE","/app/users",{id:e},this.getUsers)}},onOpenDialog:function(e){let s=this.getCustomDataKey(e.getSource());let r=this.getCustomDataValue(e.getSource());this._dialogName=s;switch(r){case"Create":this._userModel.setProperty("/",this.getUserObj());this._userState="create";this._FCL.getLayout()!=="OneColumn"?this.onFCLOneColumn():"";break;case"Edit":this._userState="edit";break;case"addRole":let e=this._rolesModel.getProperty("/resources");let t=this._userModel.getProperty("/groups");let s=e.filter(e=>{return t.some(t=>e.id===t.value)});this._rolesModel.setProperty("/resources",s);break}let i=this.getView();if(!this[s]){this[s]=t.load({name:`com.myorg.myUI5App.view.user.${s}`,controller:this})}this[s].then(e=>{i.addDependent(e);e.open()})},onClose:function(){let e=this._dialogName;this[e].then(e=>e.close())},onDeleteUserRole:async function(e){let t=e.getParameter("listItem");let s=await this.showWarningBox();let r={groupId:t.getTitle(),userId:this._userModel.getProperty("/id")};if(s){this.callSDK("DELETE","/app/group",r,this.getUsers)}},onCreateUserRole:function(e){let t=e.getParameter("selectedItems");let s=t.map(e=>e.getTitle());let r=this._userModel.getProperty("/id");s.forEach(e=>{let t={id:e,group:{type:"USER",value:r,origin:"sap.default"}};this.callSDK("POST","/app/group",t,this.getUsers)})}})});
},
	"com/myorg/myUI5App/i18n/i18n.properties":'# This is the resource bundle for com.myorg.myUI5App\r\n\r\n#Texts for manifest.json\r\n\r\n#XTIT: Application name\r\nappTitle=Title of com.myorg.myUI5App\r\n\r\n#YDES: Application description\r\nappDescription=Description of com.myorg.myUI5App\r\n#XTIT: Main view title\r\ntitle=Title of com.myorg.myUI5App',
	"com/myorg/myUI5App/manifest.json":'{"_version":"1.40.0","sap.app":{"id":"com.myorg.myUI5App","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap-ux/fiori-freestyle-writer:basic","version":"0.12.1"}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":false,"dependencies":{"minUI5Version":"1.102.0","libs":{"sap.m":{},"sap.ui.core":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.myorg.myUI5App.i18n.i18n"}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"com.myorg.myUI5App.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"MainPage","pattern":"","target":["MainPage"]},{"name":"CurrentUser","pattern":"currentUser","target":["CurrentUser"]},{"name":"UserOverview","pattern":"userOverview","target":["UserOverview"]},{"name":"Users","pattern":"users","target":["Users"]},{"name":"Roles","pattern":"Roles","target":["Roles"]},{"name":"Settings","pattern":"settings","target":["Settings"]},{"name":"Events","pattern":"events","target":["EventLogs"]},{"name":"Forbidden","pattern":"forbidden","target":["Forbidden"]}],"targets":{"MainPage":{"controlId":"mainApp","viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"MainToolPage","viewName":"MainToolPage"},"UserOverview":{"viewPath":"com.myorg.myUI5App.view.user","parent":"MainPage","controlId":"app","viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"UserOverview","viewName":"UserOverview"},"CurrentUser":{"viewPath":"com.myorg.myUI5App.view.user","viewType":"XML","parent":"MainPage","transition":"slide","clearControlAggregation":false,"viewId":"CurrentUser","viewName":"CurrentUser"},"Users":{"viewPath":"com.myorg.myUI5App.view.user","parent":"MainPage","controlId":"app","viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"Users","viewName":"Users"},"Roles":{"viewPath":"com.myorg.myUI5App.view.user","parent":"MainPage","controlId":"app","viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"Roles","viewName":"Roles"},"Settings":{"viewPath":"com.myorg.myUI5App.view.security","viewType":"XML","parent":"MainPage","transition":"slide","clearControlAggregation":false,"viewId":"Settings","viewName":"Settings"},"EventLogs":{"viewPath":"com.myorg.myUI5App.view.events","viewType":"XML","parent":"MainPage","transition":"slide","clearControlAggregation":false,"viewId":"EventLogs","viewName":"EventLogs"},"Forbidden":{"controlId":"mainApp","viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"Forbidden","viewName":"Forbidden"}}},"rootView":{"viewName":"com.myorg.myUI5App.view.App","type":"XML","async":true,"id":"mainApp"}}}',
	"com/myorg/myUI5App/model/formatter.js":function(){sap.ui.define([],function(){"use strict";return{accessTime:function(e){if(e<=-1){return 0}},refreshTime:function(e){if(e<=-1){return 0}}}});
},
	"com/myorg/myUI5App/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){const i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/myorg/myUI5App/view/App.view.xml":'<mvc:View controllerName="com.myorg.myUI5App.controller.App" xmlns:mvc="sap.ui.core.mvc" displayBlock="true" xmlns="sap.m" xmlns:tnt="sap.tnt" height="100%"><App id="mainApp"/></mvc:View>\r\n',
	"com/myorg/myUI5App/view/Forbidden.view.xml":'<mvc:View\r\n    xmlns:mvc="sap.ui.core.mvc" \r\n    displayBlock="true" xmlns="sap.m"><MessagePage\r\n      title="403 Forbidden"\r\n      text="권한이 없습니다"\r\n      description="조경훈한태 문의하세요"/></mvc:View>\r\n',
	"com/myorg/myUI5App/view/MainToolPage.view.xml":'<mvc:View controllerName="com.myorg.myUI5App.controller.MainToolPage"\r\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\r\n    xmlns="sap.m"\r\n    xmlns:tnt="sap.tnt"\r\n    height="100%"><tnt:ToolPage id="toolPage"><tnt:sideContent><tnt:SideNavigation id="sideNavigation" itemSelect=".onItemSelect"><tnt:NavigationList><tnt:NavigationListItem text="User" icon="sap-icon://employee" key="UserOverview"><tnt:NavigationListItem text="Current User" key="CurrentUser"/><tnt:NavigationListItem text="Users" key="Users"/><tnt:NavigationListItem text="Roles" key="Roles"/></tnt:NavigationListItem><tnt:NavigationListItem text="Security" icon="sap-icon://shield"><tnt:NavigationListItem text="Settings" key="Settings"/></tnt:NavigationListItem><tnt:NavigationListItem text="Event Logs" icon="sap-icon://shield"/></tnt:NavigationList></tnt:SideNavigation></tnt:sideContent><tnt:mainContents><App id="app"><pages><mvc:XMLView viewName="com.myorg.myUI5App.view.user.UserOverview"/></pages></App></tnt:mainContents></tnt:ToolPage></mvc:View>\r\n',
	"com/myorg/myUI5App/view/MainView.view.xml":'<mvc:View controllerName="com.myorg.myUI5App.controller.MainView" \r\n    xmlns:mvc="sap.ui.core.mvc" \r\n    xmlns:f="sap.ui.layout.form"\r\n    displayBlock="true" xmlns="sap.m"><Page id="page" title="{i18n>title}"><content><Panel class="sapUiSmallMargin"><content><Table id="usersTable" items="{user>/users/resources}" delete="onDeleteUser"><headerToolbar><OverflowToolbar><Text text="User Total {=${user>/users/totalResults}}"/><ToolbarSpacer/><Button icon="sap-icon://add" press="onCreateDialog"/><Button type="Default" icon="sap-icon://delete" press="onTableModeChange"/></OverflowToolbar></headerToolbar><columns><Column><Text text="User_ID"/></Column><Column><Text text="User_Name"/></Column><Column><Text text="User_Email"/></Column><Column><Text text="Edit"/></Column></columns><items><ColumnListItem><cells><Text text="{user>id}"/><Text text="{user>name/familyName} {user>name/givenName}"/><Text text="{user>emails/0/value}"/><Button icon="sap-icon://edit" press="onEditDialog"/></cells></ColumnListItem></items></Table></content></Panel><Panel class="sapUiSmallMargin"><content><f:SimpleForm title="Current User Info" ><f:content><Label text="ID"/><Text text="{user>/currentUser/id}"/><Label text="userName"/><Text text="{user>/currentUser/name/familyName} {user>/currentUser/name/givenName}"/><Label text="emails"/><Text text="{user>/currentUser/emails/0/value}"/><Label text="ID"/></f:content></f:SimpleForm><List headerText="Current User Roles" items="{user>/currentUser/groups}"><items><ObjectListItem title="{user>value}"></ObjectListItem></items></List></content></Panel></content></Page></mvc:View>\r\n',
	"com/myorg/myUI5App/view/events/EventLogs.view.xml":'<mvc:View controllerName="com.myorg.myUI5App.controller.security.Settings" xmlns="sap.m" xmlns:f="sap.f" xmlns:mvc="sap.ui.core.mvc"><f:DynamicPage id="dynamicPageId" toggleHeaderOnTitleClick="false"><f:title><f:DynamicPageTitle><f:heading><Title text="Event Logs" /></f:heading></f:DynamicPageTitle></f:title><f:content></f:content></f:DynamicPage></mvc:View>\r\n',
	"com/myorg/myUI5App/view/security/Settings.view.xml":'<mvc:View controllerName="com.myorg.myUI5App.controller.security.Settings" xmlns="sap.m" xmlns:f="sap.f" xmlns:mvc="sap.ui.core.mvc"><f:DynamicPage id="dynamicPageId" toggleHeaderOnTitleClick="false"><f:title><f:DynamicPageTitle><f:heading><Title text="Settings" /></f:heading><f:actions><Button text="Edit" press="onChangeState" type="Emphasized" visible="{= ${setting>/visible} ? true : false}"/><Button text="Save" press="onTokenTimeSave" type="Emphasized" visible="{= ${setting>/visible} ? false : true}"/><Button text="Cancel" press="onChangeState" type="Emphasized" visible="{= ${setting>/visible} ? false : true}"/></f:actions></f:DynamicPageTitle></f:title><f:content><Panel headerText="토큰 유효성"><content><Label labelFor="tokenTimeSlider" text="토큰 유효성 엑세스(분)"/><Slider id="tokenTimeSlider" enabled="{setting>/enabled}" class="sapUiSmallMarginBottom"\r\n                            enableTickmarks="true" min="0" max="60" step="5" width="100%"\r\n                            value="{setting>/security/tokenPolicySettings/accessTokenValidity}"\r\n                        ><ResponsiveScale tickmarksBetweenLabels="1"/></Slider><Label text="토큰 유효성 새로고침(시간)"/><Slider id="refrashTokenTimeSlider" enabled="{setting>/enabled}" \r\n                            enableTickmarks="true" min="0" max="144" step="5" width="100%"\r\n                            value="{setting>/security/tokenPolicySettings/refreshTokenValidity}"\r\n                        ><ResponsiveScale tickmarksBetweenLabels="1"/></Slider></content></Panel></f:content></f:DynamicPage></mvc:View>\r\n',
	"com/myorg/myUI5App/view/user/CreateEditUserDialog.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:f="sap.ui.layout.form"><Dialog title="User"><content><f:SimpleForm id="userForm"><f:content><Label text="First Name" labelFor="FirstName" required="true"/><Input value="{user>/name/familyName}" /><Label text="Last Name"  required="true"/><Input value="{user>/name/givenName}"/><Label text="Email"  required="true"/><Input value="{user>/emails/0/value}" type="Email" valueStateText="이메일 형식이 아닙니다"/></f:content></f:SimpleForm></content><beginButton><Button text="Submit" type="Emphasized" press="onSubmit" /></beginButton><endButton><Button text="Cancel" press="onClose" /></endButton></Dialog></core:FragmentDefinition>',
	"com/myorg/myUI5App/view/user/CreateRoleDialog.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:f="sap.ui.layout.form"><Dialog title="Role"><content><f:SimpleForm id="roleForm"><f:content><Label text="Name" labelFor="FirstName" required="true"/><Input value="{role>/displayName}" /><Label text="Description"  required="true"/><Input value="{role>/description}"/></f:content></f:SimpleForm></content><beginButton><Button text="Submit" type="Emphasized" press="onSubmit" /></beginButton><endButton><Button text="Cancel" press="onClose" /></endButton></Dialog></core:FragmentDefinition>',
	"com/myorg/myUI5App/view/user/CurrentUser.view.xml":'<mvc:View controllerName="com.myorg.myUI5App.controller.user.CurrentUser" xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:f="sap.f" xmlns:form="sap.ui.layout.form" xmlns:mvc="sap.ui.core.mvc"><f:FlexibleColumnLayout id="fcl"><f:beginColumnPages><f:DynamicPage id="dynamicPageId" toggleHeaderOnTitleClick="false"><f:title><f:DynamicPageTitle><f:heading><Title text="Current User" /></f:heading></f:DynamicPageTitle></f:title><f:content><core:Fragment fragmentName="com.myorg.myUI5App.view.user.UserDetail"  type="XML" /></f:content></f:DynamicPage></f:beginColumnPages></f:FlexibleColumnLayout></mvc:View>\r\n',
	"com/myorg/myUI5App/view/user/Roles.view.xml":'<mvc:View xmlns:core="sap.ui.core" controllerName="com.myorg.myUI5App.controller.user.Roles" xmlns="sap.m" xmlns:f="sap.f" xmlns:form="sap.ui.layout.form" xmlns:mvc="sap.ui.core.mvc"><f:FlexibleColumnLayout id="fcl" layout="OneColumn"><f:beginColumnPages><f:DynamicPage id="dynamicPageId" toggleHeaderOnTitleClick="false"><f:title><f:DynamicPageTitle><f:heading><Title text="Roles" /></f:heading><f:actions><Button text="Create" press="onOpenDialog"/></f:actions></f:DynamicPageTitle></f:title><f:content><Table \r\n                        class="sapFDynamicPageAlignContent"\r\n                        itemPress="onRoleItemPress"\r\n                        items="{roles>/resources}"\r\n                        ><headerToolbar><OverflowToolbar><ToolbarSpacer /><SearchField search="onSearch" width="17.5rem" /></OverflowToolbar></headerToolbar><columns><Column><Text text="RoleName" /></Column><Column><Text text="Description" /></Column></columns><items><ColumnListItem type="Navigation"><cells><Text text="{roles>id}" /><Text text="{roles>description}" /></cells></ColumnListItem></items></Table></f:content></f:DynamicPage></f:beginColumnPages><f:midColumnPages><f:DynamicPage><f:title><f:DynamicPageTitle><f:heading><Title text="{role>/id}" /></f:heading><f:actions><Button text="Delete" type="Emphasized" press="deleteRole"/><Button press="onFCLOneColumn" type="Emphasized" icon="sap-icon://decline" /></f:actions></f:DynamicPageTitle></f:title><f:content><Table items="{role>/members}"><columns><Column><Text text="User_ID" /></Column><Column><Text text="User_Name" /></Column><Column><Text text="User_Email" /></Column></columns><items><ColumnListItem ><cells><Text text="{role>id}" /><Text text="{role>name/familyName} {role>name/givenName}"/><Text text="{role>emails/0/value}" /></cells></ColumnListItem></items></Table></f:content></f:DynamicPage></f:midColumnPages></f:FlexibleColumnLayout></mvc:View>\r\n',
	"com/myorg/myUI5App/view/user/RolesDialog.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:f="sap.ui.layout.form"><SelectDialog\r\n        title="Roles"\r\n        confirm="onCreateUserRole"\r\n        cancel="onClose"\r\n        items="{roles>/resources}"\r\n        search="onRoleSearch"\r\n        multiSelect="true"\r\n    ><StandardListItem\r\n        title="{roles>id}"\r\n        description="{roles>description}"\r\n        type="Active" /></SelectDialog></core:FragmentDefinition>',
	"com/myorg/myUI5App/view/user/UserDetail.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:form="sap.ui.layout.form"><VBox><form:SimpleForm title="{user>/userName}"><form:content><Label text="ID" /><Text text="{user>/id}" /><Label text="userName" /><Text text="{user>/userName}" /><Label text="emails" /><Text text="{user>/emails/0/value}" /><Label text="생성시간" /><Text text="{user>/meta/created}" /><Label text="마지막 업데이트" /><Text text="{user>/meta/lastModified}" /></form:content></form:SimpleForm><List items="{user>/groups}" mode="Delete" delete="onDeleteUserRole" class="sapUiSmallMarginBottom"><headerToolbar><OverflowToolbar><Text text="역할"/><ToolbarSpacer/><Button text="역할 추가" press="onOpenDialog"><customData><core:CustomData key="RolesDialog" value="addRole"/></customData></Button></OverflowToolbar></headerToolbar><items><StandardListItem title="{user>value}" /></items></List></VBox></core:FragmentDefinition>',
	"com/myorg/myUI5App/view/user/UserOverview.view.xml":'<mvc:View \r\ncontrollerName="com.myorg.myUI5App.controller.user.UserOverview" \r\nxmlns:core="sap.ui.core" \r\nxmlns="sap.m" \r\nxmlns:f="sap.f" \r\nxmlns:mvc="sap.ui.core.mvc"><f:DynamicPage id="dynamicPageId" toggleHeaderOnTitleClick="false"><f:title><f:DynamicPageTitle><f:heading><Title text="OverView" /></f:heading></f:DynamicPageTitle></f:title><f:content><HBox><GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop" header="유저 수" press="onTilePress"><customData><core:CustomData key="Users" value="Users" /></customData><TileContent><NumericContent value="{users>/totalResults}" withMargin="false" /></TileContent></GenericTile><GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop" header="역할 수" press="onTilePress"><customData><core:CustomData key="Roles" value="Roles" /></customData><TileContent><NumericContent value="{roles>/totalResults}" withMargin="false"/></TileContent></GenericTile></HBox></f:content></f:DynamicPage></mvc:View>\r\n',
	"com/myorg/myUI5App/view/user/Users.view.xml":'<mvc:View xmlns:core="sap.ui.core" controllerName="com.myorg.myUI5App.controller.user.Users" xmlns="sap.m" xmlns:f="sap.f" xmlns:form="sap.ui.layout.form" xmlns:mvc="sap.ui.core.mvc"><f:FlexibleColumnLayout id="fcl" layout="OneColumn"><f:beginColumnPages><f:DynamicPage id="dynamicPageId" toggleHeaderOnTitleClick="false"><f:title><f:DynamicPageTitle><f:heading><Title text="Users" /></f:heading><f:actions><Button text="Create" press="onOpenDialog"><customData><core:CustomData key="CreateEditUserDialog" value="Create"/></customData></Button></f:actions></f:DynamicPageTitle></f:title><f:content><Table \r\n                        id="usersTable" \r\n                        items="{users>/resources}"\r\n                        itemPress="onUserItemPress"\r\n                        ><columns><Column><Text text="User_ID" /></Column><Column><Text text="User_Name" /></Column><Column><Text text="User_Email" /></Column></columns><items><ColumnListItem type="Navigation" ><cells><Text text="{users>id}" /><Text text="{users>name/familyName} {users>name/givenName}"/><Text text="{users>emails/0/value}" /></cells></ColumnListItem></items></Table></f:content></f:DynamicPage></f:beginColumnPages><f:midColumnPages><f:DynamicPage><f:title><f:DynamicPageTitle><f:heading><Title text="{user>/id}" /></f:heading><f:actions><Button text="Edit" type="Emphasized" press="onOpenDialog"><customData><core:CustomData key="CreateEditUserDialog" value="Edit"/></customData></Button><Button text="Delete" type="Emphasized" press="deleteUser"/><Button press="onFCLOneColumn" type="Emphasized" icon="sap-icon://decline" /></f:actions></f:DynamicPageTitle></f:title><f:content><core:Fragment fragmentName="com.myorg.myUI5App.view.user.UserDetail"  type="XML" /></f:content></f:DynamicPage></f:midColumnPages></f:FlexibleColumnLayout></mvc:View>\r\n'
});
