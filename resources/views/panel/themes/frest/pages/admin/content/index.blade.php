@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "محتوا")
@section("content")

    <style>
        .nav-link {
            background: none !important;
        }
        .nav-tabs li.nav-item{
            padding: 0px;
            margin: 0px !important;
            height: 30px !important;
        }
        .nav.nav-tabs{
            border-bottom-color: #f2f4f4 !important;
        }
    </style>
    <div class="content-wrapper">

        <div class="content-header row">
            <div class="content-header-left col-12 mb-2 mt-1">
                <div class="row breadcrumbs-top" style="position: relative">

                    <div class="col-md-8">
                        <h5 class="content-header-title float-left pr-1">مدیریت محصولات</h5>
                        <div class="breadcrumb-wrapper">
                            <ol class="breadcrumb p-0 mb-0">
                                <li class="breadcrumb-item"><a href="index.html"><i class="bx bx-home-alt"></i></a>
                                </li>
                                <li class="breadcrumb-item"><a href="#">اجزاء</a>
                                </li>
                                <li class="breadcrumb-item active">مدیریت محصولات</li>
                            </ol>
                        </div>
                    </div>


                    <div class="col-12">
                        <ul class="nav nav-tabs nav-fill justify-content-center" id="myTab" role="tablist" >
                            <li class="nav-item" style="position: relative">
                                <span class="line-time"></span>
                                <a class="nav-link active circle" id="home-tab-fill" data-toggle="tab" href="#home-fill"
                                   role="tab" aria-controls="home-fill" aria-selected="true">
                                    4/1

                                </a>
                            </li>
                            <li class="nav-item" style="position: relative">
                                <span class="line-time"></span>
                                <a class="nav-link circle" id="profile-tab-fill" data-toggle="tab" href="#profile-fill"
                                   role="tab" aria-controls="profile-fill" aria-selected="false">
                                    4/2
                                </a>
                            </li>
                            <li class="nav-item">
                                <span class="line-time"></span>
                                <a class="nav-link circle" id="messages-tab-fill" data-toggle="tab" href="#messages-fill"
                                   role="tab" aria-controls="messages-fill" aria-selected="false">
                                    4/3
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link circle" id="settings-tab-fill" data-toggle="tab" href="#settings-fill"
                                   role="tab" aria-controls="settings-fill" aria-selected="false">
                                    4/4
                                </a>
                                <span class="line-time-fit"></span>
                            </li>
                        </ul>

                        <!-- Tab panes -->
                        <div id="shop_product_manager"></div>
                        <div class="row" style="margin-top : 20px">
                            <div class="col-lg-3 col-md-4 col-sm-12">
                                <a style="width: 100%;color : #fff" class="btn btn-primary glow mr-1 mb-1 ">
                                    <i class="bx bx-chevron-right right"></i>
                                    <span>مرحله قبل</span>
                                </a>
                            </div>


                            <div class="col-lg-3 col-md-4 col-sm-12">
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-12">
                            </div>



                            <div class="col-lg-3 col-md-4 col-sm-12">
                                <a style="width: 100%;color : #fff" class="btn btn-primary glow mr-1 mb-1 ">
                                    <span> مرحله بعد</span>
                                    <i class="bx bx-chevron-left right"></i>

                                </a>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </div>


    </div>

@endsection

@section('pageScripts')
<script src="/js/app.js"></script>
<script src="/panel/themes/frest/js/scripts/extensions/dropzone.js"></script>
<script src="/panel/themes/frest/vendors/js/extensions/dropzone.min.js"></script>
<script src="/panel/themes/frest/vendors/js/forms/select/select2.full.min.js"></script>
<script src="/panel/themes/frest/js/scripts/forms/select/form-select2.js"></script>
@endsection
