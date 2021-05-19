@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "کاربران")

@section("content")
    <div class="content-wrapper">
        <div class="content-header row">
            <div class="item-title">
                <h3>ویرایش کاربر</h3>
            </div>
        </div>
        <div class="content-body"><!-- users edit start -->
            <section class="users-edit">
                <div class="card">
                    <div class="card-content">
                        <div class="card-body">
                            <ul class="nav nav-tabs mb-2" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link d-flex align-items-center active" id="account-tab"
                                       data-toggle="tab" href="#account" aria-controls="account" role="tab"
                                       aria-selected="true">
                                        <i class="bx bx-user mr-25"></i><span
                                            class="d-none d-sm-block"> اطلاعات پروفایل</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link d-flex align-items-center" id="password-tab" data-toggle="tab"
                                       href="#password" aria-controls="password" role="tab" aria-selected="false">
                                        <i class="bx bx-lock-alt mr-25"></i><span
                                            class="d-none d-sm-block">رمزعبور</span>
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active fade show" id="account" aria-labelledby="account-tab"
                                     role="tabpanel">
                                    <div id="profile-form" data-user="{{$user}}"
                                         data-is_admin="1"
                                         data-roles="{{$roles}}"
                                         data-role_id="{{$user->roles()->first()->id}}"
                                         data-action="{{route('admin.profile.index')}}"
                                         data-token="{{csrf_token()}}"></div>
                                </div>
                                <div class="tab-pane fade show" id="password" aria-labelledby="password-tab"
                                     role="tabpanel">
                                    <!-- change password form start -->
                                    <div id="password-form" data-action="{{route('admin.profile.password')}}"
                                         data-token="{{csrf_token()}}"></div>
                                    <!-- change password form ends -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- users edit ends -->
        </div>
    </div>

@endsection
@section('pageScripts')
    <script src="{{asset('js/app.js')}}"></script>
@endsection
