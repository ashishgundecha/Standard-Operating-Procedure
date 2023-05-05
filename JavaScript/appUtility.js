(function () {
    var utility = {
        searchDelayMiliSecond: 800,
        searchDelay: function (args, callback, ms) {
            var context = this;
            clearTimeout(utility.searchDelayTimerInsatnce);
            utility.searchDelayTimerInsatnce = setTimeout(function () {
                callback.apply(context, args);
            }, ms || utility.searchDelayMiliSecond);
        },
        convertDateFormat: function (value, format) {
            if (value)
                value = moment(String(value)).format((format == undefined || format == null || format == "") ? 'MM/DD/YYYY' : format);
            return value;
        },
        convertDateTimeFormat: function (value, format) {
            if (value)
                value = moment(String(value)).format((format == undefined || format == null || format == "") ? 'MM/DD/YYYY HH:mm' : format);

            return value;
        },
        convertDateTimeToTick: function (value) {
            if (value)
                value = moment(value).valueOf();

            return value;
        },
        convertPDTDateFormat: function (value, format) {
            if (value) {
                var tz = 'America/Los_Angeles';
                value = moment.utc(value).tz(tz).format((format == undefined || format == null || format == "") ? 'MM/DD/YYYY' : format);
            }
            return value;
        },
        dateFormats: ["MM/DD/YYYY", "M/DD/YYYY", "M/D/YYYY", "MM/D/YYYY", "M/DD/YY", "M/D/YY", "MM/D/YY", "MM/DD/YY"],
        isValidDateFormat: function (value) {
            return !moment(value, utility.dateFormats, true).isValid()
        },
        usdCurrencyFormat: function (value) {
            if (value === undefined || value == null || value.toString().trim() === '') {
                return (0).toLocaleString('en-US', { style: 'currency', currency: 'USD', });
            }
            else
                return (value).toLocaleString('en-US', { style: 'currency', currency: 'USD', });
        },
        exportToExcel: function(data,fileName) {
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        },
    };
    window.application = $.extend(true, window.application, {
        "utility": utility
    });

})();
