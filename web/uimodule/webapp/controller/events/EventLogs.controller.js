sap.ui.define(
    [
        "../BaseController"
    ],
    function (Controller) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.events.EventLogs", {
            onInit : function(){
                this.getEvents();
            },
            getEvents : function(){
                jQuery.ajax({
                    url : "/app/events",
                    type : "GET",
                    success : function(data){
                        console.log(data);
                    },
                    error : function(error){
                        console.log(error);
                    }
                })
            }
        });
    }
);
