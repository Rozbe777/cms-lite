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
                                            class="d-none d-sm-block">حساب کاربری</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link d-flex align-items-center" id="information-tab" data-toggle="tab"
                                       href="#information" aria-controls="information" role="tab" aria-selected="false">
                                        <i class="bx bx-info-circle mr-25"></i><span
                                            class="d-none d-sm-block">اطلاعات</span>
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active fade show" id="account" aria-labelledby="account-tab"
                                     role="tabpanel">
                                    <!-- users edit media object start -->
                                    <div class="media mb-2">
                                        <a class="mr-2" href="#">
                                            <img src="{{adminTheme("images/portrait/small/avatar-s-26.jpg")}}"
                                                 alt="users avatar" class="users-avatar-shadow rounded-circle"
                                                 height="64" width="64">
                                        </a>
                                        <div class="media-body">
                                            <h4 class="media-heading">آواتار</h4>
                                            <div class="col-12 px-0 d-flex">
                                                <a href="#" class="btn btn-sm btn-primary mr-25">تغییر</a>
                                                <a href="#" class="btn btn-sm btn-light-secondary">بازنشانی</a>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- users edit media object ends -->
                                    <!-- users edit account form start -->
                                    @if($errors->any())
                                        <script>
                                            updateProfileError("{!! $errors->first() !!}");
                                        </script>
                                    @endif
                                    <form method="POST" action="{{route('admin.user.update',$user->id)}}">
                                        @csrf
                                        @method("PUT")
                                        <div class="row">
                                            <div class="col-12 col-sm-6">
                                                <div class="form-group">
                                                    <div class="controls">
                                                        <label>نام </label>
                                                        <input type="text" class="form-control text-left" name="name"
                                                               placeholder="نام " value="{{$user->name}}"
                                                               data-validation-required-message="وارد کردن نام  الزامی است"
                                                               dir="ltr">
                                                    </div>

                                                </div>
                                                <div class="form-group">
                                                    <div class="controls">
                                                        <label>شماره موبایل</label>
                                                        <input type="text" class="form-control text-left"
                                                               placeholder="شماره موبایل" name="phone"
                                                               value="{{$user->phone}}"
                                                               data-validation-required-message="وارد کردن شماره موبایل الزامی است"
                                                               dir="ltr">
                                                    </div>

                                                </div>

                                                <div class="form-group">
                                                    <div class="controls">
                                                        <label>ایمیل</label>
                                                        <input type="email" class="form-control text-left"
                                                               placeholder="ایمیل" name="email" value="{{$user->email}}"
                                                               data-validation-required-message="وارد کردن ایمیل الزامی است"
                                                               dir="ltr">
                                                    </div>

                                                </div>

                                                <div class="form-group">
                                                    <label>دسترسی</label>
                                                    <select class="form-control" name="role"
                                                            data-value="{{$user->roles()->first()->id}}">
                                                        @foreach($roles as $role)
                                                            <option
                                                                value="{{$role->id}}" {{$user->roles()->first()->id==$role->id?'selected':''}} >
                                                                {{$role->display_name}}
                                                            </option>
                                                        @endforeach

                                                    </select>

                                                </div>

                                            </div>
                                            <div class="col-12 col-sm-6">
                                                <div class="form-group">
                                                    <div class="controls">
                                                        <label>نام خانوادگی</label>
                                                        <input type="text" class="form-control"
                                                               placeholder="نام خانوادگی" name="last_name"
                                                               value="{{$user->last_name}}"
                                                               data-validation-required-message="وارد کردن نام خانوادگی الزامی است">
                                                    </div>

                                                </div>
                                                <div class="form-group">
                                                    <label>وضعیت</label>
                                                    <select class="form-control" name="status"
                                                            data-value="{{$user->status}}">
                                                        <option
                                                            value="active" {{$user->status=='active'?'selected':''}} >
                                                            فعال
                                                        </option>
                                                        <option
                                                            value="deactivate" {{$user->status=='deactivate'?'selected':''}}>
                                                            غیر فعال
                                                        </option>
                                                    </select>

                                                </div>
                                                <div class="form-group">
                                                    <label>رمز عبور</label>
                                                    <input type="password" class="form-control" placeholder="رمز عبور"
                                                           name="password" value="{{old('password')}}"
                                                           data-validation-required-message="وارد کردن رمز عبور الزامی است">
                                                </div>
                                                <div class="form-group">
                                                    <label>تایید رمز عبور</label>
                                                    <input type="password" class="form-control" placeholder="رمز عبور"
                                                           name="password_confirmation" value="{{old('password_confirmation')}}"
                                                           data-validation-required-message="وارد کردن تایید رمز عبور الزامی است">
                                                </div>

                                            </div>
                                            <div class="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                                                <button type="submit"
                                                        class="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">ذخیره
                                                    تغییرات
                                                </button>
                                                <button type="reset" class="btn btn-light">انصراف</button>
                                            </div>
                                        </div>
                                    </form>
                                    <!-- users edit account form ends -->
                                </div>
                                <div class="tab-pane fade show" id="information" aria-labelledby="information-tab"
                                     role="tabpanel">
                                    <!-- users edit Info form start -->
                                    <form novalidate>
                                        <div class="row">
                                            <div class="col-12 col-sm-6">
                                                <h5 class="mb-1"><i class="bx bx-link mr-25"></i>شبکه های اجتماعی</h5>
                                                <div class="form-group">
                                                    <label>توییتر</label>
                                                    <input class="form-control text-left" type="text" dir="ltr"
                                                           value="https://www.twitter.com/">
                                                </div>
                                                <div class="form-group">
                                                    <label>فیسبوک</label>
                                                    <input class="form-control text-left" type="text" dir="ltr"
                                                           value="https://www.facebook.com/">
                                                </div>
                                                <div class="form-group">
                                                    <label>گوگل+</label>
                                                    <input class="form-control text-left" type="text" dir="ltr">
                                                </div>
                                                <div class="form-group">
                                                    <label>لینکدین</label>
                                                    <input class="form-control text-left" type="text" dir="ltr">
                                                </div>
                                                <div class="form-group">
                                                    <label>اینستاگرام</label>
                                                    <input class="form-control text-left" type="text" dir="ltr"
                                                           value="https://www.instagram.com/">
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-6 mt-1 mt-sm-0">
                                                <h5 class="mb-1"><i class="bx bx-user mr-25"></i>اطلاعات شخصی</h5>
                                                <div class="form-group">
                                                    <div class="controls position-relative">
                                                        <label>تاریخ تولد</label>
                                                        <input type="text" class="form-control birthdate-picker"
                                                               required placeholder="تاریخ تولد"
                                                               data-validation-required-message="وارد کردن تاریخ تولد الزامی است">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label>کشور</label>
                                                    <select class="form-control" id="accountSelect">
                                                        <option>ایران</option>
                                                        <option>هند</option>
                                                        <option>کانادا</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>زبان ها</label>
                                                    <select class="form-control" id="users-language-select2" multiple>
                                                        <option value="English" selected>انگلیسی</option>
                                                        <option value="Spanish">اسپانیایی</option>
                                                        <option value="French">فرانسوی</option>
                                                        <option value="Russian">روسی</option>
                                                        <option value="German">آلمانی</option>
                                                        <option value="Arabic" selected>عربی</option>
                                                        <option value="Sanskrit">لورم ایپسوم</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <div class="controls">
                                                        <label>تلفن</label>
                                                        <input type="text" class="form-control text-left" required
                                                               placeholder="شماره تلفن" value="(+656) 254 2568"
                                                               data-validation-required-message="وارد کردن شماره تلفن الزامی است"
                                                               dir="ltr">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="controls">
                                                        <label>آدرس</label>
                                                        <input type="text" class="form-control" placeholder="آدرس"
                                                               data-validation-required-message="This Address field is required">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label>وب‌سایت</label>
                                                    <input type="text" class="form-control text-left"
                                                           placeholder="آدرس وب سایت" dir="ltr">
                                                </div>
                                                <div class="form-group">
                                                    <label>موزیک مورد علاقه</label>
                                                    <select class="form-control" id="users-music-select2" multiple>
                                                        <option value="Rock">راک</option>
                                                        <option value="Jazz" selected>جاز</option>
                                                        <option value="Disco">دیسکو</option>
                                                        <option value="Pop">پاپ</option>
                                                        <option value="Techno">تکنو</option>
                                                        <option value="Folk" selected>فولک</option>
                                                        <option value="Hip hop">هیپ هاپ</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label>فیلم های مورد علاقه</label>
                                                    <select class="form-control" id="users-movies-select2" multiple>
                                                        <option value="The Dark Knight" selected>شوالیه تاریکی
                                                        </option>
                                                        <option value="Harry Potter" selected>هری پاتر</option>
                                                        <option value="Airplane!">هواپیما!</option>
                                                        <option value="Perl Harbour">پرل هاربور</option>
                                                        <option value="Spider Man">مرد عنکبوتی</option>
                                                        <option value="Iron Man" selected>مرد آهنی</option>
                                                        <option value="Avatar">آواتار</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                                                <button type="submit"
                                                        class="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">ذخیره
                                                    تغییرات
                                                </button>
                                                <button type="reset" class="btn btn-light">انصراف</button>
                                            </div>
                                        </div>
                                    </form>
                                    <!-- users edit Info form ends -->
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
