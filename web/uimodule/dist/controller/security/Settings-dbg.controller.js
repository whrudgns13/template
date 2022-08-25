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
                        data.tokenPolicySettings = _self.tokenTimeConversion(data.tokenPolicySettings);
                        _self._slider.setProperty("/security", data);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
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
                const _self = this;

                jQuery.ajax({
                    url: "/app/security",
                    data: JSON.stringify(_self.getUpdateTokenSettings()),
                    type: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": _self.csrfToken
                    },
                    success: function (data, textStatus, xhr) {
                        if (textStatus === "success") new sap.m.MessageToast.show("변경 성공");
                        _self.onChangeState();
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });

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
