(function () {

    var JWTToken = {
        getRoleId: function () {
            var userData = application.JWTToken.getDecodedToken();
            var roleId = 0;
            if (userData != undefined && userData != null)
                roleId = (isNaN(parseInt(userData.RoleId))) ? 0 : userData.RoleId;

            return roleId;
        },
        getDecodedToken: function () {
            var token = application.appStore.get('api-access-token');
            if (token) {
                var userData = jwt_decode(token);
                return userData;
            }
        },
        getTokenExpiryTime: function (token) {
            if (token) {
                var data = jwt_decode(token);
                if (data)
                    return new Date(data.exp * 1000);
            }
            return new Date();
        }
    };
    window.application = $.extend(true, window.application, {
        "JWTToken": JWTToken
    });

})();
