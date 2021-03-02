@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "کاربران")

@section("content")
    <div class="content-wrapper">
        <div class="content-header row">
        </div>
        <div class="content-body"><!-- users edit start -->
            <div class="tab-content">
                <div class="tab-pane active fade show" id="account" aria-labelledby="account-tab" role="tabpanel">
                    <!-- users edit media object start -->
                    <!-- users edit account form start -->
                    @if($errors->any())
                        <script>
                            updateProfileError("{!! $errors->first() !!}");
                        </script>
                    @endif
                    <form method="POST" action="{{route('admin.user.store')}}">
                        @csrf
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <div class="form-group">
                                    <div class="controls">
                                        <label>نام </label>
                                        <input type="text" class="form-control text-left" name="name"
                                               placeholder="نام " value="{{old('name')}}"
                                               data-validation-required-message="وارد کردن نام  الزامی است"
                                               dir="ltr">
                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="controls">
                                        <label>شماره موبایل</label>
                                        <input type="text" class="form-control text-left"
                                               placeholder="شماره موبایل" name="phone"
                                               value="{{old('phone')}}"
                                               data-validation-required-message="وارد کردن شماره موبایل الزامی است"
                                               dir="ltr">
                                    </div>

                                </div>

                                <div class="form-group">
                                    <div class="controls">
                                        <label>ایمیل</label>
                                        <input type="email" class="form-control text-left"
                                               placeholder="ایمیل" name="email" value="{{old('email')}}"
                                               data-validation-required-message="وارد کردن ایمیل الزامی است"
                                               dir="ltr">
                                    </div>

                                </div>

                                <div class="form-group">
                                    <label>دسترسی</label>
                                    <select class="form-control" name="role">
                                        @foreach($roles as $role)
                                            <option
                                                value="{{$role->id}}" {{$role->name=='user'?'selected':''}} >
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
                                               placeholder="نام خانوادگی" name="family"
                                               value="{{old('family')}}"
                                               data-validation-required-message="وارد کردن نام خانوادگی الزامی است">
                                    </div>

                                </div>
                                <div class="form-group">
                                    <label>وضعیت</label>
                                    <select class="form-control" name="status"
                                            >
                                        <option
                                            value="active"  >
                                            فعال
                                        </option>
                                        <option
                                            value="deactivate" >
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
                                        class="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">
                                    ارسال
                                </button>
                                <button type="reset" class="btn btn-light">انصراف</button>
                            </div>
                        </div>
                    </form>                    <!-- users edit account form ends -->
                </div>
                <div class="tab-pane fade show" id="information" aria-labelledby="information-tab" role="tabpanel">
                    <!-- users edit Info form start -->
                    <form novalidate="">
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <h5 class="mb-1"><i class="bx bx-link mr-25"></i>شبکه های اجتماعی</h5>
                                <div class="form-group">
                                    <label>توییتر</label>
                                    <input class="form-control text-left" type="text" dir="ltr" value="https://www.twitter.com/">
                                </div>
                                <div class="form-group">
                                    <label>فیسبوک</label>
                                    <input class="form-control text-left" type="text" dir="ltr" value="https://www.facebook.com/">
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
                                    <input class="form-control text-left" type="text" dir="ltr" value="https://www.instagram.com/">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 mt-1 mt-sm-0">
                                <h5 class="mb-1"><i class="bx bx-user mr-25"></i>اطلاعات شخصی</h5>
                                <div class="form-group">
                                    <div class="controls position-relative">
                                        <label>تاریخ تولد</label>
                                        <input type="text" class="form-control birthdate-picker hasDatepicker" required="" placeholder="تاریخ تولد" data-validation-required-message="وارد کردن تاریخ تولد الزامی است" id="dp1614002021959">
                                        <div class="help-block"></div></div>
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
                                    <select class="form-control select2-hidden-accessible" id="users-language-select2" multiple="" data-select2-id="users-language-select2" tabindex="-1" aria-hidden="true">
                                        <option value="English" selected="" data-select2-id="2">انگلیسی</option>
                                        <option value="Spanish">اسپانیایی</option>
                                        <option value="French">فرانسوی</option>
                                        <option value="Russian">روسی</option>
                                        <option value="German">آلمانی</option>
                                        <option value="Arabic" selected="" data-select2-id="3">عربی</option>
                                        <option value="Sanskrit">لورم ایپسوم</option>
                                    </select><span class="select2 select2-container select2-container--default" dir="rtl" data-select2-id="1" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1"><ul class="select2-selection__rendered"><li class="select2-selection__choice" title="انگلیسی" data-select2-id="4"><span class="select2-selection__choice__remove" role="presentation">×</span>انگلیسی</li><li class="select2-selection__choice" title="عربی" data-select2-id="5"><span class="select2-selection__choice__remove" role="presentation">×</span>عربی</li><li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" placeholder="" style="width: 0.95em;"></li></ul></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                </div>
                                <div class="form-group">
                                    <div class="controls">
                                        <label>تلفن</label>
                                        <input type="text" class="form-control text-left" required="" placeholder="شماره تلفن" value="(+656) 254 2568" data-validation-required-message="وارد کردن شماره تلفن الزامی است" dir="ltr">
                                        <div class="help-block"></div></div>
                                </div>
                                <div class="form-group">
                                    <div class="controls">
                                        <label>آدرس</label>
                                        <input type="text" class="form-control" placeholder="آدرس" data-validation-required-message="This Address field is required">
                                        <div class="help-block"></div></div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label>وب&zwnj;سایت</label>
                                    <input type="text" class="form-control text-left" placeholder="آدرس وب سایت" dir="ltr">
                                </div>
                                <div class="form-group">
                                    <label>موزیک مورد علاقه</label>
                                    <select class="form-control select2-hidden-accessible" id="users-music-select2" multiple="" data-select2-id="users-music-select2" tabindex="-1" aria-hidden="true">
                                        <option value="Rock">راک</option>
                                        <option value="Jazz" selected="" data-select2-id="7">جاز</option>
                                        <option value="Disco">دیسکو</option>
                                        <option value="Pop">پاپ</option>
                                        <option value="Techno">تکنو</option>
                                        <option value="Folk" selected="" data-select2-id="8">فولک</option>
                                        <option value="Hip hop">هیپ هاپ</option>
                                    </select><span class="select2 select2-container select2-container--default" dir="rtl" data-select2-id="6" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1"><ul class="select2-selection__rendered"><li class="select2-selection__choice" title="جاز" data-select2-id="9"><span class="select2-selection__choice__remove" role="presentation">×</span>جاز</li><li class="select2-selection__choice" title="فولک" data-select2-id="10"><span class="select2-selection__choice__remove" role="presentation">×</span>فولک</li><li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" placeholder="" style="width: 0.95em;"></li></ul></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label>فیلم های مورد علاقه</label>
                                    <select class="form-control select2-hidden-accessible" id="users-movies-select2" multiple="" data-select2-id="users-movies-select2" tabindex="-1" aria-hidden="true">
                                        <option value="The Dark Knight" selected="" data-select2-id="12">شوالیه تاریکی
                                        </option>
                                        <option value="Harry Potter" selected="" data-select2-id="13">هری پاتر</option>
                                        <option value="Airplane!">هواپیما!</option>
                                        <option value="Perl Harbour">پرل هاربور</option>
                                        <option value="Spider Man">مرد عنکبوتی</option>
                                        <option value="Iron Man" selected="" data-select2-id="14">مرد آهنی</option>
                                        <option value="Avatar">آواتار</option>
                                    </select><span class="select2 select2-container select2-container--default" dir="rtl" data-select2-id="11" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1"><ul class="select2-selection__rendered"><li class="select2-selection__choice" title="شوالیه تاریکی
                                            " data-select2-id="15"><span class="select2-selection__choice__remove" role="presentation">×</span>شوالیه تاریکی
                                            </li><li class="select2-selection__choice" title="هری پاتر" data-select2-id="16"><span class="select2-selection__choice__remove" role="presentation">×</span>هری پاتر</li><li class="select2-selection__choice" title="مرد آهنی" data-select2-id="17"><span class="select2-selection__choice__remove" role="presentation">×</span>مرد آهنی</li><li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" placeholder="" style="width: 0.95em;"></li></ul></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                </div>
                            </div>
                            <div class="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                                <button type="submit" class="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">ذخیره تغییرات</button>
                                <button type="reset" class="btn btn-light">انصراف</button>
                            </div>
                        </div>
                    </form>
                    <!-- users edit Info form ends -->
                </div>
            </div>

            <!-- users edit ends -->
        </div>
    </div>
@endsection
