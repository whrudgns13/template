sap.ui.define(
    [
        "./BaseController"
    ],
    function (Controller) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.MainToolPage", {
            onItemSelect : function(oEvent){
                const oItem = oEvent.getParameter("item");
                this.navTo(oItem.getKey());
            }           
        });
    }
);
