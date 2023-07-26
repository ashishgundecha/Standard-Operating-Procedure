(function () {
   //Cookie : Auth Header Token will be stored in cookie
   //LocalStorage : Data for persisting non-secure
   //Session Storage : Data for persisting on current page (not used often)
    
    var appCookieStore = {
        get: function (key) {
            return Cookies.get(key);
        },
        save: function (key, value) {
            var expiry = value.includes("Bearer") ? Application.JWTToken.getTokenExpiryTime(value) : Application.JWTToken.getTokenExpiryTime(Application.appCookieStore.get("api-access-token"));
            Cookies.set(key, value, { expires: expiry, path: '/' });
        },
        delete: function (key) {
            Cookies.remove(key);
        },
        clear: function () {
            var cookies = Cookies.get()
            for (var cookie in cookies) {
                Application.appCookieStore.delete(cookie);
            }
        },
    };

    var appSessionStore = {
        get: function (key) {
            return sessionStorage.getItem(key);
        },
        save: function (key, value) {
            return sessionStorage.setItem(key, value);
        },
        delete: function (key) {
            sessionStorage.removeItem(key);
        },
        clear: function () {
            sessionStorage.clear();
        },
    };

    window.Application = $.extend(true, window.Application, {
        "appSessionStore": appSessionStore,
        "appCookieStore": appCookieStore
    });

})();
