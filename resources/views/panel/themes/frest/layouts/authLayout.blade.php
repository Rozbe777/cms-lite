<!DOCTYPE html>
<html lang="fa" data-textdirection="rtl" dir="rtl">
<!-- BEGIN: Head-->

@include('panel.themes.frest.includes.head')

{{--<script>--}}
{{--    document.onreadystatechange = function () {--}}
{{--        var state = document.readyState;--}}
{{--        if (state == 'interactive') {--}}
{{--            document.querySelector('.content').style.visibility = "hidden";--}}

{{--        } else if (state == "complete") {--}}
{{--            document.querySelector('.content').style.visibility = "visible";--}}
{{--            setTimeout(function () {--}}
{{--                document.getElementById('interactive');--}}
{{--                document.querySelector('.preloader').classList.add("active");--}}

{{--            }, 2000);--}}
{{--        }--}}
{{--    }--}}

{{--</script>--}}

<!-- END: Head-->

<!-- BEGIN: Body-->
<body
    class="vertical-layout vertical-menu-modern boxicon-layout no-card-shadow 1-column  navbar-sticky footer-static bg-full-screen-image  blank-page blank-page"
    data-open="click" data-menu="vertical-menu-modern" data-col="1-column">
<!-- BEGIN: Content-->

{{--<div class="preloader"></div>--}}
{{--// style="visibility: hidden"--}}
<div class="app-content content">

    @yield("content")

</div>
<!-- END: Content-->


<!-- END: Theme JS-->

<!-- BEGIN: Page JS-->
<!-- END: Page JS-->
@include('panel.themes.frest.includes.scripts')
@include('panel.themes.frest.includes.toastr')

<!-- END: Theme CSS-->

<script type="text/javascript">


    $(document).ready(function () {




        @if(!empty(session()->get('msg'))) //TODO

        loginError("{!! session()->get('msg') !!}")
        @endif

    });

</script>
@yield("pageScripts")
</body>
<!-- END: Body-->
</html>
