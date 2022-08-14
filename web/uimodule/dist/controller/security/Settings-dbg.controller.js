sap.ui.define(
    [
        "../BaseController",
        "../../model/formatter"
    ],
    function (Controller,formatter) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.security.Settings", {
            formatter: formatter,
            onInit : function(){
                const oView = this.getView();
                const oJSONModel = new sap.ui.model.json.JSONModel({
                    enabled : false,
                    visible : true
                });
                oView.setModel(oJSONModel,"setting");
                this._slider = oView.getModel("setting");
                this.getSetting();
            },
            getSetting : function(){
                const _self = this;
                jQuery.ajax({
                    url: "/app/security",
                    type: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (data, textStatus, xhr) {
                        _self.csrfToken = xhr.getResponseHeader("x-csrf-token");
                        _self._slider.setProperty("/security", data);
                        console.log(data);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },
            onTokenTimeEdit : function(){
                this._slider.setProperty("/enabled",true);
                this._slider.setProperty("/visible",false);
            },
            onTokenTimeSave : function(){
                const accessTime = this._slider.getProperty("/security/tokenPolicySettings/accessTokenValidity")*60;
                const refreshTime = this._slider.getProperty("/security/tokenPolicySettings/refreshTokenValidity")*3600;
                console.log(accessTime);
                console.log(refreshTime);
            },
            onCancel : function(){
                this._slider.setProperty("/enabled",false);
                this._slider.setProperty("/visible",true);
            }
        });
    }
);
