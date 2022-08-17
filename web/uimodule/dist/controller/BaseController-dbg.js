sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/ui/core/UIComponent", "com/myorg/myUI5App/model/formatter"],
    function (Controller, History, UIComponent, formatter) {
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
            }
        });
    }
);
