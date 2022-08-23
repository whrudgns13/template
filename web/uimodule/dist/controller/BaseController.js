sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent","com/myorg/myUI5App/model/formatter","sap/m/MessageBox"],function(e,t,n,o,s){"use strict";return e.extend("com.myorg.myUI5App.controller.BaseController",{formatter:o,getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},navTo:function(e,t,n){this.getRouter().navTo(e,t,n)},getRouter:function(){return n.getRouterFor(this)},onNavBack:function(){const e=t.getInstance().getPreviousHash();if(e!==undefined){window.history.back()}else{this.getRouter().navTo("appHome",{},true)}},getCustomDataKey(e){let t=e.getCustomData()[0].getKey();return t},getCustomDataValue(e){let t=e.getCustomData()[0].getValue();return t},callSDK:function(e,t,n,o){let s=this;let a=r(e);jQuery.ajax({url:t,type:e,headers:a,data:JSON.stringify(n),success:function(t,n,s){if(n==="success"){o.bind(this)(t,s)}i(e,n)}.bind(s),error:function(e){console.log(e)}});function r(e){if(e!=="GET"){return{"Content-Type":"application/json","X-CSRF-Token":s.csrfToken}}return{"X-CSRF-Token":"Fetch"}}function i(e,n){if(n==="success"){switch(e){case"POST":new sap.m.MessageToast.show("생성 성공");break;case"PUT":new sap.m.MessageToast.show("변경 성공");break;case"DELETE":new sap.m.MessageToast.show("삭제 성공");t==="/app/users"?s.onFCLOneColumn():"";break}}}},onRoleSearch:function(e){let t=e.getParameter("value");let n=new sap.ui.model.Filter("id","Contains",t);let o=e.getParameter("itemsBinding");o.filter([n])},onFCLOneColumn:function(){let e=this.getView().byId("fcl");e.setLayout("OneColumn")},onFCLTwoColumn:function(){let e=this.getView().byId("fcl");e.setLayout("TwoColumnsBeginExpanded")},validationCheck:function(e){let t=/^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;let n=e.getContent();let o=n.filter(e=>e.getMetadata().getElementName()==="sap.m.Input");let s=true;o.some(e=>{let n=e.getValue();let o=e.getVisible();if(!n&&o){e.setValueState("Error");s=false;return false}if(e.getType()==="Email"&&!n.match(t)){e.setValueState("Error");s=false;return false}e.setValueState("None")});return s},showWarningBox:function(){return new Promise((e,t)=>{s.alert("정말 삭제하시겠습니까?",{icon:"WARNING",actions:[s.Action.OK,s.Action.CANCEL],emphasizedAction:s.Action.OK,onClose:function(t){t==="OK"?e(true):e(false)}})})}})});