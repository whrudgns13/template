sap.ui.define(
    [
        "./BaseController"
    ],
    function (Controller) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.MainToolPage", {
            onInit : function(){
                this.getPermission();
            },
            getPermission : function(){
                const _self = this;

                jQuery.ajax({
                    url : "/app",
                    type : "GET",
                    success : function(data,text,xhr){
                        console.log(text);
                        console.log(xhr);
                        _self.setModel(new sap.ui.model.json.JSONModel(data));
                    },
                    error : function(error){
                        _self.navTo("Forbidden");
                        console.log("Error");
                        console.log(error);
                    }
                });
                
            },
            onItemSelect : function(oEvent){
                const oItem = oEvent.getParameter("item");
                this.navTo(oItem.getKey());
            }
        });
    }
);
