@extends("panel.themes.frest.layouts.authLayout")
@section("content")

    <!-- Content area -->
    <div class="content-wrapper">
        <div class="content-header row">
        </div>
        <div class="content-body"><!-- register section starts -->
            <section class="row flexbox-container">
                <div class="col-xl-8 col-10">
                    <div class="card bg-authentication mb-0">
                        <div class="row m-0">
                            <!-- register section left -->
                            <div class="col-md-6 col-12 px-0">
                                <div class="card disable-rounded-right mb-0 p-2 h-100 d-flex justify-content-center">
                                    <div class="card-header pb-1">
                                        <div class="card-title">
                                            <h4 class="text-center mb-2">ثبت نام</h4>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <p><small class="line-height-2 d-inline-block"> لطفا جزئیات خود را برای ثبت نام
                                                وارد کرده و عضوی از جامعه عالی ما شوید.</small>
                                        </p>
                                    </div>
                                    <div class="card-content">
                                        <div class="card-body">
                                            @if($errors->any())
                                                <script>
                                                    registerError("{!! $errors->first() !!}");
                                                </script>
                                            @endif
                                            <form action="{{ route("auth.store") }}" method="post">
                                                @csrf

                                                <div class="form-row">
                                                    <div class="form-group col-md-6 mb-50">

                                                        <label for="inputfirstname4">نام</label>
                                                        <input type="text" class="form-control" id="inputfirstname4"
                                                               name="name" value="{{old('name')}}" placeholder="نام">

                                                    </div>
                                                    <div class="form-group col-md-6 mb-50">
                                                        <label for="inputlastname4">نام خانوادگی</label>
                                                        <input type="text" class="form-control" id="inputlastname4"
                                                               name="family" value="{{old('family')}}"
                                                               placeholder="نام خانوادگی">
                                                    </div>

                                                </div>
                                                <div class="form-group mb-50">
                                                    <label class="text-bold-700" for="exampleInputUsername1">شماره
                                                        موبایل</label>
                                                    <input type="text" class="form-control text-left"
                                                           name="phone" value="{{old('phone')}}"
                                                           id="exampleInputUsername1" placeholder="شماره موبایل"
                                                           dir="ltr">

                                                </div>
                                                <div class="form-group mb-50">
                                                    <label class="text-bold-700" for="exampleInputEmail1">آدرس
                                                        ایمیل</label>
                                                    <input type="email" class="form-control text-left"
                                                           name="email" value="{{old('email')}}" id="exampleInputEmail1"
                                                           placeholder="آدرس ایمیل" dir="ltr">

                                                </div>
                                                <div class="form-group mb-2">
                                                    <label class="text-bold-700" for="exampleInputPassword1">رمز
                                                        عبور</label>
                                                    <input type="password" class="form-control text-left"
                                                           name="password" id="password" placeholder="رمز عبور"
                                                           dir="ltr">

                                                </div>
                                                <div class="form-group mb-2">
                                                    <label class="text-bold-700" for="exampleInputPassword1">تایید رمز
                                                        عبور </label>
                                                    <input type="password" class="form-control text-left"
                                                           name="password_confirmation" id="password-confirm"
                                                           placeholder=" تایید رمز عبور" dir="ltr">

                                                </div>

                                                <button type="submit"
                                                        class="btn btn-primary glow position-relative w-100">ثبت نام<i
                                                        id="icon-arrow" class="bx bx-left-arrow-alt"></i></button>
                                            </form>
                                            <hr>
                                            <div class="text-center"><small class="mr-25">حساب کاربری دارید؟</small><a
                                                    href="{{route('auth.login')}}"><small>ورود</small> </a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- image section right -->
                            <div class="col-md-6 d-md-block d-none text-center align-self-center p-3">
                                <img class="img-fluid" src="{{adminTheme("images/pages/register.png")}}"
                                     alt="branding logo">
                            </div>
                        </div>
                    </div>
                </div>



            </section>
            <!-- register section endss -->
        </div>
    </div>



    <!-- /content area -->

@endsection

