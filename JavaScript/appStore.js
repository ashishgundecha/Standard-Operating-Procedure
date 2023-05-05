(function () {
   
    var appStore = {
        get: function (key) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${key}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },
        save: function (key, value) {
            var expiry = value.includes("Bearer") ? application.JWTToken.getTokenExpiryTime(value) : application.JWTToken.getTokenExpiryTime(application.appStore.get("api-access-token"));
            document.cookie = key + "=" + value + ";expires=" + expiry.toUTCString() + ";path = /";
        },
        delete: function (key) {
            document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        },
        clear: function () {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        },
    };

    window.application = $.extend(true, window.application, {
        "appStore": appStore
    });

})();
