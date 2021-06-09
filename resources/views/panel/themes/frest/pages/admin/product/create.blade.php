@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "محصول")

@section("content")
    <div class="content-wrapper" style="padding: 0px 0px !important;margin : 0px !important;">
        <div id="shop_product_manager" style="border-top : 1px solid #eee">

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
            console.info( "This page is reloaded" );
        } else {
            console.info( "This page is not reloaded");
        }
    </script>

    <script src="/js/app.js"></script>
@endsection
