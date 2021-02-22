<!DOCTYPE html>
<html class="loading" lang="fa" data-textdirection="rtl" dir="rtl">
<!-- BEGIN: Head-->
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
    <title>لیست کاربران</title>
    <link rel="shortcut icon" type="image/x-icon" href="{{adminTheme("images/ico/favicon.ico")}}">
    <meta name="theme-color" content="#5A8DEE">

    <!-- BEGIN: Vendor CSS-->
    <link rel="stylesheet" type="text/css" href="{{adminTheme("vendors/css/vendors.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("vendors/css/tables/datatable/datatables.min.css")}}">
    <!-- END: Vendor CSS-->

    <!-- BEGIN: Theme CSS-->
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/bootstrap.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/bootstrap-extended.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/colors.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/components.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/themes/dark-layout.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/themes/semi-dark-layout.css")}}">
    <!-- END: Theme CSS-->

    <!-- BEGIN: Page CSS-->
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/core/menu/menu-types/vertical-menu.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/pages/page-users.css")}}">
    <!-- END: Page CSS-->

</head>
<!-- END: Head-->

<!-- BEGIN: Body-->
<body class="vertical-layout vertical-menu-modern boxicon-layout no-card-shadow 2-columns  navbar-sticky footer-static  " data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">

<!-- BEGIN: Header-->
<div class="header-navbar-shadow"></div>
<nav class="header-navbar main-header-navbar navbar-expand-lg navbar navbar-with-menu fixed-top ">
    <div class="navbar-wrapper">
        <div class="navbar-container content">
            <div class="navbar-collapse" id="navbar-mobile">
                <div class="mr-auto float-left bookmark-wrapper d-flex align-items-center">
                    <ul class="nav navbar-nav">
                        <li class="nav-item mobile-menu d-xl-none mr-auto"><a class="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i class="ficon bx bx-menu"></i></a></li>
                    </ul>
                    <ul class="nav navbar-nav bookmark-icons">
                        <li class="nav-item d-none d-lg-block"><a class="nav-link" href="app-email.html" data-toggle="tooltip" data-placement="bottom" title="ایمیل"><i class="ficon bx bx-envelope"></i></a></li>
                        <li class="nav-item d-none d-lg-block"><a class="nav-link" href="app-chat.html" data-toggle="tooltip" data-placement="bottom" title="گفتگو"><i class="ficon bx bx-chat"></i></a></li>
                        <li class="nav-item d-none d-lg-block"><a class="nav-link" href="app-todo.html" data-toggle="tooltip" data-placement="bottom" title="وظایف"><i class="ficon bx bx-check-circle"></i></a></li>
                        <li class="nav-item d-none d-lg-block"><a class="nav-link" href="app-calendar.html" data-toggle="tooltip" data-placement="bottom" title="تقویم"><i class="ficon bx bx-calendar-alt"></i></a></li>
                    </ul>
                    <ul class="nav navbar-nav">
                        <li class="nav-item d-none d-lg-block"><a class="nav-link bookmark-star"><i class="ficon bx bx-star warning"></i></a>
                            <div class="bookmark-input search-input">
                                <div class="bookmark-input-icon"><i class="bx bx-search primary"></i></div>
                                <input class="form-control input" type="text" placeholder="جستجو ..." tabindex="0" data-search="template-search">
                                <ul class="search-list"></ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <ul class="nav navbar-nav float-right">
                    <li class="dropdown dropdown-language nav-item"><a class="dropdown-toggle nav-link" id="dropdown-flag" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="flag-icon flag-icon-ir"></i><span class="selected-language">فارسی</span></a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-flag"><a class="dropdown-item" href="#" data-language="fa"><i class="flag-icon flag-icon-ir mr-50"></i> فارسی</a><a class="dropdown-item" href="#" data-language="en"><i class="flag-icon flag-icon-us mr-50"></i> انگلیسی</a><a class="dropdown-item" href="#" data-language="fr"><i class="flag-icon flag-icon-fr mr-50"></i> فرانسوی</a><a class="dropdown-item" href="#" data-language="de"><i class="flag-icon flag-icon-de mr-50"></i> آلمانی</a><a class="dropdown-item" href="#" data-language="pt"><i class="flag-icon flag-icon-pt mr-50"></i> پرتغالی</a></div>
                    </li>
                    <li class="nav-item d-none d-lg-block"><a class="nav-link nav-link-expand"><i class="ficon bx bx-fullscreen"></i></a></li>
                    <li class="nav-item nav-search"><a class="nav-link nav-link-search"><i class="ficon bx bx-search"></i></a>
                        <div class="search-input">
                            <div class="search-input-icon"><i class="bx bx-search primary"></i></div>
                            <input class="input" type="text" placeholder="جستجو ..." tabindex="-1" data-search="template-search">
                            <div class="search-input-close"><i class="bx bx-x"></i></div>
                            <ul class="search-list"></ul>
                        </div>
                    </li>
                    <li class="dropdown dropdown-notification nav-item"><a class="nav-link nav-link-label" href="#" data-toggle="dropdown"><i class="ficon bx bx-bell bx-tada bx-flip-horizontal"></i><span class="badge badge-pill badge-danger badge-up">5</span></a>
                        <ul class="dropdown-menu dropdown-menu-media">
                            <li class="dropdown-menu-header">
                                <div class="dropdown-header px-1 py-75 d-flex justify-content-between"><span class="notification-title">7 اعلان جدید</span><span class="text-bold-400 cursor-pointer">علامت خوانده شده به همه</span></div>
                            </li>
                            <li class="scrollable-container media-list"><a class="d-flex justify-content-between" href="javascript:void(0)">
                                    <div class="media d-flex align-items-center">
                                        <div class="media-left pr-0">
                                            <div class="avatar mr-1 m-0"><img src="{{adminTheme("images/portrait/small/avatar-s-11.jpg")}}" alt="avatar" height="39" width="39"></div>
                                        </div>
                                        <div class="media-body">
                                            <h6 class="media-heading"><span class="text-bold-500">تبریک بابت دریافت جوایز</span> در مسابقات سالانه</h6><small class="notification-text">15 اردیبهشت 12:32 ب.ظ</small>
                                        </div>
                                    </div></a>
                                <div class="d-flex justify-content-between read-notification cursor-pointer">
                                    <div class="media d-flex align-items-center">
                                        <div class="media-left pr-0">
                                            <div class="avatar mr-1 m-0"><img src="{{adminTheme("images/portrait/small/avatar-s-16.jpg")}}" alt="avatar" height="39" width="39"></div>
                                        </div>
                                        <div class="media-body">
                                            <h6 class="media-heading"><span class="text-bold-500">پیام جدید</span> دریافت شد</h6><small class="notification-text">شما 18 پیام خوانده نشده دارید</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between cursor-pointer">
                                    <div class="media d-flex align-items-center py-0">
                                        <div class="media-left pr-0"><img class="mr-1" src="{{adminTheme("images/icon/sketch-mac-icon.png")}}" alt="avatar" height="39" width="39"></div>
                                        <div class="media-body">
                                            <h6 class="media-heading"><span class="text-bold-500">به روز رسانی آماده است</span></h6><small class="notification-text">Sketch 50.2 is currently newly added</small>
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
                                            <div class="avatar bg-primary bg-lighten-5 mr-1 m-0 p-25"><span class="avatar-content text-primary font-medium-2">ل‌د</span></div>
                                        </div>
                                        <div class="media-body">
                                            <h6 class="media-heading"><span class="text-bold-500">مشتری جدید</span> ثبت نام کرد</h6><small class="notification-text">1 ساعت پیش</small>
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
                                                <input class="custom-control-input" type="checkbox" checked id="notificationSwtich">
                                                <label class="custom-control-label" for="notificationSwtich"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between cursor-pointer">
                                    <div class="media d-flex align-items-center">
                                        <div class="media-left pr-0">
                                            <div class="avatar bg-danger bg-lighten-5 mr-1 m-0 p-25"><span class="avatar-content"><i class="bx bxs-heart text-danger"></i></span></div>
                                        </div>
                                        <div class="media-body">
                                            <h6 class="media-heading"><span class="text-bold-500">نرم افزار</span> تایید شد</h6><small class="notification-text">6 ساعت پیش</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between read-notification cursor-pointer">
                                    <div class="media d-flex align-items-center">
                                        <div class="media-left pr-0">
                                            <div class="avatar mr-1 m-0"><img src="{{adminTheme("images/portrait/small/avatar-s-4.jpg")}}" alt="avatar" height="39" width="39"></div>
                                        </div>
                                        <div class="media-body">
                                            <h6 class="media-heading"><span class="text-bold-500">فایل جدید</span> ارسال شد</h6><small class="notification-text">4 ساعت پیش</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between cursor-pointer">
                                    <div class="media d-flex align-items-center">
                                        <div class="media-left pr-0">
                                            <div class="avatar bg-rgba-danger m-0 mr-1 p-25">
                                                <div class="avatar-content"><i class="bx bx-detail text-danger"></i></div>
                                            </div>
                                        </div>
                                        <div class="media-body">
                                            <h6 class="media-heading"><span class="text-bold-500">گزارش بودجه</span> ایجاد شد</h6><small class="notification-text">25 ساعت پیش</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between cursor-pointer">
                                    <div class="media d-flex align-items-center border-0">
                                        <div class="media-left pr-0">
                                            <div class="avatar mr-1 m-0"><img src="{{adminTheme("images/portrait/small/avatar-s-16.jpg")}}" alt="avatar" height="39" width="39"></div>
                                        </div>
                                        <div class="media-body">
                                            <h6 class="media-heading"><span class="text-bold-500">مشتری جدید</span> دیدگاهی ارسال کرد</h6><small class="notification-text">2 روز پیش</small>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="dropdown-menu-footer"><a class="dropdown-item p-50 text-primary justify-content-center" href="javascript:void(0)">خواندن همه اعلان ها</a></li>
                        </ul>
                    </li>
                    <li class="dropdown dropdown-user nav-item"><a class="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown">
                            <div class="user-nav d-sm-flex d-none"><span class="user-name">تونی استارک</span><span class="user-status text-muted">آماده</span></div><span><img class="round" src="{{adminTheme("images/portrait/small/avatar-s-11.jpg")}}" alt="avatar" height="40" width="40"></span></a>
                        <div class="dropdown-menu pb-0"><a class="dropdown-item" href="page-user-profile.html"><i class="bx bx-user mr-50"></i> ویرایش پروفایل</a><a class="dropdown-item" href="app-email.html"><i class="bx bx-envelope mr-50"></i> صندوق ورودی من</a><a class="dropdown-item" href="app-todo.html"><i class="bx bx-check-square mr-50"></i> وظیفه</a><a class="dropdown-item" href="app-chat.html"><i class="bx bx-message mr-50"></i> گفتگو ها</a>
                            <div class="dropdown-divider mb-0"></div><a class="dropdown-item" href="auth-login.html"><i class="bx bx-power-off mr-50"></i> خروج</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>
<!-- END: Header-->


<!-- BEGIN: Main Menu-->
<div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
    <div class="navbar-header">
        <ul class="nav navbar-nav flex-row">
            <li class="nav-item mr-auto"><a class="navbar-brand" href="../../html/vertical-menu-boxicons-template/index.html">
                    <div class="brand-logo"><img class="logo" src="{{adminTheme("images/logo/logo.png")}}"></div>
                    <h2 class="brand-text mb-0">Frest</h2></a></li>
            <li class="nav-item nav-toggle"><a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse"><i class="bx bx-x d-block d-xl-none font-medium-4 primary toggle-icon"></i><i class="toggle-icon bx bx-disc font-medium-4 d-none d-xl-block collapse-toggle-icon primary" data-ticon="bx-disc"></i></a></li>
        </ul>
    </div>
    <div class="shadow-bottom"></div>
    <div class="main-menu-content">
        <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation" data-icon-style="">
            <li class=" nav-item"><a href="index.html"><i class="bx bx-home-alt"></i><span class="menu-title" data-i18n="Dashboard">داشبورد</span><span class="badge badge-light-danger badge-pill badge-round float-right mr-2">2</span></a>
                <ul class="menu-content">
                    <li><a href="dashboard-ecommerce.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="eCommerce">تجارت الکترونیک</span></a>
                    </li>
                    <li><a href="dashboard-analytics.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Analytics">آمار تحلیلی</span></a>
                    </li>
                </ul>
            </li>
            <li class=" navigation-header"><span>برنامه ها</span>
            </li>
            <li class=" nav-item"><a href="app-email.html"><i class="bx bx-envelope"></i><span class="menu-title" data-i18n="Email">ایمیل</span></a>
            </li>
            <li class=" nav-item"><a href="app-chat.html"><i class="bx bx-chat"></i><span class="menu-title" data-i18n="Chat">گفتگو</span></a>
            </li>
            <li class=" nav-item"><a href="app-todo.html"><i class="bx bx-check-circle"></i><span class="menu-title" data-i18n="Todo">وظایف</span></a>
            </li>
            <li class=" nav-item"><a href="app-calendar.html"><i class="bx bx-calendar"></i><span class="menu-title" data-i18n="Calendar">تقویم</span></a>
            </li>
            <li class=" nav-item"><a href="app-kanban.html"><i class="bx bx-grid-alt"></i><span class="menu-title" data-i18n="Kanban">یادداشت ها</span></a>
            </li>
            <li class=" nav-item"><a href="#"><i class="bx bx-file"></i><span class="menu-title" data-i18n="Invoice">صورتحساب</span></a>
                <ul class="menu-content">
                    <li><a href="app-invoice-list.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Invoice List">لیست صورتحساب ها</span></a>
                    </li>
                    <li><a href="app-invoice.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Invoice">صورتحساب</span></a>
                    </li>
                    <li><a href="app-invoice-edit.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Invoice Edit">ویرایش صورتحساب</span></a>
                    </li>
                    <li><a href="app-invoice-add.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Invoice Add">افزودن صورتحساب</span></a>
                    </li>
                </ul>
            </li>
            <li class=" nav-item"><a href="app-file-manager.html"><i class="bx bx-save"></i><span class="menu-title" data-i18n="File Manager">مدیریت فایل</span></a>
            </li>
            <li class=" navigation-header"><span>رابط کاربری</span>
            </li>
            <li class=" nav-item"><a href="#"><i class="bx bx-repeat"></i><span class="menu-title" data-i18n="Content">محتوا</span></a>
                <ul class="menu-content">
                    <li><a href="content-grid.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Grid">توری</span></a>
                    </li>
                    <li><a href="content-typography.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Typography">تایپوگرافی</span></a>
                    </li>
                    <li><a href="content-text-utilities.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Text Utilities">ابزار متن</span></a>
                    </li>
                    <li><a href="content-syntax-highlighter.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Syntax Highlighter">هایلایت Syntax</span></a>
                    </li>
                    <li><a href="content-helper-classes.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Helper Classes">کلاس های کمکی</span></a>
                    </li>
                </ul>
            </li>
            <li class=" nav-item"><a href="colors.html"><i class="bx bx-droplet"></i><span class="menu-title" data-i18n="Colors">رنگ ها</span></a>
            </li>
            <li class=" nav-item"><a href="#"><i class="bx bx-bulb"></i><span class="menu-title" data-i18n="Icons">آیکن‌ها</span></a>
                <ul class="menu-content">
                    <li><a href="icons-livicons.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="LivIcons">LivIcons</span></a>
                    </li>
                    <li><a href="icons-boxicons.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="boxicons">Boxicons</span></a>
                    </li>
                </ul>
            </li>
            <li class=" nav-item"><a href="#"><i class="bx bx-square-rounded"></i><span class="menu-title" data-i18n="Card">کارت</span></a>
                <ul class="menu-content">
                    <li><a href="card-basic.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Basic">پایه</span></a>
                    </li>
                    <li><a href="card-actions.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Card Actions">عملیات های کارت</span></a>
                    </li>
                </ul>
            </li>
            <li class=" nav-item"><a href="widgets.html"><i class="bx bx-grid"></i><span class="menu-title" data-i18n="Card Widgets">ویجت‌ها</span><span class="badge badge-light-primary badge-pill badge-round float-right">جدید</span></a>
            </li>
            <li class=" nav-item"><a href="#"><i class="bx bx-briefcase-alt-2"></i><span class="menu-title" data-i18n="Components">اجزاء</span></a>
                <ul class="menu-content">
                    <li><a href="component-alerts.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Alerts">اعلان‌ها</span></a>
                    </li>
                    <li><a href="component-buttons-basic.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Buttons">دکمه ها</span></a>
                    </li>
                    <li><a href="component-breadcrumbs.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Breadcrumbs">مسیر ناوبری</span></a>
                    </li>
                    <li><a href="component-carousel.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Carousel">گردونه</span></a>
                    </li>
                    <li><a href="component-collapse.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Collapse">باز و بسته شونده</span></a>
                    </li>
                    <li><a href="component-dropdowns.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Dropdowns">منوی کشویی</span></a>
                    </li>
                    <li><a href="component-list-group.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="List Group">گروه لیست</span></a>
                    </li>
                    <li><a href="component-modals.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Modals">مودال ها</span></a>
                    </li>
                    <li><a href="component-pagination.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Pagination">صفحه‌بندی</span></a>
                    </li>
                    <li><a href="component-navbar.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Navbar">نوار ناوبری</span></a>
                    </li>
                    <li><a href="component-tabs-component.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Tabs Component">سربرگ ها</span></a>
                    </li>
                    <li><a href="component-pills-component.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Pills Component">سربرگ های دکمه ای</span></a>
                    </li>
                    <li><a href="component-tooltips.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Tooltips">تولتیپ ها</span></a>
                    </li>
                    <li><a href="component-popovers.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Popovers">پاپ اور</span></a>
                    </li>
                    <li><a href="component-badges.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Badges">نشان ها</span></a>
                    </li>
                    <li><a href="component-pill-badges.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Pill Badges">نشان های قرصی</span></a>
                    </li>
                    <li><a href="component-progress.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Progress">پیشرفت</span></a>
                    </li>
                    <li><a href="component-media-objects.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Media Objects">رسانه ها</span></a>
                    </li>
                    <li><a href="component-spinner.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Spinner">چرخنده</span></a>
                    </li>
                    <li><a href="component-bs-toast.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Toasts">اعلان توست</span></a>
                    </li>
                </ul>
            </li>
            <li class=" nav-item"><a href="#"><i class="bx bx-briefcase"></i><span class="menu-title" data-i18n="Extra Components">اجزای بیشتر</span></a>
                <ul class="menu-content">
                    <li><a href="ex-component-avatar.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Avatar">آواتار</span></a>
                    </li>
                    <li><a href="ex-component-chips.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Chips">ژتون ها</span></a>
                    </li>
                    <li><a href="ex-component-divider.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Divider">جدا کننده</span></a>
                    </li>
                </ul>
            </li>
            <li class=" navigation-header"><span>فرم ها و جدول ها</span>
            </li>
            <li class=" nav-item"><a href="#"><i class="bx bx-check"></i><span class="menu-title" data-i18n="Form Elements">عناصر فرم</span></a>
                <ul class="menu-content">
                    <li><a href="form-inputs.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Input">ورودی</span></a>
                    </li>
                    <li><a href="form-input-groups.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Input Groups">گروه های ورودی</span></a>
                    </li>
                    <li><a href="form-number-input.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Number Input">ورودی عدد</span></a>
                    </li>
                    <li><a href="form-select.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Select">انتخاب</span></a>
                    </li>
                    <li><a href="form-radio.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Radio">دکمه های رادیویی</span></a>
                    </li>
                    <li><a href="form-checkbox.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Checkbox">چک باکس</span></a>
                    </li>
                    <li><a href="form-switch.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Switch">سوییچ</span></a>
                    </li>
                    <li><a href="form-textarea.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Textarea">ناحیه متنی</span></a>
                    </li>
                    <li><a href="form-quill-editor.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Quill Editor">ویرایشگر Quill</span></a>
                    </li>
                    <li><a href="form-file-uploader.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="File Uploader">ارسال کننده فایل</span></a>
                    </li>
                    <li><a href="form-date-time-picker.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Date & Time Picker">انتخاب گر تاریخ و زمان</span></a>
                    </li>
                </ul>
            </li>
            <li class=" nav-item"><a href="form-layout.html"><i class="bx bx-slider"></i><span class="menu-title" data-i18n="Form Layout">طرح های فرم</span></a>
            </li>
            <li class=" nav-item"><a href="form-wizard.html"><i class="bx bx-list-plus"></i><span class="menu-title" data-i18n="Form Wizard">فرم مرحله ای</span></a>
            </li>
            <li class=" nav-item"><a href="form-validation.html"><i class="bx bx-check-shield"></i><span class="menu-title" data-i18n="Form Validation">اعتبارسنجی فرم</span></a>
            </li>
            <li class=" nav-item"><a href="form-repeater.html"><i class="bx bx-detail"></i><span class="menu-title" data-i18n="Form Repeater">فرم تکرار شونده</span></a>
            </li>
            <li class=" nav-item"><a href="table.html"><i class="bx bx-grid-alt"></i><span class="menu-title" data-i18n="Table">جدول</span></a>
            </li>
            <li class=" nav-item"><a href="table-extended.html"><i class="bx bx-table"></i><span class="menu-title" data-i18n="bx bx-selection">جدول پیشرفته</span></a>
            </li>
            <li class=" nav-item"><a href="table-datatable.html"><i class="bx bx-map-alt"></i><span class="menu-title" data-i18n="Datatable">جدول اطلاعات</span></a>
            </li>
            <li class=" navigation-header"><span>صفحات</span>
            </li>
            <li class=" nav-item"><a href="page-user-profile.html"><i class="bx bx-user"></i><span class="menu-title" data-i18n="User Profile">پروفایل کاربر</span></a>
            </li>
            <li class=" nav-item"><a href="page-faq.html"><i class="bx bx-help-circle"></i><span class="menu-title" data-i18n="FAQ">سوالات متداول</span></a>
            </li>
            <li class=" nav-item"><a href="page-knowledge-base.html"><i class="bx bx-error-circle"></i><span class="menu-title" data-i18n="Knowledge Base">پایگاه دانش</span></a>
            </li>
            <li class=" nav-item"><a href="page-search.html"><i class="bx bx-search"></i><span class="menu-title" data-i18n="Search">جستجو</span></a>
            </li>
            <li class=" nav-item"><a href="page-account-settings.html"><i class="bx bx-wrench"></i><span class="menu-title" data-i18n="Account Settings">تنظیمات حساب کاربری</span></a>
            </li>
            <li class=" nav-item"><a href="#"><i class="bx bx-user-plus"></i><span class="menu-title" data-i18n="User">کاربران</span></a>
                <ul class="menu-content">
                    <li class="active"><a href="page-users-list.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="List">لیست</span></a>
                    </li>
                    <li><a href="page-users-view.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="View">مشاهده</span></a>
                    </li>
                    <li><a href="page-users-edit.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Edit">ویرایش</span></a>
                    </li>
                </ul>
            </li>
            <li class=" nav-item"><a href="#"><i class="bx bx-building"></i><span class="menu-title" data-i18n="Starter kit">طرح های شروع</span></a>
                <ul class="menu-content">
                    <li><a href="../../starter-kit/vertical-menu-boxicons-template/sk-layout-1-column.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="1 column">1 ستون</span></a>
                    </li>
                    <li><a href="../../starter-kit/vertical-menu-boxicons-template/sk-layout-2-columns.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="2 columns">2 ستون</span></a>
                    </li>
                    <li><a href="../../starter-kit/vertical-menu-boxicons-template/sk-layout-fixed-navbar.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Fixed navbar">نوار بالایی ثابت</span></a>
                    </li>
                    <li><a href="../../starter-kit/vertical-menu-boxicons-template/sk-layout-fixed.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Fixed layout">طرح ثابت</span></a>
                    </li>
                    <li><a href="../../starter-kit/vertical-menu-boxicons-template/sk-layout-static.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Static layout">طرح ایستا</span></a>
                    </li>
                </ul>
            </li>
            <li class=" nav-item"><a href="#"><i class="bx bx-lock-open-alt"></i><span class="menu-title" data-i18n="Authentication">احراز هویت</span></a>
                <ul class="menu-content">
                    <li><a href="auth-login.html" target="_blank"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Login">ورود</span></a>
                    </li>
                    <li><a href="auth-register.html" target="_blank"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Register">ثبت نام</span></a>
                    </li>
                    <li><a href="auth-forgot-password.html" target="_blank"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Forgot Password">فراموشی رمز عبور</span></a>
                    </li>
                    <li><a href="auth-reset-password.html" target="_blank"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Reset Password">بازنشانی رمز عبور</span></a>
                    </li>
                    <li><a href="auth-lock-screen.html" target="_blank"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Lock Screen">قفل صفحه</span></a>
                    </li>
                </ul>
            </li>
            <li class=" nav-item"><a href="#"><i class="bx bx-share-alt"></i><span class="menu-title" data-i18n="Miscellaneous">متفرقه</span></a>
                <ul class="menu-content">
                    <li><a href="page-coming-soon.html" target="_blank"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Coming Soon">به زودی</span></a>
                    </li>
                    <li><a href="#"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Error">خطا</span></a>
                        <ul class="menu-content">
                            <li><a href="error-404.html" target="_blank"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="404">404</span></a>
                            </li>
                            <li><a href="error-500.html" target="_blank"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="500">500</span></a>
                            </li>
                        </ul>
                    </li>
                    <li><a href="page-not-authorized.html" target="_blank"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Not Authorized">دسترسی غیرمجاز</span></a>
                    </li>
                    <li><a href="page-maintenance.html" target="_blank"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Maintenance">تعمیرات</span></a>
                    </li>
                </ul>
            </li>
            <li class=" navigation-header"><span>نمودار ها و نقشه ها</span>
            </li>
            <li class=" nav-item"><a href="#"><i class="bx bx-pie-chart-alt"></i><span class="menu-title" data-i18n="Charts">نمودار ها</span><span class="badge badge-pill badge-round badge-light-success float-right mr-2">3</span></a>
                <ul class="menu-content">
                    <li><a href="chart-apex.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Apex">Apex</span></a>
                    </li>
                    <li><a href="chart-chartjs.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Chartjs">Chartjs</span></a>
                    </li>
                    <li><a href="chart-chartist.html"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Chartist">Chartist</span></a>
                    </li>
                </ul>
            </li>
            <li class=" nav-item"><a href="maps-google.html"><i class="bx bx-globe"></i><span class="menu-title" data-i18n="Google Maps">نقشه های گوگل</span></a>
            </li>
            <li class=" navigation-header"><span>افزونه ها</span>
            </li>
            <li class=" nav-item"><a href="ext-component-sweet-alerts.html"><i class="bx bx-error"></i><span class="menu-title" data-i18n="Sweet Alert">هشدار Sweet</span></a>
            </li>
            <li class=" nav-item"><a href="ext-component-toastr.html"><i class="bx bx-map-alt"></i><span class="menu-title" data-i18n="Toastr">اعلان Toastr</span></a>
            </li>
            <li class=" nav-item"><a href="ext-component-noui-slider.html"><i class="bx bx-slider-alt"></i><span class="menu-title" data-i18n="NoUi Slider">اسلایدر NoUi</span></a>
            </li>
            <li class=" nav-item"><a href="ext-component-drag-drop.html"><i class="bx bx-copy-alt"></i><span class="menu-title" data-i18n="Drag & Drop">کشیدن و رها کردن</span></a>
            </li>
            <li class=" nav-item"><a href="ext-component-tour.html"><i class="bx bx-paper-plane"></i><span class="menu-title" data-i18n="Tour">تور</span></a>
            </li>
            <li class=" nav-item"><a href="ext-component-swiper.html"><i class="bx bx-tab"></i><span class="menu-title" data-i18n="l18n">گردونه Swiper</span></a>
            </li>
            <li class=" nav-item"><a href="ext-component-treeview.html"><i class="bx bx-menu-alt-left"></i><span class="menu-title" data-i18n="l18n">نمایش درختی</span></a>
            </li>
            <li class=" nav-item"><a href="ext-component-block-ui.html"><i class="bx bx-fullscreen"></i><span class="menu-title" data-i18n="l18n">رابط کاربری بلوک</span></a>
            </li>
            <li class=" nav-item"><a href="ext-component-media-player.html"><i class="bx bx-music"></i><span class="menu-title" data-i18n="l18n">پخش کننده رسانه</span></a>
            </li>
            <li class=" nav-item"><a href="ext-component-miscellaneous.html"><i class="bx bx-sitemap"></i><span class="menu-title" data-i18n="Miscellaneous">متفرقه</span></a>
            </li>
            <li class=" nav-item"><a href="ext-component-i18n.html"><i class="bx bx-globe"></i><span class="menu-title" data-i18n="i18n">چند زبانی</span></a>
            </li>
            <li class=" navigation-header"><span>سایر</span>
            </li>
            <li class=" nav-item"><a href="#"><i class="bx bx-menu"></i><span class="menu-title" data-i18n="Menu Levels">سطح های فهرست</span></a>
                <ul class="menu-content">
                    <li><a href="#"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Second Level">سطح دوم</span></a>
                    </li>
                    <li><a href="#"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Second Level">سطح دوم</span></a>
                        <ul class="menu-content">
                            <li><a href="#"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Third Level">سطح سوم</span></a>
                            </li>
                            <li><a href="#"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Third Level">سطح سوم</span></a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li class="disabled nav-item"><a href="#"><i class="bx bx-unlink"></i><span class="menu-title" data-i18n="Disabled Menu">گزینه غیرفعال</span></a>
            </li>
        </ul>
    </div>
</div>
<!-- END: Main Menu-->

<!-- BEGIN: Content-->
<div class="app-content content">
    <div class="content-overlay"></div>
    <div class="content-wrapper">
        <div class="content-header row">
        </div>
        <div class="content-body"><!-- users list start -->
            <section class="users-list-wrapper">
                <div class="users-list-filter px-1">
                    <form>
                        <div class="row border rounded py-2 mb-2">
                            <div class="col-12 col-sm-6 col-lg-3">
                                <label for="users-list-verified">تایید شده</label>
                                <fieldset class="form-group">
                                    <select class="form-control" id="users-list-verified">
                                        <option value="">همه</option>
                                        <option value="بله">بله</option>
                                        <option value="خیر">خیر</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-3">
                                <label for="users-list-role">نقش</label>
                                <fieldset class="form-group">
                                    <select class="form-control" id="users-list-role">
                                        <option value="">همه</option>
                                        <option value="کاربر">کاربر</option>
                                        <option value="کارمند">کارمند</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-3">
                                <label for="users-list-status">وضعیت</label>
                                <fieldset class="form-group">
                                    <select class="form-control" id="users-list-status">
                                        <option value="">همه</option>
                                        <option value="فعال">فعال</option>
                                        <option value="بسته شده">بسته شده</option>
                                        <option value="مسدود شده">مسدود شده</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div class="col-12 col-sm-6 col-lg-3 d-flex align-items-center">
                                <button type="reset" class="btn btn-primary btn-block glow users-list-clear mb-0 mt-75">پاکسازی</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="users-list-table">
                    <div class="card">
                        <div class="card-content">
                            <div class="card-body">
                                <!-- datatable start -->
                                <div class="table-responsive">
                                    <table id="users-list-datatable" class="table">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>نام کاربری</th>
                                            <th>نام</th>
                                            <th>آخرین فعالیت</th>
                                            <th>تایید شده</th>
                                            <th>نقش</th>
                                            <th>وضعیت</th>
                                            <th>ویرایش</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>300</td>
                                            <td><a href="page-users-view.html">dean3004</a>
                                            </td>
                                            <td>دنیل پانابکر</td>
                                            <td>1399/01/14</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>301</td>
                                            <td><a href="page-users-view.html">zeena0604</a>
                                            </td>
                                            <td>تونی استارک</td>
                                            <td>1399/01/15</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>302</td>
                                            <td><a href="page-users-view.html">delilah0301</a>
                                            </td>
                                            <td>استیو راجرز</td>
                                            <td>1399/01/16</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>303</td>
                                            <td><a href="page-users-view.html">hillary1807</a>
                                            </td>
                                            <td>پیتر پارکر</td>
                                            <td>1399/01/17</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>304</td>
                                            <td><a href="page-users-view.html">herman2003</a>
                                            </td>
                                            <td>سارا لنس</td>
                                            <td>1399/01/18</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>305</td>
                                            <td><a href="page-users-view.html">kuame3008</a>
                                            </td>
                                            <td>جان اسنو</td>
                                            <td>1399/01/19</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>306</td>
                                            <td><a href="page-users-view.html">fulton2009</a>
                                            </td>
                                            <td>امیلیا کلارک</td>
                                            <td>1399/01/20</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>307</td>
                                            <td><a href="page-users-view.html">piper0508</a>
                                            </td>
                                            <td>جسیکا آلبا</td>
                                            <td>1399/01/21</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>308</td>
                                            <td><a href="page-users-view.html">neil1002</a>
                                            </td>
                                            <td>کریستوفر نولان</td>
                                            <td>1399/01/22</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>309</td>
                                            <td><a href="page-users-view.html">caldwell2402</a>
                                            </td>
                                            <td>بروس وین</td>
                                            <td>1399/01/23</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>310</td>
                                            <td><a href="page-users-view.html">wesley0508</a>
                                            </td>
                                            <td>اولیور کویین</td>
                                            <td>1399/01/21</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>311</td>
                                            <td><a href="page-users-view.html">tallulah2009</a>
                                            </td>
                                            <td>بری الن</td>
                                            <td>1399/01/20</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>312</td>
                                            <td><a href="page-users-view.html">iris2505</a>
                                            </td>
                                            <td>هریسون ولز</td>
                                            <td>1399/01/24</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>313</td>
                                            <td><a href="page-users-view.html">caleb1504</a>
                                            </td>
                                            <td>لیونل مسی</td>
                                            <td>1399/01/25</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>314</td>
                                            <td><a href="page-users-view.html">illiana0410</a>
                                            </td>
                                            <td>کریس رونالدو</td>
                                            <td>1399/01/26</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>315</td>
                                            <td><a href="page-users-view.html">chester0902</a>
                                            </td>
                                            <td>جرارد پیکه</td>
                                            <td>1399/01/27</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>316</td>
                                            <td><a href="page-users-view.html">gregory2309</a>
                                            </td>
                                            <td>سرجیو راموس</td>
                                            <td>1399/01/28</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>317</td>
                                            <td><a href="page-users-view.html">jescie1802</a>
                                            </td>
                                            <td>زین الدین زیدان</td>
                                            <td>1399/01/29</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>318</td>
                                            <td><a href="page-users-view.html">sydney3101</a>
                                            </td>
                                            <td>Sydney Cabrera</td>
                                            <td>1399/01/30</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>319</td>
                                            <td><a href="page-users-view.html">gray2702</a>
                                            </td>
                                            <td>Gray Valenzuela</td>
                                            <td>1399/01/31</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-warning">بسته شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>320</td>
                                            <td><a href="page-users-view.html">hoyt0305</a>
                                            </td>
                                            <td>Hoyt Ellison</td>
                                            <td>1399/02/01</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>321</td>
                                            <td><a href="page-users-view.html">damon0209</a>
                                            </td>
                                            <td>Damon Berry</td>
                                            <td>1399/02/02</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>322</td>
                                            <td><a href="page-users-view.html">kelsie0511</a>
                                            </td>
                                            <td>Kelsie Dunlap</td>
                                            <td>1399/02/03</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-warning">بسته شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>323</td>
                                            <td><a href="page-users-view.html">abel1606</a>
                                            </td>
                                            <td>Abel Dunn</td>
                                            <td>1399/02/04</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>324</td>
                                            <td><a href="page-users-view.html">nina2208</a>
                                            </td>
                                            <td>Nina Byers</td>
                                            <td>1399/02/05</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-warning">بسته شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>325</td>
                                            <td><a href="page-users-view.html">erasmus1809</a>
                                            </td>
                                            <td>Erasmus Walter</td>
                                            <td>1399/02/06</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>326</td>
                                            <td><a href="page-users-view.html">yael2612</a>
                                            </td>
                                            <td>Yael Marshall</td>
                                            <td>1399/02/07</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-warning">بسته شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>327</td>
                                            <td><a href="page-users-view.html">thomas2012</a>
                                            </td>
                                            <td>Thomas Dudley</td>
                                            <td>1399/02/08</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>328</td>
                                            <td><a href="page-users-view.html">althea2810</a>
                                            </td>
                                            <td>Althea Turner</td>
                                            <td>1399/02/09</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>329</td>
                                            <td><a href="page-users-view.html">jena2206</a>
                                            </td>
                                            <td>Jena Schroeder</td>
                                            <td>1399/02/10</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>330</td>
                                            <td><a href="page-users-view.html">hyacinth2201</a>
                                            </td>
                                            <td>Hyacinth Maxwell</td>
                                            <td>1399/02/11</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>331</td>
                                            <td><a href="page-users-view.html">madeson1907</a>
                                            </td>
                                            <td>Madeson Byers</td>
                                            <td>1399/02/12</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>332</td>
                                            <td><a href="page-users-view.html">elmo0707</a>
                                            </td>
                                            <td>Elmo Tran</td>
                                            <td>1399/02/13</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>333</td>
                                            <td><a href="page-users-view.html">shelley0309</a>
                                            </td>
                                            <td>Shelley Eaton</td>
                                            <td>1399/02/14</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>334</td>
                                            <td><a href="page-users-view.html">graham0301</a>
                                            </td>
                                            <td>Graham Flores</td>
                                            <td>1399/02/15</td>
                                            <td>خیر</td>
                                            <td>کارمند</td>
                                            <td><span class="badge badge-light-danger">مسدود شده</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>335</td>
                                            <td><a href="page-users-view.html">erasmus2110</a>
                                            </td>
                                            <td>Erasmus Mclaughlin</td>
                                            <td>1399/02/16</td>
                                            <td>بله</td>
                                            <td>کاربر </td>
                                            <td><span class="badge badge-light-success">فعال</span></td>
                                            <td><a href="page-users-edit.html"><i class="bx bx-edit-alt"></i></a></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- datatable ends -->
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- users list ends -->
        </div>
    </div>
</div>
<!-- END: Content-->


<!-- BEGIN: Customizer-->
<div class="customizer d-none d-md-block"><a class="customizer-close" href="#"><i class="bx bx-x"></i></a><a class="customizer-toggle" href="#"><i class="bx bx-cog bx bx-spin white"></i></a><div class="customizer-content p-2">
        <h4 class="text-uppercase mb-0 mt-n50">سفارشی سازی قالب</h4>
        <small>سفارشی سازی کنید و به صورت زنده مشاهده کنید.</small>
        <hr>
        <!-- Theme options starts -->
        <h5 class="mt-n25">طرح قالب</h5>
        <div class="theme-layouts">
            <div class="d-flex justify-content-start">
                <div class="mx-50">
                    <fieldset>
                        <div class="radio">
                            <input type="radio" name="layoutOptions" value="false" id="radio-light" class="layout-name" data-layout="" checked>
                            <label for="radio-light">روشن</label>
                        </div>
                    </fieldset>
                </div>
                <div class="mx-50">
                    <fieldset>
                        <div class="radio">
                            <input type="radio" name="layoutOptions" value="false" id="radio-dark" class="layout-name" data-layout="dark-layout">
                            <label for="radio-dark">تیره</label>
                        </div>
                    </fieldset>
                </div>
                <div class="mx-50">
                    <fieldset>
                        <div class="radio">
                            <input type="radio" name="layoutOptions" value="false" id="radio-semi-dark" class="layout-name" data-layout="semi-dark-layout">
                            <label for="radio-semi-dark">نیمه تیره</label>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
        <!-- Theme options starts -->
        <hr>

        <!-- Menu Colors Starts -->
        <div id="customizer-theme-colors">
            <h5>رنگ های فهرست</h5>
            <ul class="list-inline unstyled-list">
                <li class="color-box bg-primary selected" data-color="theme-primary"> </li>
                <li class="color-box bg-success" data-color="theme-success"> </li>
                <li class="color-box bg-danger" data-color="theme-danger"> </li>
                <li class="color-box bg-info" data-color="theme-info"> </li>
                <li class="color-box bg-warning" data-color="theme-warning"> </li>
                <li class="color-box bg-dark" data-color="theme-dark"> </li>
            </ul>
            <hr>
        </div>
        <!-- Menu Colors Ends -->
        <!-- Menu Icon Animation Starts -->
        <div id="menu-icon-animation">
            <div class="d-flex justify-content-between align-items-center">
                <div class="icon-animation-title">
                    <h5 class="pt-25">انیمیشن آیکن ها</h5>
                </div>
                <div class="icon-animation-switch">
                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" checked id="icon-animation-switch">
                        <label class="custom-control-label" for="icon-animation-switch"></label>
                    </div>
                </div>
            </div>
            <hr>
        </div>
        <!-- Menu Icon Animation Ends -->
        <!-- Collapse sidebar switch starts -->
        <div class="collapse-sidebar d-flex justify-content-between align-items-center">
            <div class="collapse-option-title">
                <h5 class="pt-25">جمع کردن فهرست</h5>
            </div>
            <div class="collapse-option-switch">
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="collapse-sidebar-switch">
                    <label class="custom-control-label" for="collapse-sidebar-switch"></label>
                </div>
            </div>
        </div>
        <!-- Collapse sidebar switch Ends -->
        <hr>

        <!-- Navbar colors starts -->
        <div id="customizer-navbar-colors">
            <h5>رنگ های نوار بالایی</h5>
            <ul class="list-inline unstyled-list">
                <li class="color-box bg-white border selected" data-navbar-default=""> </li>
                <li class="color-box bg-primary" data-navbar-color="bg-primary"> </li>
                <li class="color-box bg-success" data-navbar-color="bg-success"> </li>
                <li class="color-box bg-danger" data-navbar-color="bg-danger"> </li>
                <li class="color-box bg-info" data-navbar-color="bg-info"> </li>
                <li class="color-box bg-warning" data-navbar-color="bg-warning"> </li>
                <li class="color-box bg-dark" data-navbar-color="bg-dark"> </li>
            </ul>
            <small><strong>نکته :</strong> این گزینه تنها در حالت نوار ثابت و در هنگام اسکرول صفحه نمایش داده خواهد شد.</small>
            <hr>
        </div>
        <!-- Navbar colors starts -->
        <!-- Navbar Type Starts -->
        <h5 class="mt-n25">نوع نوار بالایی</h5>
        <div class="navbar-type d-flex justify-content-start">
            <div class="hidden-ele mx-50">
                <fieldset>
                    <div class="radio">
                        <input type="radio" name="navbarType" value="false" id="navbar-hidden">
                        <label for="navbar-hidden">مخفی</label>
                    </div>
                </fieldset>
            </div>
            <div class="mx-50">
                <fieldset>
                    <div class="radio">
                        <input type="radio" name="navbarType" value="false" id="navbar-static">
                        <label for="navbar-static">ایستا</label>
                    </div>
                </fieldset>
            </div>
            <div class="mx-50">
                <fieldset>
                    <div class="radio">
                        <input type="radio" name="navbarType" value="false" id="navbar-sticky" checked>
                        <label for="navbar-sticky">ثابت</label>
                    </div>
                </fieldset>
            </div>
        </div>
        <hr>
        <!-- Navbar Type Starts -->

        <!-- Footer Type Starts -->
        <h5 class="mt-n25">نوع فوتر</h5>
        <div class="footer-type d-flex justify-content-start">
            <div class="mx-50">
                <fieldset>
                    <div class="radio">
                        <input type="radio" name="footerType" value="false" id="footer-hidden">
                        <label for="footer-hidden">مخفی</label>
                    </div>
                </fieldset>
            </div>
            <div class="mx-50">
                <fieldset>
                    <div class="radio">
                        <input type="radio" name="footerType" value="false" id="footer-static" checked>
                        <label for="footer-static">ایستا</label>
                    </div>
                </fieldset>
            </div>
            <div class="mx-50">
                <fieldset>
                    <div class="radio">
                        <input type="radio" name="footerType" value="false" id="footer-sticky">
                        <label for="footer-sticky" class="">چسبان</label>
                    </div>
                </fieldset>
            </div>
        </div>
        <!-- Footer Type Ends -->
        <hr>

        <!-- Card Shadow Starts-->
        <div class="card-shadow d-flex justify-content-between align-items-center py-25">
            <div class="hide-scroll-title">
                <h5 class="pt-25">سایه کارت</h5>
            </div>
            <div class="card-shadow-switch">
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="card-shadow-switch">
                    <label class="custom-control-label" for="card-shadow-switch"></label>
                </div>
            </div>
        </div>
        <!-- Card Shadow Ends-->
        <hr>

        <!-- Hide Scroll To Top Starts-->
        <div class="hide-scroll-to-top d-flex justify-content-between align-items-center py-25">
            <div class="hide-scroll-title">
                <h5 class="pt-25">مخفی سازی دکمه اسکرول به بالا</h5>
            </div>
            <div class="hide-scroll-top-switch">
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="hide-scroll-top-switch">
                    <label class="custom-control-label" for="hide-scroll-top-switch"></label>
                </div>
            </div>
        </div>
        <!-- Hide Scroll To Top Ends-->
    </div>
</div>
<!-- End: Customizer-->

<!-- Buynow Button-->
<div class="buy-now"><a href="#" target="_blank" class="btn btn-danger">ارتباط با ما</a>

</div>
<!-- demo chat-->
<div class="widget-chat-demo"><!-- widget chat demo footer button start -->
    <button class="btn btn-primary chat-demo-button glow px-1"><i class="livicon-evo" data-options="name: comments.svg; style: lines; size: 24px; strokeColor: #fff; autoPlay: true; repeat: loop;"></i></button>
    <!-- widget chat demo footer button ends -->
    <!-- widget chat demo start -->
    <div class="widget-chat widget-chat-demo d-none">
        <div class="card mb-0">
            <div class="card-header border-bottom p-0">
                <div class="media m-75">
                    <a href="JavaScript:void(0);">
                        <div class="avatar mr-75">
                            <img src="{{adminTheme("images/portrait/small/avatar-s-2.jpg")}}" alt="avtar images" width="32" height="32">
                            <span class="avatar-status-online"></span>
                        </div>
                    </a>
                    <div class="media-body">
                        <h6 class="media-heading mb-0 mt-n25"><a href="javaScript:void(0);">جان اسنو</a></h6>
                        <span class="text-muted font-small-3">فعال</span>
                    </div>
                    <i class="bx bx-x widget-chat-close float-right my-auto cursor-pointer"></i>
                </div>
            </div>
            <div class="card-body widget-chat-container widget-chat-demo-scroll">
                <div class="chat-content">
                    <div class="badge badge-pill badge-light-secondary my-1">امروز</div>
                    <div class="chat">
                        <div class="chat-body">
                            <div class="chat-message">
                                <p>How can we help? 😄</p>
                                <span class="chat-time">7:45 ق.ظ</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat chat-left">
                        <div class="chat-body">
                            <div class="chat-message">
                                <p>Hey John, I am looking for the best admin template.</p>
                                <p>Could you please help me to find it out? 🤔</p>
                                <span class="chat-time">7:50 ق.ظ</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat">
                        <div class="chat-body">
                            <div class="chat-message">
                                <p>Stack admin is the responsive bootstrap 4 admin template.</p>
                                <span class="chat-time">8:01 ق.ظ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer border-top p-1">
                <form class="d-flex" onsubmit="widgetChatMessageDemo();" action="javascript:void(0);">
                    <input type="text" class="form-control chat-message-demo mr-75" placeholder="اینجا بنویسید ...">
                    <button type="submit" class="btn btn-primary glow px-1"><i class="bx bx-paper-plane"></i></button>
                </form>
            </div>
        </div>
    </div>
    <!-- widget chat demo ends -->

</div>
<div class="sidenav-overlay"></div>
<div class="drag-target"></div>

<!-- BEGIN: Footer-->
<footer class="footer footer-static footer-light">
    <p class="clearfix mb-0"><span class="float-left d-inline-block">ارائه شده در وب‌سایت <a href="https://www.rtl-theme.com" target="_blank">راست‌چین</a></span><span class="float-right d-sm-inline-block d-none">ساخته شده با<i class="bx bxs-heart pink ml-50 font-small-3"></i></span>
        <button class="btn btn-primary btn-icon scroll-top" type="button"><i class="bx bx-up-arrow-alt"></i></button>
    </p>
</footer>
<!-- END: Footer-->




</body>
<!-- END: Body-->
</html>
