@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "دسته بندی")
@section("content")

    <div class="content-wrapper">
        <div class="content-header row">
            <div class="content-header-left col-12 mb-2 mt-1">
                <div class="row breadcrumbs-top" style="position: relative">

                    <div class="col-md-8">
                        <h5 class="content-header-title float-left pr-1">مدیریت صفحات و دسته بندی ها</h5>
                        <div class="breadcrumb-wrapper">
                            <ol class="breadcrumb p-0 mb-0">
                                <li class="breadcrumb-item"><a href="index.html"><i class="bx bx-home-alt"></i></a>
                                </li>
                                <li class="breadcrumb-item"><a href="#">اجزاء</a>
                                </li>
                                <li class="breadcrumb-item active">لیست صفحات و دسته بندی ها</li>
                            </ol>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <button id="add-category-selected" class="btn btn-primary glow mr-1 mb-1" type="button" style="float: left">
                            <i class="bx bx-plus"></i>
                            <span class="align-middle ml-25">افزودن </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <ul class="nav nav-tabs tab-layout" role="tablist">
            <li class="nav-item col-6 nav-custom">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" aria-controls="home"
                   role="tab" aria-selected="true">
                    <i class="bx bxs-categories align-middle" id={"tab-list-icon"}
                       style="margin-top: 4px; fontS-size: '35px !important"></i>
                    <span class="align-middle">دسته بندی</span>
                </a>
            </li>
            <li class="nav-item col-6 nav-custom">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" aria-controls="profile"
                   role="tab" aria-selected="false">
                    <i class="bx bxs-layer align-middle"
                       id={"tab-list-icon"}
                       style="margin-top: 4px; fontS-size: '35px !important"></i>
                    <span class="align-middle">صفحات داخلی</span>
                </a>
            </li>

        </ul>
        <div id="category_box" style="margin-top: 15px"></div>
{{--        <div id="category_add_pop" data-display="true"></div>--}}


    </div>



@endsection

@section('pageScripts')

    <script src="{{asset('panel/themes/frest/js/scripts/editors/editor-quill.js')}}"></script>
    <script src="{{asset('panel/themes/frest/js/scripts/editors/highlight.min.js')}}"></script>
    <script src="{{asset('panel/themes/frest/js/scripts/editors/katex.min.js')}}"></script>
    <script src="{{asset('panel/themes/frest/js/scripts/editors/quill.min.js')}}"></script>
    <script src="{{asset("/js/app.js")}}"></script>
@endsection
