$.extend(true, $.fn.dataTable.defaults, {
    order: [],
    searching: true,
    ordering: true,
    iDisplayLength: 25,
    lengthMenu: [[50, 100, 250, 500, 1000, -1], [50, 100, 250, 500, 1000, "Show All"]],
    pageLength: 50,
    //bLengthChange: false,
    //dom: '<"pull-left"f><"pull-right"l>tip',
    dom: '<"top"i>Bfrtip',
    orderCellsTop: true,
    //fixedHeader: true,
    buttons: [
        'pageLength',
        {
            extend: 'excel',
            text: '<span><i class="fas fa-file-excel dtExcelIcon"></i>Export Excel</span>',
            footer: true,
            message: ''
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
    language: {
        processing: 'Loading...',
        lengthMenu: "Display _MENU_ Records Per Page",
        searchPlaceholder: "Search",
    },
    initComplete: function (settings, json) {
        $('div.loading').hide();
        $(this).show();
    },
    columnDefs: [{
        orderable: false,
        targets: 'nosort',
    }],
});
