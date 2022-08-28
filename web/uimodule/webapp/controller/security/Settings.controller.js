sap.ui.define(
    [
        "../BaseController",
        "../../model/formatter"
    ],
    function (Controller, formatter) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.security.Settings", {
            formatter: formatter,
            onBeforeRendering: function () {
                const oView = this.getView();
                const oJSONModel = new sap.ui.model.json.JSONModel({
                    enabled: false,
                    visible: true
                });
                oView.setModel(oJSONModel, "setting");
                this._slider = oView.getModel("setting");
                this.getSetting();
            },
            getSetting: function () {
                this.callSDK("GET","/app/security",undefined,this.setSetting);
            },
            setSetting : function(data){
                this.csrfToken = xhr.getResponseHeader("x-csrf-token");
                data.tokenPolicySettings = _self.tokenTimeConversion(data.tokenPolicySettings);
                this._slider.setProperty("/security", data);
            },
            tokenTimeConversion: function (settings) {
                settings.accessTokenValidity = settings.accessTokenValidity / 60;
                settings.refreshTokenValidity = settings.refreshTokenValidity / 3600;
                return settings;
            },
            getUpdateTokenSettings: function () {
                const accessTime = this._slider.getProperty("/security/tokenPolicySettings/accessTokenValidity") * 60;
                const refreshTime = this._slider.getProperty("/security/tokenPolicySettings/refreshTokenValidity") * 3600;
                const oTokenSettings = {
                    tokenPolicySettings: {
                        accessTokenValidity: accessTime,
                        refreshTokenValidity: refreshTime
                    }
                }
                return oTokenSettings;
            },
            onTokenTimeSave: function () {
                this.callSDK("PATCH","/app/security",this.getUpdateTokenSettings(),this.getSetting);
                this.onChangeState();
            },
            onChangeState: function () {
                let bEnabled = this._slider.getProperty("/enabled");
                let bVisible = this._slider.getProperty("/visible");
                this._slider.setProperty("/enabled", !bEnabled);
                this._slider.setProperty("/visible", !bVisible);
            }
        });
    }
);
