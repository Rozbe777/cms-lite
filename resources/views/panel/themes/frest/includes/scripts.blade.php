<script src="{{asset('js/app.js')}}"></script>

<!-- BEGIN: Vendor JS-->
<script src="{{adminTheme("vendors/js/vendors.min.js")}}"></script>
<!-- BEGIN Vendor JS-->


<!-- BEGIN: Page JS-->

<script src="{{adminTheme("vendors/js/pickers/pickadate/picker.js")}}"></script>
<script src="{{adminTheme("vendors/js/pickers/pickadate/picker.date.js")}}"></script>
{{--<script src="{{adminTheme("vendors/js/pickers/pickadate/picker.time.js")}}"></script>--}}
<script src="{{adminTheme("vendors/js/pickers/pickadate/legacy.js")}}"></script>
<script src="{{adminTheme("vendors/js/pickers/daterange/moment.min.js")}}"></script>
<script src="{{adminTheme("vendors/js/pickers/daterange/daterangepicker.js")}}"></script>
<script src="{{adminTheme("vendors/js/pickers/datepicker-jalali/bootstrap-datepicker.min.js")}}"></script>
<script src="{{adminTheme("vendors/js/pickers/datepicker-jalali/bootstrap-datepicker.fa.min.js")}}"></script>
<script src={{adminTheme("js/scripts/error/customError.js")}}></script>
<script src={{adminTheme("js/scripts/customInfoMessage/customInfoMessage.js")}}></script>
{{--<script src={{adminTheme("js/scripts/pickers/dateTime/pick-a-datetime.js")}}></script>--}}

<script src="{{adminTheme("vendors/js/forms/select/select2.full.min.js")}}"></script>
{{--<script src="{{adminTheme("vendors/js/forms/select/jquery.repeater.min.js")}}"></script>--}}


<script>

    // function msToHMS( ms ) {
    //     // 1- Convert to seconds:
    //     var seconds = ms / 1000;
    //     // 2- Extract hours:
    //     var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    //     seconds = seconds % 3600; // seconds remaining after extracting hours
    //     // 3- Extract minutes:
    //     var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    //     // 4- Keep only seconds not extracted to minutes:
    //     seconds = seconds % 60;
    //     alert( hours+" hours and "+minutes+" minutes and "+seconds+" seconds!" );
    // }


        // const current = new Date();
        //
        // const hourse = current.getHours();
        // const minutes = current.getMinutes();
        // const sec = current.getSeconds();
        // let miliHourse = parseInt((hourse * 3600000) + (minutes * 60000 ) + (sec * 1000));
        //
        // if (miliHourse > 68460000) {
        //     console.log("night");
        // } else {
        //     console.log("rooz");
        // }

        // let localDarked = localStorage.getItem("darked");
        // if (localDarked === "dark") {
        //     $("body").addClass("active-darked");
        //     $("input#customSwitch10").prop("checked", true)
        // } else {
        //     $("body").removeClass("active-darked");
        //     $("input#customSwitch10").prop("checked", false)
        // }

        let localDarked = localStorage.getItem("darked");
        if (localDarked === "dark") {
            document.querySelector("body").classList.add("active-darked");
            document.querySelector("input#customSwitch10").checked =  true;
        } else {
            document.querySelector("body").classList.remove("active-darked");
            document.querySelector("input#customSwitch10").checked =  false;
            // $("body").removeClass("active-darked");
            // $("input#customSwitch10").prop("checked", false)
        }


</script>


<script src="{{adminTheme("js/scripts/forms/select/form-select2.js")}}"></script>

<!-- END: Page JS-->


<!-- BEGIN: Theme JS-->
<script src="{{adminTheme("js/core/app-menu.js")}}"></script>
<script src="{{adminTheme("js/core/app.js")}}"></script>
<script src="{{adminTheme("js/scripts/components.js")}}"></script>
<script src="{{adminTheme("js/scripts/footer.js")}}"></script>
<script src="{{adminTheme("js/scripts/customizer.js")}}"></script>
<!-- END: Theme JS-->

