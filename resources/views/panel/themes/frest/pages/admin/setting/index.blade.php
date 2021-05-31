@extends("panel.themes.frest.layouts.dashboardLayout")

@php($title = "تنظیمات")

@section("content")
    @if($errors->any())

        <script>
            updateProfileError("{!! $errors->first() !!}");
        </script>
    @endif
    <div class="content-wrapper">
        <div class="content-header row">
            <div class="content-header-left col-12 mb-2 mt-1">
                <div class="row breadcrumbs-top">
                    <div class="col-12">
                        <h5 class="content-header-title float-left pr-1">تنظیمات</h5>
                        <div class="breadcrumb-wrapper">
                            <ol class="breadcrumb p-0 mb-0">
                                <li class="breadcrumb-item"><a href="{{url('/admin')}}"><i
                                            class="bx bx-home-alt"></i></a>
                                </li>
                                <li class="breadcrumb-item active"> تنظیمات
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-body"><!-- account setting page start -->
            <section id="page-account-settings">
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <!-- left menu section -->
                            <div class="col-md-3 mb-2 mb-md-0 pills-stacked">
                                <ul class="nav nav-pills flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link d-flex align-items-center active" id="account-pill-general"
                                           data-toggle="pill" href="#account-vertical-general" aria-expanded="true">
                                            <i class="bx bx-cog"></i>
                                            <span>عمومی</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link d-flex align-items-center" id="account-pill-password"
                                           data-toggle="pill" href="#js-and-css" aria-expanded="false">
                                            <i class="bx bx-code"></i>
                                            <span>استایل و جاوا اسکریپت</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <!-- right content section -->
                            <div class="col-md-9">
                                <div class="card">
                                    <div class="card-content">
                                        <div class="card-body">
                                            <div class="tab-content">
                                                <div role="tabpanel" class="tab-pane active"
                                                     id="account-vertical-general"
                                                     aria-labelledby="account-pill-general" aria-expanded="true">
                                                    <div id="general-setting-form"
                                                         data-title="{{setting('title')}}"
                                                         data-site_url="{{setting('site_url')}}"
                                                         data-description="{{setting('description')}}"
                                                         data-tags="{{setting('keywords')}}"
                                                         data-custom_date="{{setting('date_time')}}"
                                                         data-verify_comment_status="{{setting('auto_comment_accept')}}"
                                                         data-cron="{{setting('cron')}}"
                                                         data-enable_registration="{{setting('join')}}"
                                                         data-action="{{route('settings.edit')}}"
                                                         data-token="{{csrf_token()}}"
                                                    ></div>
                                                </div>
                                                <div class="tab-pane fade " id="js-and-css"
                                                     role="tabpanel" aria-labelledby="account-pill-password"
                                                     aria-expanded="false">
                                                    <div id="js-and-css-setting-form"
                                                         data-action="{{route('settings.edit')}}"
                                                         data-token="{{csrf_token()}}"
                                                         data-head_include="{{setting('script_head')}}"
                                                         data-body_include="{{setting('script_top_body')}}"
                                                         data-footer_include="{{setting('script_footer')}}"

                                                    ></div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- account setting page ends -->
        </div>
    </div>

@endsection

@section('pageScripts')
    <script src="{{asset('js/app.js')}}"></script>
@endsection
