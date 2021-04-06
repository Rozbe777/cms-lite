@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "دسته بندی")

@section("content")
    <div class="content-wrapper">
        <div class="content-header row">
            <div class="content-header-left col-12 mb-2 mt-1">
                <div class="row breadcrumbs-top" style="position: relative">

                    <div class="col-12">
                        <h5 class="content-header-title float-left pr-1">افزودن دسته بندی</h5>
                        <div class="breadcrumb-wrapper">
                            <ol class="breadcrumb p-0 mb-0">
                                <li class="breadcrumb-item"><a href="index.html"><i class="bx bx-home-alt"></i></a>
                                </li>
                                <li class="breadcrumb-item"><a href="#">اجزاء</a>
                                </li>
                                <li class="breadcrumb-item active">افزودن دسته بندی</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div id="category_add" style="margin-top: 15px"></div>


    </div>

@endsection
@section('pageScripts')
@endsection
