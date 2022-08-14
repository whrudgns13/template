sap.ui.define([], function () {
    "use strict";
    return {
        accessTime : function(time){
            if(time<=-1){
                return 0 ;
            }
        },
        refreshTime : function(time){
            if(time<=-1){
                return 0 ;
            }
        }
    };
});
