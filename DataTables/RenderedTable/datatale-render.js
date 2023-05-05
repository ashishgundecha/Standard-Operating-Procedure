$(document).ready({
    var serverData = [
        {
            id:1,
            name: "abc",
            qty: 1,
            amount: 23,
            date:"2023-05-04 12:15"
        },
        {
            id: 2,
            name: "zxy",
            qty: 2,
            amount: 30,
            date: "2023-04-03 14:20"

        },
        {
            id: 3,
            name: "mnp",
            qty: 5,
            amount: 40,
            date: "2023-05-01 13:10"

        }];
    $('#table-order').DataTable({
        searching: true,
        paging: true,
        "bAutoWidth": false,
        data: serverData,
        buttons: [
            {
                extend: 'excel',
                text: '<span><i class="fas fa-file-excel dtExcelIcon"></i>Export Excel</span>',
                footer: true,
            },
            {
                extend: 'pdf',
                orientation: 'landscape',
                text: '<span><i class="fas fa-file-pdf dtPdfIcon"></i>Export PDF</span>',
                customize: function (doc) {
                    var colCount = new Array();
                    $(this).find('tbody tr:first-child td').each(function () {
                        if ($(this).attr('colspan')) {
                            for (var i = 1; i <= $(this).attr('colspan'); $i++) {
                                colCount.push('*');
                            }
                        } else { colCount.push('*'); }
                    });
                }
            }
        ],
        columns: [
            {
                data: "name", title: "Name", render: function (data, type, row) {
                    return '<a href="/Order?id=' + row.id + '">' + row.name + '</a>';
                }
            },
            { data: "qty", type: "num", title: "Qty" },
            {
                data: "amount", title: "Amount", type: "num", render: function (data, type, row) {
                    return usdCurrencyFormat(row.date);
                }
            },
            {
                data: "date", title: "Date", type: "date", render: function (data, type, row) {
                    if (type == "sort")
                        return row.date;
                    return convertDateFormat(row.date);
                }
            },
        ]
    });

    function convertDateFormat(date) {
        return moment(date).format((format == undefined || format == null || format == "") ? 'MM/DD/YYYY' : format);
    }

    function usdCurrencyFormat: function (value) {
        return (value).toLocaleString('en-US', { style: 'currency', currency: 'USD', });
    }
})