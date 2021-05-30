@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "صفحه")
@section("content")

    <div class="content-wrapper" style="padding: 0px !important;margin: 0px">


        <div id="page_box" data-token="{{csrf_token()}}" style="border-top : 1px solid #eee" data></div>

    </div>

@endsection

@section('pageScripts')
    <script src="/js/app.js"></script>
@endsection
