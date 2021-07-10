<!-- BEGIN: Main Menu-->
@php($Permissions = \App\Models\Permission::query()->where('is_menu',1)->get())

<div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
    <div class="navbar-header">
        <ul class="nav navbar-nav flex-row">
            <li class="nav-item mr-auto"><a class="navbar-brand"
                                            href="{{url('/')}}">
                    <div class="brand-logo"><img class="logo" src="{{adminTheme("images/logo/logo.png")}}"></div>
                    <h2 class="brand-text mb-0">{{setting("title")}}</h2></a></li>
            <li class="nav-item nav-toggle">
                <a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse">
                    <i class="toggle-icon bx bx-disc font-medium-4 d-none d-xl-block collapse-toggle-icon primary" style="display: block !important;visibility: visible !important;"
                       data-ticon="bx-disc"></i>
                </a></li>
        </ul>
    </div>
    <div class="shadow-bottom"></div>
    <div class="main-menu-content">

        <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation" data-icon-style="">

            <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation"
                data-icon-style="">
                @php($menus=\App\Models\Permission::isParent()->isMenu()->get())


                @foreach($menus as $menu)

                    @if(auth()->user()->can($menu->name))
                        @php($subMenus=\App\Models\Permission::parentId($menu->id)->isMenu()->get())
                        <li class="nav-item {{activeAdminMenu($menu->name)}}" ><a href="{{route($menu->name)}}" style="
    margin: 7px 0;
    padding: 10px 10px;
    line-height: 2;"><i class="bx {{$menu->icon}}"></i><span
                                    class="menu-title"
                                >{{$menu->display_name}}</span></a>
                            @if(sizeof($subMenus))
                                <ul class="menu-content">
                                    <li class=" nav-item {{activeAdminMenu($menu->name)}}"><a href="{{route($menu->name)}}"><i
                                                class="bx {{$menu->icon}}"></i><span
                                                class="menu-title"
                                            >{{$menu->display_name}}</span></a>
                                    @foreach($subMenus as $subMenu)

                                        <li class=" nav-item"><a href="{{route($subMenu->name)}}"><i
                                                    class="bx {{$subMenu->icon}}"></i><span
                                                    class="menu-title"
                                                    data-i18n="User">{{$subMenu->display_name}}</span></a>
                                        </li>

                                    @endforeach

                                </ul>
                            @endif
                        </li>



                    @endif



                @endforeach


            </ul>
    </div>
</div>

<!-- END: Main Menu-->
