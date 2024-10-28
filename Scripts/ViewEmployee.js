"use strict";
var KTDatatablesBasicBasic = function () {

	var initTable1 = function () {
		var table = $('#kt_table_1');

		// begin first table
		table.DataTable({
			responsive: true,

			// DOM Layout settings
			dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,

			lengthMenu: [5, 10, 25, 50],

			pageLength: 10,

			language: {
				'lengthMenu': 'Display _MENU_',
			},

			// Order settings
			order: [[1, 'desc']],

			

			columnDefs: [
			
				{
					targets: 5,
					render: function (data, type, full, meta) {
						var status = {
							1: { 'title': 'Available', 'class': ' kt-badge--success' },
							2: { 'title': 'Not Available', 'class': ' kt-badge--danger' },
						

						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="kt-badge ' + status[data].class + ' kt-badge--inline kt-badge--pill">' + status[data].title + '</span>';
					},
				},
			
			],
		});

		
	};

	return {

		//main function to initiate the module
		init: function () {
			initTable1();
		},

	};

}();

jQuery(document).ready(function () {
	KTDatatablesBasicBasic.init();
});