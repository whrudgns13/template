sap.ui.define([
    "../BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.user.CurrentUser", {
            onInit: function () {
                this.getCurrentUser();
            },
            getCurrentUser: function () {
                const _self = this;
                const oView = this.getView()
                jQuery.ajax({
                    url: "/app/users/currentUser",
                    type: "GET",
                    async: false,
                    success: function (data, textStatus, xhr) {
                        const oJSONModel  = new sap.ui.model.json.JSONModel(data);
                        oView.setModel(oJSONModel,"currentUser")   
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }
        });
    });
