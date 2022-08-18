sap.ui.define(
    ["sap/ui/core/mvc/Controller", 
    "sap/ui/core/routing/History", 
    "sap/ui/core/UIComponent", 
    "com/myorg/myUI5App/model/formatter",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
],
    function (Controller, History, UIComponent, formatter, Fragment ,MessageBox) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.BaseController", {
            formatter: formatter,
            getModel: function (sName) {
                return this.getView().getModel(sName);
            },
            setModel: function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            },
            getResourceBundle: function () {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle();
            },
            navTo: function (psTarget, pmParameters, pbReplace) {
                this.getRouter().navTo(psTarget, pmParameters, pbReplace);
            },
            getRouter: function () {
                return UIComponent.getRouterFor(this);
            },
            onNavBack: function () {
                const sPreviousHash = History.getInstance().getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.back();
                } else {
                    this.getRouter().navTo("appHome", {}, true /* no history*/);
                }
            },
            callSDK: function (sMethod, oData,sUrl) {
                const _self = this;                
                const oHeader = getHeader(sMethod);
                const sCallUrl = sUrl ? sUrl : "/app/users";

                jQuery.ajax({
                    url : sCallUrl,
                    type: sMethod,
                    headers: oHeader,
                    data: JSON.stringify(oData),
                    success: function (data, textStatus, xhr) {
                        if(sMethod==="GET" && sCallUrl==="/app/group"){
                            setRoles(data);
                            return;
                        }

                        if(sMethod==="GET" && sCallUrl==="/app/users/currentUser"){
                            setCurrentUser(data);
                            return;
                        }

                        if(sMethod==="GET"){
                            setUsers(data, xhr);
                            return;
                        }

                        _self.callSDK("GET");
                        statusMessage(sMethod, textStatus);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });

                function getHeader(sMethod) {
                    console.log(_self);
                    if (sMethod !== "GET") {
                        return {
                            "Content-Type": "application/json",
                            "X-CSRF-Token": _self.csrfToken
                        };
                    }

                    return { "X-CSRF-Token": "Fetch" };
                }

                function setUsers(data, xhr) {
                    _self.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
                    _self._userModel.setProperty("/users", data);
                    if (_self._userPath) setUser();           
                }
                
                function setUser(){
                    _self._userModel.setProperty("/user", _self._userModel.getProperty(_self._userPath))
                }

                function setCurrentUser(data){
                    _self._userModel.setProperty("/user",data);
                }
                
                function setRoles(data){
                    _self._rolesModel.setProperty("/", data);
                }

                function statusMessage(sMethod,textStatus){
                    if(textStatus==="success"){
                        switch (sMethod){
                            case "POST" : 
                                new sap.m.MessageToast.show("생성 성공");
                            break;
                            case "PUT" : 
                                new sap.m.MessageToast.show("변경 성공");
                            break;
                            case "DELETE" : 
                                new sap.m.MessageToast.show("삭제 성공");
                                sCallUrl === "/app/user" ? _self.onFCLOneColumn() : "";
                            break;
                        }
                    }
                }
            },
            onFCLOneColumn : function(){
                let oFCL = this.getView().byId("fcl");
                oFCL.setLayout("OneColumn");
            },
            onFCLTwoColumn : function(){
                let oFCL = this.getView().byId("fcl");
                oFCL.setLayout("TwoColumnsBeginExpanded");                
            },
            validationCheck: function () {
                const mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
                let oUserFormContent = sap.ui.getCore().byId("userForm").getContent();
                let oUserFormInputs = oUserFormContent.filter(oControl => oControl.getMetadata().getElementName() === "sap.m.Input");
                let bCheck = true;
                
                //forEach에서 break나 continue사용못해서 some
                //return false 면 continue / true면 break;
                oUserFormInputs.some( oInput => {
                    let oInputValue = oInput.getValue();
                    
                    if (!oInputValue) {
                        oInput.setValueState("Error");
                        bCheck = false;
                        return false;
                    }

                    if (oInput.getType() === "Email" && !oInputValue.match(mailregex)) {
                        console.log(`emails`);
                        oInput.setValueState("Error");
                        bCheck = false;
                        return false;
                    }
                    
                    oInput.setValueState("None");
                })
                return bCheck;
            },
            showWarningBox: function () {
                return new Promise((resolve, reject) => {
                    MessageBox.alert("정말 삭제하시겠습니까?", {
                        icon: "WARNING",
                        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {
                            sAction === "OK" ? resolve(true) : resolve(false);
                        }
                    });
                });
            },
        });
    }
);
