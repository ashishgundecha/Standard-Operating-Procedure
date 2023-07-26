# Standard-Operating-Procedure

#Cookie Policy
1. We MUST use:
    app.UseCookiePolicy(new CookiePolicyOptions
    {
        HttpOnly = HttpOnlyPolicy.Always
    });

2. Token name should be "token".
3. Securing Cookies: We need to have HTTPOnly = true and Secure = true
4. Passing cookies with axios reading: 
    const instance = axios.create({
         withCredentials: true
   });
