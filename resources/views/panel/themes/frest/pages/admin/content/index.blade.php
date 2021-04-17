@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "محتوا")
@section("content")

    <div class="content-wrapper">
        <div class="content-header row">
            <div class="content-header-left col-12 mb-2 mt-1">
                <div class="row breadcrumbs-top" style="position: relative">
                    <div class="col-md-8">
                        <h5 class="content-header-title float-left pr-1">محصولات</h5>
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
                    <div class="col-md-4">
                        <button id="add-product-selected" class="btn btn-primary glow mr-1 mb-1" type="button"
                                style="float: left">
                            <i class="bx bx-plus"></i>
                            <span class="align-middle ml-25">افزودن </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <div id="shop_product_search" style="margin-top: 15px"></div>
        <div id="shop_product_manager" style="margin-top: 15px"></div>
        {{--        <div id="category_add_pop" data-display="true"></div>--}}


    </div>




@endsection

@section('pageScripts')
    <script src="/panel/themes/frest/js/scripts/extensions/dropzone.js"></script>
    <script src="/panel/themes/frest/vendors/js/extensions/dropzone.min.js"></script>
    <script src="/panel/themes/frest/vendors/js/forms/select/select2.full.min.js"></script>
    <script src="/panel/themes/frest/js/scripts/forms/select/form-select2.js"></script>

    <script src="/js/app.js"></script>
@endsection
