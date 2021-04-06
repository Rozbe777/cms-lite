@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "دسته بندی")
@section("content")

    <div class="content-wrapper">
        <div class="content-header row">
            <div class="content-header-left col-12 mb-2 mt-1">
                <div class="row breadcrumbs-top" style="position: relative">
                    <button id="add-category" onclick="handlePageAdd()" class="btn btn-primary glow mr-1 mb-1" type="button" style="z-index:9;cursor : pointer;position:absolute;left: 0px">
                        <i class="bx bx-plus"></i>
                        <span class="align-middle ml-25">افزودن صفحه</span>
                    </button>
                    <div class="col-12">
                        <h5 class="content-header-title float-left pr-1">لیست کاربران</h5>
                        <div class="breadcrumb-wrapper">
                            <ol class="breadcrumb p-0 mb-0">
                                <li class="breadcrumb-item"><a href="index.html"><i class="bx bx-home-alt"></i></a>
                                </li>
                                <li class="breadcrumb-item"><a href="#">اجزاء</a>
                                </li>
                                <li class="breadcrumb-item active">لیست کاربران</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div id="category_box" style="margin-top: 15px"></div>
        <div id="category_add_pop" data-display="true"></div>


    </div>



@endsection

@section('pageScripts')

    <script src="{{asset('/panel/themes/frest/js/scripts/editors/editor-quill.js')}}" ></script>

    <script>

        $(function (){
            $("#add-category").click(function (){
                $(".back-loader").fadeIn();
            })
        })
    </script>

    <script src="{{asset("/js/app.js")}}"></script>
@endsection
