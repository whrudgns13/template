sap.ui.define(
    [
        "../BaseController",
        "sap/m/MessageBox"
    ],
    function (Controller,MessageBox) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.user.UserCommon", {
            callSDK: function (sMethod, sUrl, oData) {
                let _self = this;
                let oViewId = this.getView().getId();
                let oHeader = getHeader(sMethod);
             
                jQuery.ajax({
                    url : sUrl,
                    type: sMethod,
                    headers: oHeader,
                    data: JSON.stringify(oData),
                    success: function (data, textStatus, xhr) {
                        if(sMethod==="GET" && sUrl=== "/app/users"){
                            setUsers(data, xhr);
                            return;
                        }
                        
                        if(sMethod==="GET" && sUrl==="/app/group"){
                            setRoles(data);
                            return;
                        }

                        if(sMethod==="GET" && sUrl==="/app/users/currentUser"){
                            setCurrentUser(data);
                            return;
                        }
                        
                        //id로 판단해서 정보 다시가져오기
                        //그냥 view에 직접적으로 넣는 방법도??
                        oViewId.indexOf("Users") > 0 ? _self.callSDK("GET","/app/users") : _self.callSDK("GET","/app/users/currentUser"); 
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
                                sUrl === "/app/user" ? _self.onFCLOneColumn() : "";
                            break;
                        }
                    }
                }
            },
            onDeleteUserRole: async function (oEvent) {
                let oListItem = oEvent.getParameter("listItem");
                let bCheck = await this.showWarningBox();
                let oDelete = {
                    groupId: oListItem.getTitle(),
                    userId: this._userModel.getProperty("/id")
                };

                if (bCheck) {
                    this.callSDK("DELETE", "/app/group", oDelete);
                }
            },
            onCreateUserRole: function (oEvent) {
                let oSelectedItems = oEvent.getParameter("selectedItems");
                let aRoleId = oSelectedItems.map(selectedItem => selectedItem.getTitle());
                let sUserId = this._userModel.getProperty("/id");
                
                aRoleId.forEach(roleId => {
                    let oGroups = {
                        id: roleId,
                        group: {
                            "type": "USER",
                            "value": sUserId,
                            "origin": "sap.default"
                        }
                    };
                    this.callSDK("POST", "/app/group", oGroups);
                });
            },
            onRoleSearch: function (oEvent) {
                let sValue = oEvent.getParameter("value");
                let oFilter = new sap.ui.model.Filter("id", "Contains", sValue);
                let oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter([oFilter]);
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
                let mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
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
