﻿"use strict";

// Class definition
var PatientDashboard = function () {



    var initTable1 = function () {
        var PatientList = $('#PatientList');

        var TodoList = $('#todoList');
     
        // begin first table
        PatientList.DataTable({
            responsive: true,
           

            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "bAutoWidth": false,


            columnDefs: [
                {
                    targets: -1,
                    title: 'Actions',

                    orderable: false,
                    className:'dt-center cuctom-icon-wrapper',
                    render: function (data, type, full, meta) {
                        return `
                         <a href="#" data-toggle="tooltip" title="Cancel Appointment"><i class="fa fa-close dr-dashboard-icon-cross" ></i></a>
                         <a href="#" data-toggle="tooltip" title="View Chart"><span class="dr-dashboard-icon"><svg height="35px" viewBox="-17 0 512 512.00429" width="35px" fill="#038dfd" xmlns="http://www.w3.org/2000/svg"><path d="m153.601562 119.46875h8.535157v8.535156c0 14.136719 11.460937 25.597656 25.597656 25.597656 14.140625 0 25.601563-11.460937 25.601563-25.597656v-8.535156h8.53125c14.140624 0 25.601562-11.460938 25.601562-25.601562 0-14.136719-11.460938-25.597657-25.601562-25.597657h-8.53125v-8.535156c0-14.136719-11.460938-25.597656-25.601563-25.597656-14.136719 0-25.597656 11.460937-25.597656 25.597656v8.535156h-8.535157c-14.136718 0-25.597656 11.460938-25.597656 25.597657 0 14.140624 11.460938 25.601562 25.597656 25.601562zm0-34.132812h17.066407c4.714843 0 8.535156-3.820313 8.535156-8.535157v-17.066406c0-4.710937 3.820313-8.53125 8.53125-8.53125 4.714844 0 8.535156 3.820313 8.535156 8.53125v17.066406c0 4.714844 3.820313 8.535157 8.53125 8.535157h17.066407c4.714843 0 8.535156 3.820312 8.535156 8.53125 0 4.714843-3.820313 8.535156-8.535156 8.535156h-17.066407c-4.710937 0-8.53125 3.820312-8.53125 8.53125v17.070312c0 4.710938-3.820312 8.53125-8.535156 8.53125-4.710937 0-8.53125-3.820312-8.53125-8.53125v-17.070312c0-4.710938-3.820313-8.53125-8.535156-8.53125h-17.066407c-4.710937 0-8.53125-3.820313-8.53125-8.535156 0-4.710938 3.820313-8.53125 8.53125-8.53125zm0 0"/><path d="m332.800781 68.269531h-54.832031c-11.414062-40.386719-48.269531-68.269531-90.234375-68.269531s-78.820313 27.882812-90.230469 68.269531h-54.835937c-23.550781.027344-42.636719 19.113281-42.66406275 42.664063v358.402344c.02734375 23.550781 19.11328175 42.636718 42.66406275 42.667968h290.132812c23.554688-.03125 42.640625-19.117187 42.667969-42.667968v-358.402344c-.027344-23.550782-19.113281-42.636719-42.667969-42.664063zm-145.066406 119.464844c41.941406-.070313 78.757813-27.925781 90.234375-68.265625h46.300781v341.332031h-273.066406v-341.332031h46.300781c11.472656 40.339844 48.289063 68.195312 90.230469 68.265625zm0-170.664063c42.417969 0 76.800781 34.382813 76.800781 76.796876 0 42.417968-34.382812 76.800781-76.800781 76.800781-42.414063 0-76.800781-34.382813-76.800781-76.800781.050781-42.394532 34.40625-76.75 76.800781-76.796876zm170.667969 452.265626c0 14.136718-11.460938 25.597656-25.601563 25.597656h-290.132812c-14.136719 0-25.597657-11.460938-25.597657-25.597656v-358.402344c0-14.136719 11.460938-25.597656 25.597657-25.597656h51.636719c-.257813 2.816406-.4375 5.648437-.4375 8.53125 0 2.886718.179687 5.71875.4375 8.535156h-43.101563c-9.425781 0-17.066406 7.640625-17.066406 17.066406v341.332031c0 9.425781 7.640625 17.066407 17.066406 17.066407h273.066406c9.425781 0 17.066407-7.640626 17.066407-17.066407v-341.332031c0-9.425781-7.640626-17.066406-17.066407-17.066406h-43.101562c.253906-2.816406.433593-5.648438.433593-8.535156 0-2.882813-.179687-5.714844-.433593-8.53125h51.632812c14.140625 0 25.601563 11.460937 25.601563 25.597656zm0 0"/><path d="m85.335938 273.070312c4.710937 0 8.53125-3.820312 8.53125-8.535156 0-4.710937-3.820313-8.53125-8.53125-8.53125v-34.136718h42.667968c4.710938 0 8.53125-3.820313 8.53125-8.53125 0-4.714844-3.820312-8.535157-8.53125-8.535157h-42.667968c-9.425782 0-17.066407 7.640625-17.066407 17.066407v34.136718c0 9.425782 7.640625 17.066406 17.066407 17.066406zm0 0"/><path d="m116.96875 241.4375c-3.347656-3.234375-8.671875-3.1875-11.960938.101562-3.292968 3.292969-3.339843 8.613282-.105468 11.960938l17.066406 17.070312c3.332031 3.328126 8.734375 3.328126 12.066406 0l42.667969-42.667968c3.234375-3.347656 3.1875-8.671875-.105469-11.960938-3.292968-3.292968-8.613281-3.339844-11.960937-.105468l-36.632813 36.632812zm0 0"/><path d="m290.136719 230.402344h8.53125c4.714843 0 8.535156-3.820313 8.535156-8.535156 0-4.710938-3.820313-8.53125-8.535156-8.53125h-8.53125c-4.714844 0-8.535157 3.820312-8.535157 8.53125 0 4.714843 3.820313 8.535156 8.535157 8.535156zm0 0"/><path d="m213.335938 230.402344h42.667968c4.710938 0 8.53125-3.820313 8.53125-8.535156 0-4.710938-3.820312-8.53125-8.53125-8.53125h-42.667968c-4.714844 0-8.535157 3.820312-8.535157 8.53125 0 4.714843 3.820313 8.535156 8.535157 8.535156zm0 0"/><path d="m213.335938 264.535156h68.265624c4.714844 0 8.535157-3.820312 8.535157-8.53125 0-4.714844-3.820313-8.535156-8.535157-8.535156h-68.265624c-4.714844 0-8.535157 3.820312-8.535157 8.535156 0 4.710938 3.820313 8.53125 8.535157 8.53125zm0 0"/><path d="m85.335938 358.402344c4.710937 0 8.53125-3.820313 8.53125-8.535156 0-4.710938-3.820313-8.53125-8.53125-8.53125v-34.132813h42.667968c4.710938 0 8.53125-3.820313 8.53125-8.535156 0-4.710938-3.820312-8.53125-8.53125-8.53125h-42.667968c-9.425782 0-17.066407 7.640625-17.066407 17.066406v34.132813c0 9.425781 7.640625 17.066406 17.066407 17.066406zm0 0"/><path d="m164.636719 301.167969-36.632813 36.632812-11.035156-11.03125c-3.347656-3.234375-8.671875-3.1875-11.960938.101563-3.292968 3.292968-3.339843 8.617187-.105468 11.964844l17.066406 17.066406c3.332031 3.332031 8.734375 3.332031 12.066406 0l42.667969-42.667969c3.234375-3.347656 3.1875-8.667969-.105469-11.960937-3.292968-3.292969-8.613281-3.339844-11.960937-.105469zm0 0"/><path d="m298.667969 298.667969h-8.53125c-4.714844 0-8.535157 3.820312-8.535157 8.535156 0 4.710937 3.820313 8.53125 8.535157 8.53125h8.53125c4.714843 0 8.535156-3.820313 8.535156-8.53125 0-4.714844-3.820313-8.535156-8.535156-8.535156zm0 0"/><path d="m213.335938 315.734375h42.667968c4.710938 0 8.53125-3.820313 8.53125-8.53125 0-4.714844-3.820312-8.535156-8.53125-8.535156h-42.667968c-4.714844 0-8.535157 3.820312-8.535157 8.535156 0 4.710937 3.820313 8.53125 8.535157 8.53125zm0 0"/><path d="m213.335938 349.867188h68.265624c4.714844 0 8.535157-3.820313 8.535157-8.53125 0-4.714844-3.820313-8.535157-8.535157-8.535157h-68.265624c-4.714844 0-8.535157 3.820313-8.535157 8.535157 0 4.710937 3.820313 8.53125 8.535157 8.53125zm0 0"/><path d="m85.335938 443.734375c4.710937 0 8.53125-3.820313 8.53125-8.53125 0-4.714844-3.820313-8.535156-8.53125-8.535156v-34.132813h42.667968c4.710938 0 8.53125-3.820312 8.53125-8.53125 0-4.714844-3.820312-8.535156-8.53125-8.535156h-42.667968c-9.425782 0-17.066407 7.640625-17.066407 17.066406v34.132813c0 9.425781 7.640625 17.066406 17.066407 17.066406zm0 0"/><path d="m164.636719 386.503906-36.632813 36.632813-11.035156-11.035157c-3.347656-3.234374-8.671875-3.1875-11.960938.105469-3.292968 3.289063-3.339843 8.613281-.105468 11.960938l17.066406 17.066406c3.332031 3.332031 8.734375 3.332031 12.066406 0l42.667969-42.664063c3.234375-3.351562 3.1875-8.671874-.105469-11.964843-3.292968-3.289063-8.613281-3.335938-11.960937-.101563zm0 0"/><path d="m298.667969 384.003906h-8.53125c-4.714844 0-8.535157 3.820313-8.535157 8.53125 0 4.714844 3.820313 8.535156 8.535157 8.535156h8.53125c4.714843 0 8.535156-3.820312 8.535156-8.535156 0-4.710937-3.820313-8.53125-8.535156-8.53125zm0 0"/><path d="m213.335938 401.070312h42.667968c4.710938 0 8.53125-3.820312 8.53125-8.535156 0-4.710937-3.820312-8.53125-8.53125-8.53125h-42.667968c-4.714844 0-8.535157 3.820313-8.535157 8.53125 0 4.714844 3.820313 8.535156 8.535157 8.535156zm0 0"/><path d="m213.335938 435.203125h68.265624c4.714844 0 8.535157-3.820313 8.535157-8.535156 0-4.710938-3.820313-8.53125-8.535157-8.53125h-68.265624c-4.714844 0-8.535157 3.820312-8.535157 8.53125 0 4.714843 3.820313 8.535156 8.535157 8.535156zm0 0"/><path d="m455.683594 110.933594h-40.960938c-13.15625 1.023437-23.042968 12.433594-22.1875 25.601562v281.601563c0 .953125.160156 1.898437.476563 2.796875l27.792969 79.976562c1.71875 6.519532 7.601562 11.070313 14.339843 11.09375 6.742188.023438 12.65625-4.484375 14.417969-10.992187l27.828125-80.085938c.316406-.894531.476563-1.839843.476563-2.789062v-281.601563c.859374-13.167968-9.03125-24.578125-22.183594-25.601562zm-4.976563 334.789062c-10.167969-2.648437-20.847656-2.648437-31.019531 0l-6.621094-19.054687h44.269532zm-41.105469-232.386718v-25.601563h51.199219v25.601563zm34.132813 196.265624v-110.933593c0-4.710938-3.820313-8.53125-8.53125-8.53125-4.714844 0-8.535156 3.820312-8.535156 8.53125v110.933593h-17.066407v-179.199218h17.066407v34.132812c0 4.714844 3.820312 8.535156 8.535156 8.535156 4.710937 0 8.53125-3.820312 8.53125-8.535156v-34.132812h17.066406v179.199218zm-29.011719-281.597656h40.960938c2.421875 0 5.117187 3.652344 5.117187 8.53125v34.132813h-51.199219v-34.132813c0-4.878906 2.695313-8.53125 5.121094-8.53125zm20.480469 362.332032-9.898437-28.484376c6.527343-1.394531 13.277343-1.394531 19.804687 0zm0 0"/></svg></span></a>
                         <a href="#" data-toggle="tooltip" title="View Profile"><span class="dr-dashboard-icon"><?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999;" xml:space="preserve">
<g>
	<g>
		<polygon points="0,303.281 0,508.074 15.697,508.074 15.697,318.978 228.456,318.978 228.456,508.074 244.153,508.074 
			244.153,303.281 		"/>
	</g>
</g>
<g>
	<g>
		<path d="M78.778,122.09v157.498h86.597V122.09H78.778z M149.678,263.892H94.475V137.787h55.204V263.892z"/>
	</g>
</g>
<g>
	<g>
		<rect x="42.172" y="366.614" width="15.697" height="141.271"/>
	</g>
</g>
<g>
	<g>
		<rect x="167.746" y="366.614" width="15.697" height="141.271"/>
	</g>
</g>
<g>
	<g>
		<path d="M275.724,3.925v130.639l-26.884,26.888l26.884,26.884V421.39h236.275V3.925H275.724z M291.42,405.692V181.833
			l-20.384-20.383l20.384-20.386V19.622h204.882v386.071H291.42z"/>
	</g>
</g>
<g>
	<g>
		<rect x="319.482" y="48.492" width="141.271" height="15.697"/>
	</g>
</g>
<g>
	<g>
		<rect x="319.482" y="79.886" width="63.834" height="15.697"/>
	</g>
</g>
<g>
	<g>
		<rect x="383.316" y="151.044" width="69.066" height="15.697"/>
	</g>
</g>
<g>
	<g>
		<path d="M396.919,203.741v-13.977h31.394v-15.697h-47.09v26.881c-1.033-0.05-2.072-0.08-3.116-0.08
			c-34.734,0-62.992,28.258-62.992,62.993c-0.001,30.795,22.215,56.48,51.458,61.917v29.325h-31.394v15.697h47.09v-44.098
			c32.8-2.153,58.831-29.506,58.831-62.839C441.1,235.677,422.494,211.76,396.919,203.741z M330.81,263.862
			c0-26.08,21.217-47.297,47.296-47.297c1.049,0,2.086,0.046,3.116,0.114v27.5h15.697v-23.7
			c15.89,6.917,27.264,22.312,28.383,40.443h-50.308l-34.096,32.084C334.588,284.968,330.81,274.851,330.81,263.862z
			 M382.269,310.974v-11.333h-15.697v10.085c-5.049-1.275-9.78-3.358-14.042-6.11l28.687-26.995h42.423
			C418.419,295.23,402.081,309.237,382.269,310.974z"/>
	</g>
</g>
<g>
	<g>
		<rect x="311.11" y="378.125" width="72.205" height="15.697"/>
	</g>
</g>
<g>
	<g>
		<rect x="413.663" y="378.125" width="14.65" height="15.697"/>
	</g>
</g>
<g>
	<g>
		<rect x="436.685" y="378.125" width="15.697" height="15.697"/>
	</g>
</g>
<g>
	<g>
		<rect x="460.753" y="378.125" width="15.697" height="15.697"/>
	</g>
</g>
<g>
	<g>
		<rect x="319.482" y="111.279" width="23.022" height="15.697"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
</span></a>
                         <a href="#" data-toggle="tooltip" title="Start Encounter"><span class="dr-dashboard-icon"><?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 511 511" style="enable-background:new 0 0 511 511;" xml:space="preserve">
<path d="M343.5,304H255v-17h23.991c17.369,0,31.5-14.131,31.5-31.5c0-33.049,19.125-56.822,39.373-81.99
	c18.336-22.792,37.297-46.36,40.585-77.216c2.304-21.625-2.796-40.699-14.75-55.161c-11.988-14.502-28.696-21.846-42.179-24.308
	C330.636,7.109,321.631,0,310.991,0h-8c-12.958,0-23.5,10.542-23.5,23.5s10.542,23.5,23.5,23.5h8c9.968,0,18.5-6.241,21.91-15.018
	c10.23,2.251,22.378,7.991,31.237,18.709c9.455,11.438,13.289,26.247,11.396,44.015c-2.821,26.476-19.596,47.327-37.356,69.402
	c-19.59,24.35-39.795,49.477-42.398,83.893h-97.067c-2.603-34.416-22.808-59.543-42.398-83.893
	c-17.76-22.075-34.535-42.927-37.356-69.402c-1.894-17.768,1.94-32.577,11.396-44.015c8.859-10.718,21.007-16.458,31.237-18.709
	C165,40.759,173.532,47,183.5,47h8c12.958,0,23.5-10.542,23.5-23.5S204.458,0,191.5,0h-8c-10.64,0-19.645,7.109-22.529,16.826
	c-13.483,2.462-30.192,9.806-42.179,24.308c-11.954,14.461-17.054,33.536-14.75,55.161c3.288,30.855,22.249,54.423,40.585,77.215
	C164.875,198.678,184,222.451,184,255.5c0,17.369,14.131,31.5,31.5,31.5H240v17h-81.598c-3.607-22.64-23.263-40-46.902-40
	C85.309,264,64,285.309,64,311.5S85.309,359,111.5,359c23.639,0,43.295-17.36,46.902-40H240v88.5c0,57.07,46.43,103.5,103.5,103.5
	S447,464.57,447,407.5S400.57,304,343.5,304z M310.991,32h-8c-4.687,0-8.5-3.813-8.5-8.5s3.813-8.5,8.5-8.5h8
	c4.687,0,8.5,3.813,8.5,8.5S315.678,32,310.991,32z M183.5,15h8c4.687,0,8.5,3.813,8.5,8.5s-3.813,8.5-8.5,8.5h-8
	c-4.687,0-8.5-3.813-8.5-8.5S178.813,15,183.5,15z M200.805,263h92.881c-2.735,5.338-8.295,9-14.695,9h-32H215.5
	C209.101,272,203.541,268.338,200.805,263z M111.5,344C93.58,344,79,329.42,79,311.5S93.58,279,111.5,279
	c15.339,0,28.221,10.685,31.617,25h-9.351c-3.138-9.29-11.93-16-22.266-16C98.542,288,88,298.542,88,311.5S98.542,335,111.5,335
	c10.336,0,19.128-6.71,22.266-16h9.351C139.721,333.315,126.839,344,111.5,344z M120,311.5c0,4.687-3.813,8.5-8.5,8.5
	s-8.5-3.813-8.5-8.5s3.813-8.5,8.5-8.5S120,306.813,120,311.5z M343.5,496c-48.799,0-88.5-39.701-88.5-88.5V319h88.5
	c48.799,0,88.5,39.701,88.5,88.5S392.299,496,343.5,496z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
</span></a>
                         <a href="#" data-toggle="tooltip" title="Orders"><span class="dr-dashboard-icon"><svg id="Layer_1_1_" enable-background="new 0 0 64 64" height="25" viewBox="0 0 64 64" width="25" xmlns="http://www.w3.org/2000/svg"><path d="m52 26.713v-12.299l6-6v20.586h2v-23h-.009c0-.129-.016-.259-.067-.383-.154-.374-.52-.617-.924-.617h-48c-.266 0-.52.105-.707.293l-7.999 7.999c-.181.181-.294.431-.294.708v38c0 .553.447 1 1 1h48c.553 0 1-.447 1-1v-11.96c1.258 1.843 2 4.065 2 6.46 0 6.341-5.159 11.5-11.5 11.5-.553 0-1 .447-1 1s.447 1 1 1h2c9.649 0 17.5-7.851 17.5-17.5 0-6.963-4.098-12.972-10-15.787zm-1.414-13.713h-18.172l6-6h18.172zm-21.293.293c-.188.187-.293.441-.293.707v7h-4v-6.586l7.414-7.414h3.172zm-17.879-6.293h18.172l-6 6h-18.172zm-7.414 44v-36h19v7c0 .553.447 1 1 1h6c.553 0 1-.447 1-1v-7h19v10.899c-1.732-.576-3.577-.899-5.5-.899h-1.5v-5c0-.375-.209-.718-.542-.89-.335-.172-.735-.143-1.039.076l-14 10c-.263.188-.419.491-.419.814s.156.626.419.813l14 10c.304.218.704.245 1.039.076.333-.171.542-.514.542-.889v-4.989c2.668.115 5.103 1.143 7 2.779v13.21zm48.048 5.035c2.441-2.444 3.952-5.816 3.952-9.535 0-7.444-6.056-13.5-13.5-13.5h-.5c-.553 0-1 .447-1 1v4.057l-11.279-8.057 11.279-8.057v4.057c0 .553.447 1 1 1h2.5c8.547 0 15.5 6.953 15.5 15.5 0 5.809-3.211 10.881-7.952 13.535z"/><path d="m6 47h12v2h-12z"/><path d="m6 43h12v2h-12z"/></svg></span></a>
                         <a href="#" data-toggle="tooltip" title="Reminder"><span class="dr-dashboard-icon"><?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 446.371 446.371" style="enable-background:new 0 0 446.371 446.371;" xml:space="preserve">
<g>
	<path d="M329.661,107.138l5.271-10.116l6.576,3.426l23.598-45.297l-55.362-28.844l-23.598,45.297l6.576,3.426l-5.233,10.044
		c-7.236-2.668-14.68-4.903-22.303-6.665V63.83h15.697V0H165.487v63.83h15.699v14.579C98.581,97.507,36.818,171.678,36.818,260.004
		c0,102.763,83.604,186.367,186.367,186.367c102.764,0,186.367-83.604,186.367-186.367
		C409.553,196.8,377.92,140.853,329.661,107.138z M316.117,46.541l28.757,14.982l-9.738,18.69l-28.757-14.982L316.117,46.541z
		 M306.026,81.961l15.604,8.129l-4.65,8.925c-5.051-2.954-10.253-5.675-15.591-8.153L306.026,81.961z M180.487,48.83V15h85.396
		v33.83h-0.697v-0.001h-84v0.001H180.487z M196.186,63.83h54v11.77c-8.818-1.285-17.832-1.963-27.001-1.963
		c-9.169,0-18.181,0.677-26.999,1.963V63.83z M223.185,431.371c-94.492,0-171.367-76.875-171.367-171.367
		S128.693,88.636,223.185,88.636s171.367,76.875,171.367,171.367S317.678,431.371,223.185,431.371z"/>
	<path d="M223.185,114.181c-80.407,0-145.822,65.416-145.822,145.822c0,80.406,65.416,145.822,145.822,145.822
		c80.406,0,145.822-65.416,145.822-145.822C369.008,179.597,303.592,114.181,223.185,114.181z M223.185,390.826
		c-72.136,0-130.822-58.687-130.822-130.822c0-72.136,58.687-130.822,130.822-130.822s130.822,58.687,130.822,130.822
		C354.008,332.139,295.321,390.826,223.185,390.826z"/>
	<path d="M246.299,252.505c-2.399-7.377-8.236-13.214-15.612-15.614v-57.334h-15v57.333c-7.378,2.4-13.215,8.237-15.614,15.615
		h-15.58v15h15.581c2.4,7.376,8.237,13.213,15.614,15.612v15.58h15v-15.581c7.376-2.4,13.212-8.235,15.612-15.611h87.082v-15
		H246.299z M223.185,269.306c-5.129,0-9.303-4.173-9.303-9.302c0-5.13,4.173-9.303,9.303-9.303c5.13,0,9.303,4.173,9.303,9.303
		C232.488,265.133,228.315,269.306,223.185,269.306z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
</span></a>
                        `;
                    },
                },
                {
                    targets: 6,
                    className: 'dt-center',
                  width:150,
                    render: function (data, type, full, meta) {
                        var status = {
                            1: { 'title': 'Checked-In', 'class': 'kt-badge--brand' },
                            2: { 'title': 'On-Provider', 'class': 'kt-badge--brand' },
                            3: { 'title': 'Visit Complete', 'class': 'kt-badge--success' },
                            4: { 'title': 'Waiting for Nurse', 'class': 'kt-badge--danger' },
                           
                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span style="width:100%"  class="kt-badge ' + status[data].class + ' kt-badge--inline kt-badge--pill">' + status[data].title + '</span>';
                    },
                },

            ],
        });

        TodoList.DataTable({
            responsive: false,


            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "bAutoWidth": true,


            columnDefs: [
                {

                    targets: 2,
                    title: 'Actions',
                    orderable: true,
                    
                    className: "dt-left",
                    render: function (data, type, full, meta) {
                        return `
                           <div class="dropdown">
                              <button class="btn btn-sm btn-outline-brand dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" 
                                aria-expanded="false">
                                    Action
                              </button>
                              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#"><i class="fa fa-pen"></i> Edit</a>
                                <a class="dropdown-item" href="#"><i class="fa fa-times" ></i>Delete</a>
                              </div>
                           </div>
                        `;
                    },
                },
            ],
        });


      
    };



    return {
        // Init demos
        init: function () {

            initTable1();

            // demo loading
            var loading = new KTDialog({ 'type': 'loader', 'placement': 'top center', 'message': 'Loading ...' });
            loading.show();

            setTimeout(function () {
                loading.hide();
            }, 3000);
        }
    };
}();

// Class initialization on page load
jQuery(document).ready(function () {
    PatientDashboard.init();
});