@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "دسته بندی")
@section("content")

    <div class="content-wrapper" style="padding: 0px !important;margin: 0px">


        <div id="category_box" data-token="{{csrf_token()}}" style="border-top : 1px solid #eee"></div>

    </div>



@endsection

@section('pageScripts')

    <script src="{{asset("/js/app.js")}}"></script>
@endsection
