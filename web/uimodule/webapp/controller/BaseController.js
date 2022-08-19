sap.ui.define(
    [
    "sap/ui/core/mvc/Controller", 
    "sap/ui/core/routing/History", 
    "sap/ui/core/UIComponent", 
    "com/myorg/myUI5App/model/formatter",
],
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
            getCustomDataKey(oControl) {
                let sCustomDataKey = oControl.getCustomData()[0].getKey();
                return sCustomDataKey;
            },
            getCustomDataValue(oControl) {
                let sCustomDataValue = oControl.getCustomData()[0].getValue();
                return sCustomDataValue;
            }
        });
    }
);
