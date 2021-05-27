@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "دسته بندی")
@section("content")

    <div class="content-wrapper" style="padding: 0px !important;margin: 0px">
{{--        <div class="content-header row">--}}
{{--            <div class="content-header-left col-12 mb-2 mt-1">--}}
{{--                    <div class="col-md-4">--}}
{{--                        <button id="add-category-selected" class="btn btn-primary glow mr-1 mb-1" type="button" style="float: left">--}}
{{--                            <i class="bx bx-plus"></i>--}}
{{--                            <span class="align-middle ml-25">افزودن </span>--}}
{{--                        </button>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}



        <div id="category_box" style="height: 500px;border-top : 1px solid #eee"></div>
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
