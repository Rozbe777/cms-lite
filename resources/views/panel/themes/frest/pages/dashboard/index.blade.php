@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "داشبورد")
@section("content")


    <div class="content-wrapper">
    <div id="main-dashboard"></div>

</div>
@endsection

@section('pageScripts')
    <script src="{{asset("/js/app.js")}}" ></script>
    <script>
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    </script>
@endsection
