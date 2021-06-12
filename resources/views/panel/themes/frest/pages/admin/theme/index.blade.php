@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "محتوا")

@section("content")
    <div class="content-wrapper" style="padding: 0px !important; margin : 0px !important ; border-top : 1px solid #eee">
        <div class="row col-12" id="headerContent">
            <div id="bradcrummmm" style="width: 100%">


            </div>
        </div>




        <div id="theme_setting_component" style="border-top : 1px solid #eee">


        </div>


    </div>
@endsection
@section('pageScripts')


    <script>
        if (window.performance) {
            console.info("window.performance works fine on this browser");
        }
        console.info(performance.navigation.type);
        if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
            console.info("This page is reloaded");
        } else {
            console.info("This page is not reloaded");
        }
    </script>

    <script src="/js/app.js"></script>
@endsection
