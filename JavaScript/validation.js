(function () {
  
    var validation = {
        validateStringValue: function (value, fieldName, errorObj) {
            if (value === undefined || value == null || value.toString().trim() === '') {
                errorObj[fieldName] = "The " + fieldName + " field is required";
                return false;
            }
            else
                return true
        },
        validateIntegerValue: function (value, fieldName, errorObj) {
            if (value === undefined || value == null || value.toString().trim() === '' || value === 0) {
                errorObj[fieldName] = "The " + fieldName + " field is required";
                return false;
            }
            else
                return true
        },
        validateEmailAddress: function (value, fieldName, errorObj) {
            if (value !== undefined && value != null && value.toString().trim() !== '' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
                errorObj[fieldName] = "The " + fieldName + " field must be a valid email";
                return false;
            }
            else
                return true
        },
        validateStringLength: function (value, fieldName, errorObj) {
            if (value !== undefined && value != null && value.length < 5) {
                errorObj[fieldName] = "The " + fieldName + " field must be at least 5 characters";
                return false;
            }
            else
                return true
        },
        validateIPaddress(value, fieldName, errorObj) {
            if (value !== undefined && value != null && value.toString().trim() !== '' && !(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value))) {
                errorObj[fieldName] = "The " + fieldName + " field must be a valid";
                return false;
            }
            else
                return true;

        },
        validateComapreStringValue: function (firstValue, secondValue, fieldName, errorObj) {
            if (firstValue != undefined && firstValue != null && firstValue.toString().trim() != '' && secondValue != undefined && secondValue != null && secondValue.toString().trim() != '') {
                if (firstValue.trim() != secondValue.trim()) {
                    errorObj[fieldName] = "The " + fieldName + " does not match";
                    return false;
                }
            }
            else
                return true
        },
        validateDateField(value, fieldName, errorObj) {
            if (value != undefined && value != null && value.toString().trim() !== '' && !moment(value, utility.dateFormats, true).isValid()) {
                errorObj[fieldName] = "Invalid Date Format!";
                return false;
            }
            else
                return true
        },
        validatePasswordRules(rule, value) {
            if (rule == undefined || rule == null || value == undefined || value == null || value == '') {
                return false;
            }
            if (rule == "SpecialCharacter") {
                var specialCharacterLetters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                if (specialCharacterLetters.test(value))
                    return true;
                else
                    return false;
            }
            else if (rule == "UpperCase") {
                var upperCaseLetters = /[A-Z]/g;
                if (value.match(upperCaseLetters))
                    return true;
                else
                    return false;
            }
            else if (rule == "Number") {
                var numbers = /[0-9]/g;
                if (value.match(numbers))
                    return true;
                else
                    return false;
            }
            else if (rule == "Length") {
                if (value.length >= 8)
                    return true;
                else
                    return false;
            }
        },
        passwordRuleLabel: {
            validSpecialCharacter: "A <b>Special Character</b>",
            validCapital: "A <b>capital (uppercase)</b> letter",
            validNumbers: "A <b>number</b>",
            validLength: "Minimum <b>8 characters</b>",
        },
        checkPasswordRule: function (newPassword) {
            var result = {};
            result.isValidSpecialCharacter = application.validation.validatePasswordRules("SpecialCharacter", newPassword);
            result.isValidCapital = application.validation.validatePasswordRules("UpperCase", newPassword);
            result.isValidNumbers = application.validation.validatePasswordRules("Number", newPassword);
            result.isValidLength = application.validation.validatePasswordRules("Length", newPassword);
            return result;
        },
        validateChangePassword: function (oldPassword, newPassword, confirmPassword, errors) {
            application.validation.validateStringValue(oldPassword, "oldPassword", errors);
            application.validation.validateStringValue(newPassword, "newPassword", errors);
            application.validation.validateStringValue(confirmPassword, "confirmPassword", errors);
            application.validation.validateComapreStringValue(newPassword, confirmPassword, "confirmPassword", errors);
            var resultCheckPasswordRule = application.validation.checkPasswordRule(newPassword);
            if (newPassword != undefined && newPassword != null && newPassword != "") {
                if (!resultCheckPasswordRule.isValidSpecialCharacter || !resultCheckPasswordRule.isValidCapital || !resultCheckPasswordRule.isValidNumbers || !resultCheckPasswordRule.isValidLength) {
                    errors['newPassword'] = "Password does not match the rules!";
                }
            }
        }
    };
    window.application = $.extend(true, window.application, {
        "validation": validation
    });

})();
