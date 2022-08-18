sap.ui.define(
    ["./BaseController"], 
    function (BaseController) {
        "use strict";

        return BaseController.extend("com.myorg.myUI5App.controller.controller.App", {
            onInit : function(){
                this.getPermission();
            },
            getPermission : function(){
                const _self = this;

                jQuery.ajax({
                    url : "/app",
                    type : "GET",
                    success : function(data,text,xhr){
                        console.log(data);
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
            }

        });
    }
);
