(function () {
    var callAjax = function (apiPath, method, params, data) {

        var def = new $.Deferred();

        var dataToSend = data;
        apiPath = (application.api.getBaseURL() + "/" + apiPath);

        if (method == "GET") {
            if (params) {
                axios.get(apiPath, { params: params }, {
                    headers: {
                        'Authorization': application.appStore.get("api-access-token")
                    }
                }).then(function (response) {
                    def.resolve(response);
                }).catch(function (error) {
                    if (error.response.status == 401)
                        window.location.href = "/Authentication";
                    else 
						console.log('error', error);
                    def.reject(error);
                });
            }
            else {
                axios.get(apiPath, {
                    headers: {
                        'Authorization': application.appStore.get("api-access-token")
                    }
                }).then(function (response) {
                    def.resolve(response);
                }).catch(function (error) {
                    if (error.response.status == 401)
                        window.location.href = "/Authentication";
                    else
						console.log('error', error);
                    def.reject(error);
                });
            }
        } else if (method == "POST") {
            axios.post(apiPath, dataToSend, {
                headers: {
                    'Authorization': application.appStore.get("api-access-token")
                }
            }).then(function (response) {
                def.resolve(response);
            }).catch(function (error) {
                if (error.response.status == 401)
                    window.location.href = "/Authentication";
                else 
					console.log('error', error);
                def.reject(error);
            });
        } else if (method == "DELETE") {
            axios.delete(apiPath, { data: dataToSend }, {
                headers: {
                    'Authorization': application.appStore.get("api-access-token")
                }
            }).then(function (response) {
                def.resolve(response);
            }).catch(function (error) {
                if (error.response.status == 401)
                    window.location.href = "/Authentication";
                else
					console.log('error', error);
                def.reject(error);
            })
        }
        else if (method == "FILE_DOWNLOAD") {
            $("#loading-wrapper").show();
            if (dataToSend) {
                axios.post(apiPath, dataToSend, {
                    headers: {
                        'Authorization': application.appStore.get("api-access-token")
                    },
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    $("#loading-wrapper").hide();
                    def.resolve(response);
                }).catch(function (error) {
                    $("#loading-wrapper").hide();
                    if (error.response.status == 401)
                        window.location.href = "/Authentication";
                    else 
						console.log('error', error);
                    def.reject(error);
                });
            }
            else {
                axios.get(apiPath, {
                    headers: {
                        'Authorization': application.appStore.get("api-access-token")
                    },
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    $("#loading-wrapper").hide();
                    def.resolve(response);
                }).catch(function (error) {
                    $("#loading-wrapper").hide();
                    if (error.response.status == 401)
                        window.location.href = "/Authentication";
                    else 
						console.log('error', error);
                    def.reject(error);
                });
            }
        }

        return def.promise();
    };

    var getData = function (apiPath, params) { return callAjax(apiPath, "GET", params); };
    var postData = function (apiPath, dataToSend) { return callAjax(apiPath, "POST", undefined, dataToSend); };
    var deleteData = function (apiPath, dataToSend) { return callAjax(apiPath, "DELETE", undefined, dataToSend); };
    var fileDownload = function (apiPath, dataToSend) { return callAjax(apiPath, "FILE_DOWNLOAD", undefined, dataToSend); };

    var api = {
        getBaseURL: function () {
            if (window.location.origin.includes("localhost"))
                return "https://localhost";
            else
                return window.applicationDefaultApiUrl;
        },
        getClientList: function () {
            return getData("api/Public/selectclient");
        },
        saveClient: function (dataToSend) {
            return postData("api/Public/saveClient/", dataToSend);
        },
		getClientById: function (id) {
            return getData("api/Client/getClientById/" + id);
        },
		deleteClient: function (id) {
            return postData("api/Client/delete/" + id);
        },
        exportClientReport: function (beginDate, endDate) {
            return fileDownload("api/Report/getClientReport/" + beginDate + "/" + endDate, undefined);
        },
    };

    window.application = $.extend(true, window.application, { "api": api });
   

})();
