<!-- BEGIN: Header-->
<div class="header-navbar-shadow"></div>
<nav class="header-navbar main-header-navbar navbar-expand-lg navbar navbar-with-menu ">
    <div class="navbar-wrapper">
        <div class="navbar-container content">
            <div class="navbar-collapse" id="navbar-mobile">
                <div class="mr-auto float-left bookmark-wrapper d-flex align-items-center">
                    <ul class="nav navbar-nav">
                        <li class="nav-item mobile-menu d-xl-none mr-auto"><a style="float: right"
                                                                              class=" menu-toggle hidden-xs" href="#"><i
                                    style="font-size: 32px"
                                    class="bx bx-menu"></i></a></li>
                    </ul>
                    <ul class="nav navbar-nav">
                        <li class="nav-item d-none d-lg-block"><a class="nav-link bookmark-star"><i id="showen"
                                                                                                    style="visibility: visible !important;display: block !important;"
                                                                                                    class="ficon bx bx-star warning"></i></a>
                            <div class="bookmark-input search-input">
                                <div class="bookmark-input-icon"><i class="bx bx-search primary"></i></div>
                                <input class="form-control input" type="text" placeholder="جستجو ..." tabindex="0"
                                       data-search="template-search">
                                <ul class="search-list"></ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <ul class="nav navbar-nav float-right">
                    {{--      <li class="dropdown dropdown-language nav-item"><a class="dropdown-toggle nav-link"
                                                                             id="dropdown-flag" href="#"
                                                                             data-toggle="dropdown" aria-haspopup="true"
                                                                             aria-expanded="false"><i
                                      class="flag-icon flag-icon-ir"></i><span class="selected-language">فارسی</span></a>
                              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-flag"><a
                                      class="dropdown-item" href="#" data-language="fa"><i
                                          class="flag-icon flag-icon-ir mr-50"></i> فارسی</a></div>
                          </li>--}}

                    <li class="nav-item d-none d-lg-block" style="
    display: flex !important;
    margin-left: 15px;
    align-items: center;
    justify-content: center;
">
                        <div class="custom-control custom-switch mr-2 mb-1"
                             style="margin: 0px !important; padding : 0px !important">
                            <input type="checkbox" class="custom-control-input" id="customSwitch10">
                            <label class="custom-control-label" for="customSwitch10">
                                <span class="switch-icon-left"><i style="transform: rotate(180deg)"
                                                                  class="bx bxs-moon"></i></span>
                                <span class="switch-icon-right"><i class="bx bxs-sun"></i></span>
                            </label>
                        </div>
                    </li>

                    <li class="nav-item"><a class="nav-link nav-link-expand"><i
                                style="display: block !important; visibility: visible !important;"
                                class="ficon bx bx-fullscreen"></i></a></li>


                    {{--    <li class="nav-item nav-search"><a class="nav-link nav-link-search"><i
                                    class="ficon bx bx-search"></i></a>
                            <div class="search-input">
                                <div class="search-input-icon"><i class="bx bx-search primary"></i></div>
                                <input class="input" type="text" placeholder="جستجو ..." tabindex="-1"
                                       data-search="template-search">
                                <div class="search-input-close"><i class="bx bx-x"></i></div>
                                <ul class="search-list"></ul>
                            </div>
                        </li>
                        <li class="dropdown dropdown-notification nav-item"><a class="nav-link nav-link-label" href="#"
                                                                               data-toggle="dropdown"><i
                                    class="ficon bx bx-bell bx-tada bx-flip-horizontal"></i><span
                                    class="badge badge-pill badge-danger badge-up">5</span></a>
                            <ul class="dropdown-menu dropdown-menu-media">
                                <li class="dropdown-menu-header">
                                    <div class="dropdown-header px-1 py-75 d-flex justify-content-between"><span
                                            class="notification-title">7 اعلان جدید</span><span
                                            class="text-bold-400 cursor-pointer">علامت خوانده شده به همه</span></div>
                                </li>
                                <li class="scrollable-container media-list"><a class="d-flex justify-content-between"
                                                                               href="javascript:void(0)">
                                        <div class="media d-flex align-items-center">
                                            <div class="media-left pr-0">
                                                <div class="avatar mr-1 m-0"><img
                                                        src="{{adminTheme("images/portrait/small/avatar-s-11.jpg")}}"
                                                        alt="avatar" height="39" width="39"></div>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading"><span class="text-bold-500">تبریک بابت دریافت جوایز</span>
                                                    در مسابقات سالانه</h6><small class="notification-text">15 اردیبهشت 12:32
                                                    ب.ظ</small>
                                            </div>
                                        </div>
                                    </a>
                                    <div class="d-flex justify-content-between read-notification cursor-pointer">
                                        <div class="media d-flex align-items-center">
                                            <div class="media-left pr-0">
                                                <div class="avatar mr-1 m-0"><img
                                                        src="{{adminTheme("images/portrait/small/avatar-s-16.jpg")}}"
                                                        alt="avatar" height="39" width="39"></div>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading"><span class="text-bold-500">پیام جدید</span>
                                                    دریافت شد</h6><small class="notification-text">شما 18 پیام خوانده نشده
                                                    دارید</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between cursor-pointer">
                                        <div class="media d-flex align-items-center py-0">
                                            <div class="media-left pr-0"><img class="mr-1"
                                                                              src="{{adminTheme("images/icon/sketch-mac-icon.png")}}"
                                                                              alt="avatar" height="39" width="39"></div>
                                            <div class="media-body">
                                                <h6 class="media-heading"><span
                                                        class="text-bold-500">به روز رسانی آماده است</span></h6><small
                                                    class="notification-text">Sketch 50.2 is currently newly added</small>
                                            </div>
                                            <div class="media-right pl-0">
                                                <div class="row border-left text-center">
                                                    <div class="col-12 px-50 py-50 border-bottom">
                                                        <h6 class="media-heading text-bold-500 mb-0">به‌روزرسانی</h6>
                                                    </div>
                                                    <div class="col-12 px-50 py-50">
                                                        <h6 class="media-heading mb-0">بستن</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between cursor-pointer">
                                        <div class="media d-flex align-items-center">
                                            <div class="media-left pr-0">
                                                <div class="avatar bg-primary bg-lighten-5 mr-1 m-0 p-25"><span
                                                        class="avatar-content text-primary font-medium-2">ل‌د</span></div>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading"><span class="text-bold-500">مشتری جدید</span> ثبت
                                                    نام کرد</h6><small class="notification-text">1 ساعت پیش</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cursor-pointer">
                                        <div class="media d-flex align-items-center justify-content-between">
                                            <div class="media-left pr-0">
                                                <div class="media-body">
                                                    <h6 class="media-heading">پیشنهاد های جدید</h6>
                                                </div>
                                            </div>
                                            <div class="media-right">
                                                <div class="custom-control custom-switch">
                                                    <input class="custom-control-input" type="checkbox" checked
                                                           id="notificationSwtich">
                                                    <label class="custom-control-label" for="notificationSwtich"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between cursor-pointer">
                                        <div class="media d-flex align-items-center">
                                            <div class="media-left pr-0">
                                                <div class="avatar bg-danger bg-lighten-5 mr-1 m-0 p-25"><span
                                                        class="avatar-content"><i
                                                            class="bx bxs-heart text-danger"></i></span></div>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading"><span class="text-bold-500">نرم افزار</span> تایید
                                                    شد</h6><small class="notification-text">6 ساعت پیش</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between read-notification cursor-pointer">
                                        <div class="media d-flex align-items-center">
                                            <div class="media-left pr-0">
                                                <div class="avatar mr-1 m-0"><img
                                                        src="{{adminTheme("images/portrait/small/avatar-s-4.jpg")}}"
                                                        alt="avatar" height="39" width="39"></div>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading"><span class="text-bold-500">فایل جدید</span> ارسال
                                                    شد</h6><small class="notification-text">4 ساعت پیش</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between cursor-pointer">
                                        <div class="media d-flex align-items-center">
                                            <div class="media-left pr-0">
                                                <div class="avatar bg-rgba-danger m-0 mr-1 p-25">
                                                    <div class="avatar-content"><i class="bx bx-detail text-danger"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading"><span class="text-bold-500">گزارش بودجه</span>
                                                    ایجاد شد</h6><small class="notification-text">25 ساعت پیش</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between cursor-pointer">
                                        <div class="media d-flex align-items-center border-0">
                                            <div class="media-left pr-0">
                                                <div class="avatar mr-1 m-0"><img
                                                        src="{{adminTheme("images/portrait/small/avatar-s-16.jpg")}}"
                                                        alt="avatar" height="39" width="39"></div>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="media-heading"><span class="text-bold-500">مشتری جدید</span>
                                                    دیدگاهی ارسال کرد</h6><small class="notification-text">2 روز پیش</small>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="dropdown-menu-footer"><a
                                        class="dropdown-item p-50 text-primary justify-content-center"
                                        href="javascript:void(0)">خواندن همه اعلان ها</a></li>
                            </ul>
                        </li>--}}
                    <li class="dropdown dropdown-user nav-item"><a class="dropdown-toggle nav-link dropdown-user-link"
                                                                   href="#" data-toggle="dropdown">
                            <div class="user-nav d-sm-flex d-none"><span
                                    class="user-name">{{auth()->user()->fullname}}</span></span>
                                <span
                                    class="user-status text-muted">{{auth()->user()->userRoleName}}</span>

                            </div>

                            <span><img class="round" src="<?php $url = Auth::user()->image;  echo asset("storage/images/$url")?>"
                                       alt="avatar" height="40" width="40"></span></a>
                        <div class="dropdown-menu pb-0">
                            <a class="dropdown-item" href="/" target="_blank"><i class="bx bx-show mr-50"></i> مشاهده سایت</a>

                            <div class="dropdown-divider mb-0"></div>

                            <a class="dropdown-item" href="{{route('profile.edit')}}"><i class="bx bx-user mr-50"></i> حساب کاربری</a>

                            <div class="dropdown-divider mb-0"></div>
                            <a class="dropdown-item" href="{{route('auth.logout')}}"><i class="bx bx-power-off mr-50"></i> خروج</a>


                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>
<!-- END: Header-->


