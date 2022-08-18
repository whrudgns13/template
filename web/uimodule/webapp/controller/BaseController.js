sap.ui.define(
    ["sap/ui/core/mvc/Controller", 
    "sap/ui/core/routing/History", 
    "sap/ui/core/UIComponent", 
    "com/myorg/myUI5App/model/formatter",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
],
    function (Controller, History, UIComponent, formatter, Fragment ,MessageBox) {
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
            callSDK: function (sMethod, oData,sUrl) {
                const _self = this;
                const oViewId = this.getView().getId();
                const oHeader = getHeader(sMethod);
                const sCallUrl = sUrl ? sUrl : "/app/users";

                jQuery.ajax({
                    url : sCallUrl,
                    type: sMethod,
                    headers: oHeader,
                    data: JSON.stringify(oData),
                    success: function (data, textStatus, xhr) {
                        if(sMethod==="GET" && sCallUrl==="/app/group"){
                            setRoles(data);
                            return;
                        }

                        if(sMethod==="GET" && sCallUrl==="/app/users/currentUser"){
                            setCurrentUser(data);
                            return;
                        }
                        
                      
                        if(sMethod==="GET" && sCallUrl=== "/app/users"){
                            setUsers(data, xhr);
                            return;
                        }
                        
                        //id로 판단해서 정보 다시가져오기
                        oViewId.indexOf("Users") > 0 ? _self.callSDK("GET") : _self.callSDK("GET",{},"/app/users/currentUser"); 
                        statusMessage(sMethod, textStatus);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });

                function getHeader(sMethod) {
                    if (sMethod !== "GET") {
                        return {
                            "Content-Type": "application/json",
                            "X-CSRF-Token": _self.csrfToken
                        };
                    }

                    return { "X-CSRF-Token": "Fetch" };
                }

                function setUsers(data, xhr) {
                    _self.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
                    _self._usersModel.setProperty("/", data);
                    if (_self._userPath) setUser();           
                }
                
                function setUser(){
                    _self._userModel.setProperty("/", _self._usersModel.getProperty(_self._userPath));
                }

                function setCurrentUser(data){
                    _self._userModel.setProperty("/",data);
                }
                
                function setRoles(data){
                    _self._rolesModel.setProperty("/", data);
                }

                function statusMessage(sMethod,textStatus){
                    if(textStatus==="success"){
                        switch (sMethod){
                            case "POST" : 
                                new sap.m.MessageToast.show("생성 성공");
                            break;
                            case "PUT" : 
                                new sap.m.MessageToast.show("변경 성공");
                            break;
                            case "DELETE" : 
                                new sap.m.MessageToast.show("삭제 성공");
                                sCallUrl === "/app/user" ? _self.onFCLOneColumn() : "";
                            break;
                        }
                    }
                }
            },
            onDeleteUserRole: async function (oEvent) {
                const oListItem = oEvent.getParameter("listItem");
                const bCheck = await this.showWarningBox();
                const oDelete = {
                    groupId: oListItem.getTitle(),
                    userId: this._userModel.getProperty("/id")
                };

                if (bCheck) {
                    this.callSDK("DELETE",oDelete,"/app/group");
                }
            },
            onCreateUserRole: function (oEvent) {
                const oSelectedItems = oEvent.getParameter("selectedItems");
                const aRoleId = oSelectedItems.map(selectedItem => selectedItem.getTitle());
                const sUserId = this._userModel.getProperty("/id");
                
                aRoleId.forEach(roleId => {
                    const oGroups = {
                        id: roleId,
                        group: {
                            "type": "USER",
                            "value": sUserId,
                            "origin": "sap.default"
                        }
                    };
                    this.callSDK("POST",oGroups,"/app/group");
                });
            },
            onRoleSearch: function (oEvent) {
                const sValue = oEvent.getParameter("value");
                const oFilter = new sap.ui.model.Filter("id", "Contains", sValue);
                const oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter([oFilter]);
            },
            onClose: function () {
                this.oDialog.then(dialog => dialog.close());
            },
            onFCLOneColumn : function(){
                let oFCL = this.getView().byId("fcl");
                oFCL.setLayout("OneColumn");
            },
            onFCLTwoColumn : function(){
                let oFCL = this.getView().byId("fcl");
                oFCL.setLayout("TwoColumnsBeginExpanded");                
            },
            validationCheck: function () {
                const mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
                let oUserFormContent = sap.ui.getCore().byId("userForm").getContent();
                let oUserFormInputs = oUserFormContent.filter(oControl => oControl.getMetadata().getElementName() === "sap.m.Input");
                let bCheck = true;
                
                //forEach에서 break나 continue사용못해서 some
                //return false 면 continue / true면 break;
                oUserFormInputs.some( oInput => {
                    let oInputValue = oInput.getValue();
                    
                    if (!oInputValue) {
                        oInput.setValueState("Error");
                        bCheck = false;
                        return false;
                    }

                    if (oInput.getType() === "Email" && !oInputValue.match(mailregex)) {
                        oInput.setValueState("Error");
                        bCheck = false;
                        return false;
                    }
                    
                    oInput.setValueState("None");
                })
                return bCheck;
            },
            showWarningBox: function () {
                return new Promise((resolve, reject) => {
                    MessageBox.alert("정말 삭제하시겠습니까?", {
                        icon: "WARNING",
                        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {
                            sAction === "OK" ? resolve(true) : resolve(false);
                        }
                    });
                });
            },
        });
    }
);
