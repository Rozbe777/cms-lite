@extends("panel.themes.frest.layouts.dashboardLayout")

{{--@php--}}
{{--    $data = [];--}}
{{--    $data["id"] = "favicon";--}}
{{--    $data["name"] = "favicon";--}}
{{--    if($settings->where("key" , "favicon")->count()){--}}
{{--        $favicon = $settings->where("key" , "favicon")->first();--}}
{{--        if (!empty($favicon->value)) {--}}
{{--            $data["image"] = $favicon->value;--}}
{{--        }--}}
{{--    }--}}
{{--@endphp--}}



@php($title = "تنظیمات")

@section("content")
    @if($errors->any())

        <script>
            updateProfileError("{!! $errors->first() !!}");
        </script>
    @endif
    <div class="content-wrapper">
            <div class="content-header row">
                <h6 class="card-title">{{$title}}</h6>

            </div>
            <div class="content-body"><!-- users list start -->
                <div class="card-body">


                    <form action="{{route("admin.setting.update")}}" method="post" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    @if($settings->where("key" , "title")->count())
                                        @php($pagetitle = $settings->where("key" , "title")->first())
                                    @endif
                                    <label for="">عنوان سایت</label>
                                    <input type="text" class="form-control" name="title"
                                           value="{{!empty($pagetitle->value)?$pagetitle->value:''}}">
                                    @error('title')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    @if($settings->where("key" , "site_url")->count())
                                        @php($site_url = $settings->where("key" , "site_url")->first())
                                    @endif
                                    <label for="">آدرس سایت</label>
                                    <input type="text" class="form-control" name="site_url"
                                           value="{{!empty($site_url->value)?$site_url->value:''}}">
                                    @error('site_url')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    @if($settings->where("key" , "date_time")->count())
                                        @php($date_time = $settings->where("key" , "date_time")->first())
                                    @endif
                                    <label for="date_time">نحوه نمایش تاریخ</label>
                                    <select id="date_time" class="select" name="date_time">
                                        <option
                                            {{ $date_time->value == 'ago' ? 'selected' : ''}} value="ago">{{ jdate(now()->subMinutes(10))->ago() }}</option>
                                        <option
                                            {{ $date_time->value == 'l d F Y' ? 'selected' : ''}} value="l d F Y">{{ jdate(now()->subMinutes(10))->format('l d F Y') }}</option>
                                        <option
                                            {{ $date_time->value == 'h:i d/m/Y' ? 'selected' : ''}} value="h:i d/m/Y">{{ jdate(now()->subMinutes(10))->format('h:i d/m/Y ') }}</option>
                                        <option
                                            {{ $date_time->value == 'normal' ? 'selected' : ''}} value="normal">{{ now()->subMinutes(10) }}</option>
                                        <option
                                            {{ $date_time->value == 'normal_format' ? 'selected' : ''}} value="normal_format">{{ now()->subMinutes(10)->format('h:i d/m/Y') }}</option>
                                        <option {{ $date_time->value == 'off' ? 'selected' : ''}} value="off">تاریخ
                                            نمایش داده نشود
                                        </option>
                                    </select>
                                    @error('title')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>
                            {{--<div class="col-md-6">--}}
                            {{--<div class="form-group">--}}
                            {{--@if($settings->where("key" , "social_login")->count())--}}
                            {{--@php($social_login = $settings->where("key" , "social_login")->first())--}}
                            {{--@endif--}}
                            {{--<label for="social_login">ورود به کمک شبکه های اجتماعی</label>--}}
                            {{--<select id="social_login" class="select" name="social_login">--}}
                            {{--<option {{ $social_login->value == 1 ? 'selected' : ''}} value="1">فعال--}}
                            {{--</option>--}}
                            {{--<option {{ $social_login->value == 0 ? 'selected' : ''}} value="0">غیرفعال--}}
                            {{--</option>--}}
                            {{--</select>--}}
                            {{--@error('title')--}}
                            {{--<span class="invalid-feedback" role="alert">--}}
                            {{--<strong>{{ $message }}</strong>--}}
                            {{--</span>--}}
                            {{--@enderror--}}
                            {{--</div>--}}
                            {{--</div>--}}
                            <div class="col-md-6">
                                <div class="form-group">
                                    @if($settings->where("key" , "auto_comment_accept")->count())
                                        @php($auto_comment_accept = $settings->where("key" , "auto_comment_accept")->first())
                                    @endif
                                    <label for="social_login">انتشار دیدگاه ها</label>
                                    <select id="social_login" class="select" name="auto_comment_accept">
                                        <option {{ $auto_comment_accept->value == 1 ? 'selected' : ''}} value="1">
                                            بدون تایید مدیر
                                        </option>
                                        <option {{ $auto_comment_accept->value == 0 ? 'selected' : ''}} value="0">
                                            نیاز به تایید
                                        </option>
                                    </select>
                                    @error('title')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    @if($settings->where("key" , "verify_email")->count())
                                        @php($verify_email = $settings->where("key" , "verify_email")->first())
                                    @endif
                                    <label for="social_login">احراز هویت ایمیل ثبت نام</label>
                                    <select id="social_login" class="select" name="verify_email">
                                        <option {{ $verify_email->value == 1 ? 'selected' : ''}} value="1">فعال
                                        </option>
                                        <option {{ $verify_email->value == 0 ? 'selected' : ''}} value="0">غیرفعال
                                        </option>
                                    </select>
                                    @error('title')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    @if($settings->where("key" , "join")->count())
                                        @php($join = $settings->where("key" , "join")->first())
                                    @endif
                                    <label for="join">قابلیت عضویت کاربران</label>
                                    <select id="join" class="select" name="join">
                                        <option {{ $join->value == 1 ? 'selected' : ''}} value="1">فعال</option>
                                        <option {{ $join->value == 0 ? 'selected' : ''}} value="0">غیرفعال</option>
                                    </select>
                                    @error('title')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    @if($settings->where("key" , "cron")->count())
                                        @php($cron = $settings->where("key" , "cron")->first())
                                    @endif
                                    <label for="">آدرس cron</label>
                                    <input type="text" class="form-control" name="cron"
                                           value="{{!empty($cron->value)?$cron->value:''}}">
                                    @error('cron')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>

                            {{--<div class="col-md-6">--}}
                            {{--<div class="form-group">--}}
                            {{--@if($settings->where("key" , "google_analytics")->count())--}}
                            {{--@php($google_analytics = $settings->where("key" , "google_analytics")->first())--}}
                            {{--@endif--}}
                            {{--<label for="google_analytics">کد Google Analytics</label>--}}
                            {{--<input type="text" class="form-control"--}}
                            {{--value="{{ $google_analytics->value != 'null' ? $google_analytics->value : '' }}">--}}
                            {{--@error('title')--}}
                            {{--<span class="invalid-feedback" role="alert">--}}
                            {{--<strong>{{ $message }}</strong>--}}
                            {{--</span>--}}
                            {{--@enderror--}}
                            {{--</div>--}}
                            {{--</div>--}}

                            {{--<div class="col-md-8">--}}
                            {{--<label for="">تنظیمات کش</label>--}}
                            {{--<div class="row">--}}
                            {{--<div class="col-md-6">--}}
                            {{--<div class="text-right">--}}
                            {{--<button type="button" onclick="ClearCache()"--}}
                            {{--class="btn btn-lg btn-primary btn-block">پاک--}}
                            {{--کردن کش--}}
                            {{--</button>--}}
                            {{--</div>--}}
                            {{--</div>--}}
                            {{--<div class="col-md-6">--}}
                            {{--<div class="text-right">--}}
                            {{--<button type="button" onclick="ClearView()"--}}
                            {{--class="btn btn-lg btn-info btn-block">پاک کردن--}}
                            {{--کش پوسته--}}
                            {{--</button>--}}
                            {{--</div>--}}
                            {{--</div>--}}
                            {{--</div>--}}

                            {{--</div>--}}
                            <div class="col-12">
                                <h5>تنظیمات پنل پیامکی</h5>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            @if($settings->where("key" , "notifier_url")->count())
                                                @php($notifier_url = $settings->where("key" , "notifier_url")->first())
                                            @endif
                                            <label>آدرس api</label>
                                            <input type="text" name="notifier_url" class="form-control"
                                                   value="{{!empty($notifier_url->value)?$notifier_url->value:''}}">
                                            @error('notifier_url')
                                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">

                                            @if($settings->where("key" , "notifier_username")->count())
                                                @php($notifier_username = $settings->where("key" , "notifier_username")->first())
                                            @endif
                                            <label>نام کاربری</label>
                                            <input type="text" name="notifier_username" class="form-control"
                                                   value="{{!empty($notifier_username->value)?$notifier_username->value:''}}">
                                            @error('notifier_username')
                                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">

                                            @if($settings->where("key" , "notifier_password")->count())
                                                @php($notifier_password = $settings->where("key" , "notifier_password")->first())
                                            @endif
                                            <label>رمز عبور</label>
                                            <input type="text" name="notifier_password" class="form-control"
                                                   value="{{!empty($notifier_password->value)?$notifier_password->value:''}}">
                                            @error('notifier_password')
                                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">

                                            @if($settings->where("key" , "notifier_from")->count())
                                                @php($notifier_from = $settings->where("key" , "notifier_from")->first())
                                            @endif
                                            <label>شماره اپراتور</label>
                                            <input type="text" name="notifier_from" class="form-control"
                                                   value="{{!empty($notifier_from->value)?$notifier_from->value:''}}">
                                            @error('notifier_from')
                                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                            @enderror
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <h5>تنظیمات سئو</h5>
                                <div class="meta-description">
                                    @if($settings->where("key" , "description")->count())
                                        @php($description = $settings->where("key" , "description")->first())
                                    @endif
                                    <h5>توضیحات سایت</h5>
                                    <textarea class="form-control" rows="10" cols=""
                                              name="description">{{!empty($description->value)?$description->value:''}}</textarea>
                                    @error('description')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                                <div class="head-script mt-4">
                                    <?php
                                    if ($settings->where("key", "script_head")->count()) {
                                        $script_head = $settings->where("key", "script_head")->first();
                                    }
                                    ?>
                                    <h6>script در تگ head</h6>
                                    <textarea class="form-control text-left" rows="10" cols=""
                                              name="script_head">{{!empty($script_head->value)?$script_head->value:''}}</textarea>
                                </div>
                                <div class="body-top-script mt-4">
                                    <?php
                                    if ($settings->where("key", "script_top_body")->count()) {
                                        $script_top_body = $settings->where("key", "script_top_body")->first();
                                    }
                                    ?>
                                    <h6>script بعد از تگ body</h6>
                                    <textarea class="form-control text-left" rows="10" cols=""
                                              name="script_top_body"> {{!empty($script_top_body->value)?$script_top_body->value:''}}</textarea>
                                </div>
                                <div class="body-top-script mt-4">
                                    <?php
                                    if ($settings->where("key", "script_footer")->count()) {
                                        $script_footer = $settings->where("key", "script_footer")->first();
                                    }
                                    ?>
                                    <h6>script در footer</h6>
                                    <textarea class="form-control text-left" rows="10" cols=""
                                              name="script_footer">{{!empty($script_footer->value)?$script_footer->value:''}}</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="text-left mt-4">
                            <button type="submit" class="main-button w-25">ذخیره</button>
                        </div>
                    </form>
                </div>
                <!-- users list ends -->
            </div>
        </div>

@endsection

@section('pageScripts')
{{--    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/core/menu/menu-types/vertical-menu.css")}}">--}}
{{--  <!-- BEGIN: Page Vendor JS-->--}}
{{--    <script src="{{adminTheme("vendors/js/tables/datatable/datatables.min.js")}}"></script>--}}
{{--    <script src="{{adminTheme("vendors/js/tables/datatable/dataTables.bootstrap4.min.js")}}"></script>--}}
{{--    <!-- END: Page Vendor JS-->--}}
{{--    <script src="{{adminTheme("js/scripts/pages/page-users.js")}}"></script>--}}
    <script>
        $('.sweet-alert-delete-confirm').on('click', function (event) {
            event.preventDefault();
            const url = $(this).attr('href');
            swal({
                title: 'حذف کاربر',
                text: "آیا مطمئنید؟",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'تایید',
                confirmButtonClass: 'btn btn-primary',
                cancelButtonClass: 'btn btn-danger ml-1',
                cancelButtonText: 'انصراف',
                buttonsStyling: false,
            }).then(function(result) {
                if (result.value) {

                    Swal.fire({
                        type: "success",
                        title: 'حذف شد!',
                        text: 'کاربر مورد نظر حذف شد',
                        confirmButtonClass: 'btn btn-success',
                        confirmButtonText: 'باشه',
                    });

                    window.location.href = url;
                }
            });
        });
        $('.sweet-alert-multi-delete-confirm').on('click', function (event) {
            event.preventDefault();
            const url = $(this).attr('href');
            swal({
                title: 'حذف کاربر',
                text: "آیا مطمئنید؟",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'تایید',
                confirmButtonClass: 'btn btn-primary',
                cancelButtonClass: 'btn btn-danger ml-1',
                cancelButtonText: 'انصراف',
                buttonsStyling: false,
            }).then(function(result) {
                if (result.value) {
                    document.getElementById("myForm").submit();

                    Swal.fire({
                        type: "success",
                        title: 'حذف شد!',
                        text: 'کاربر مورد نظر حذف شد',
                        confirmButtonClass: 'btn btn-success',
                        confirmButtonText: 'باشه',
                    });

                }
            });
        });

        function toggle(source) {
            checkboxes = document.getElementsByName('userIds[]');
            for(var i=0, n=checkboxes.length;i<n;i++) {
                checkboxes[i].checked = source.checked;
            }
        }
    </script>
@endsection
