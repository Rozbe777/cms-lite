@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "محصول")

@section("content")

    <div class="container-fluid">
        <div class="row">
            <div id="discount-page" data-token="{{csrf_token()}}" style="width: 100% ; border-top: 1px solid #eee;"></div>
        </div>
    </div>

@endsection
@section('pageScripts')


    <script>
        // if (window.performance) {
        //     console.info("window.performance works fine on this browser");
        // }
        // console.info(performance.navigation.type);
        // if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        //     console.info( "This page is reloaded" );
        // } else {
        //     console.info( "This page is not reloaded");
        // }
    </script>

    <script src="/js/app.js"></script>
@endsection
