<!-- BEGIN: Main Menu-->
@php($Permissions = \App\Models\Permission::query()->where('is_menu',1)->get())

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



            <li class=" navigation-header"><span>صفحات</span>
            </li>
            <li class=" nav-item"><a href="page-user-profile.html"><i class="bx bx-user"></i><span class="menu-title" data-i18n="User Profile">پروفایل کاربر</span></a>
            </li>

            <li class=" nav-item"><a href="#"><i class="bx bx-user-plus"></i><span class="menu-title" data-i18n="User">کاربران</span></a>
                <ul class="menu-content">
                    <li class="active"><a href="{{route('admin.user.index')}}"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="List">لیست</span></a>
                    </li>
                    <li><a href="{{route('admin.user.create')}}"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="View">افزودن</span></a>
                    </li>
                    <li>

                        <a href="{{route('admin.role.index')}}">

{{--                            //FIXME--}}
{{--                            //route('admin.user.edit',auth()->id)--}}
                            <i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="Edit">دسترسی ها</span></a>
                    </li>
                </ul>
            </li>



        </ul>
    </div>
</div>
<!-- END: Main Menu-->
