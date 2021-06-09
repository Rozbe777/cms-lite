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
    $(document).ready(function () {
        let localDarked = localStorage.getItem("darked");
        console.log(localDarked)
        if (localDarked === "dark"){
            $("body").addClass("active-darked");
            $("#customSwitch10").prop("checked" , true)
        }else{
            $("body").removeClass("active-darked");
            $("#customSwitch10").prop("checked" , false)
        }

        $("#customSwitch10").on("change", function () {
            if ($(this).prop("checked")) {
                $("body").addClass("active-darked");
                localStorage.setItem("darked" , "dark")
            } else {
                $("body").removeClass("active-darked");
                localStorage.setItem("darked" , "light")

            }

        })


    })
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


<script src="https://unpkg.com/@lottiefiles/lottie-interactivity@latest/dist/lottie-interactivity.min.js"></script>
