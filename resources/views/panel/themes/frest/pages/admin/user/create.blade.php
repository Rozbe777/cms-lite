@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "کاربران")

@section("content")
    <div class="content-wrapper" style="padding: 0px;margin: 0px;border-top: 1px solid #ccc;">
        <div class="row col-12" id="headerContent">
            <div id="breadCrumb" style="width: 100%" class="activeCrumb">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12" style="marginbottom: 5; margin-top: 5px; line-height: 2.3">
                            <span id="title">افزودن کاربر</span>
                            <span id="icon">
                        <a style="float: right" href="/dashboard"><i
                                style="float: right;margin: 5px;font-size: 22px;color: #727e8c;"
                                class="bx bxs-home"></i> <span
                                style="color: #727e8c">پیشخوان</span> </a>
                    </span>

                            <span id="icon">
                                <a>
                                    <i style="font-size: 25px;margin-top: 5px;" class="bx bx-chevron-left"></i>
                                </a>
                            </span>

                            <span id="icon">
                                <a href="/user"><span style="color: #727e8c">لیست کاربران</span></a>
                            </span>

                            <span id="icon">
                                <a>
                                    <i style="font-size: 25px;margin-top: 5px;" class="bx bx-chevron-left"></i>
                                </a>
                            </span>

                            <span id="icon">
                                 <a>افزودن کاربر جدید</a>
                             </span>


                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="content-body" style="padding: 15px"><!-- users edit start -->
            <div class="card">
                <div class="card-content">
                    <div class="card-body">

                        <div class="tab-pane active fade show" id="account" aria-labelledby="account-tab"
                             role="tabpanel">
                            <div id="create-user-form-by-admin"
                                 data-roles="{{$roles}}"
                                 data-action="{{route('users.store')}}"
                                 data-token="{{csrf_token()}}">

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('pageScripts')
    <script src="{{asset("/js/app.js")}}"></script>
@endsection
