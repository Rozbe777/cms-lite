@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "محتوا")

@section("content")

    <div class="content-wrapper" style="padding: 30px 0px !important;">
        <div class="content-header row" style="padding : 0px 20px !important;">
            <div class="content-header-left col-12 mb-2 mt-1">
                <div class="row breadcrumbs-top" style="position: relative">
                    <div class="col-md-8">
                        <h5 class="contecontent-wrappernt-header-title float-left pr-1">محصولات</h5>
                        <div class="breadcrumb-wrapper">
                            <ol class="breadcrumb p-0 mb-0">
                                <li class="breadcrumb-item"><a href="/admin/dashboard"><i
                                            class="bx bx-home-alt"></i></a>
                                </li>
                                <li class="breadcrumb-item"><a href="#">اجزاء</a>
                                </li>
                                <li class="breadcrumb-item active">محصولات</li>
                            </ol>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div id="form-creator">

        </div>


    </div>







@endsection
@section('pageScripts')



    <script src="/js/app.js" ></script>
@endsection
