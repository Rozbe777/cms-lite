<!-- BEGIN: Main Menu-->
@php($Permissions = \App\Models\Permission::query()->where('is_menu',1)->get())

<div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
    <div class="navbar-header">
        <ul class="nav navbar-nav flex-row">
            <li class="nav-item mr-auto"><a class="navbar-brand"
                                            href="../../html/vertical-menu-boxicons-template/index.html">
                    <div class="brand-logo"><img class="logo" src="{{adminTheme("images/logo/logo.png")}}"></div>
                    <h2 class="brand-text mb-0">Frest</h2></a></li>
            <li class="nav-item nav-toggle"><a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse"><i
                        class="bx bx-x d-block d-xl-none font-medium-4 primary toggle-icon"></i><i
                        class="toggle-icon bx bx-disc font-medium-4 d-none d-xl-block collapse-toggle-icon primary"
                        data-ticon="bx-disc"></i></a></li>
        </ul>
    </div>
    <div class="shadow-bottom"></div>
    <div class="main-menu-content">
        <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation" data-icon-style="">
            @php($menus=\App\Models\Permission::isParent()->isMenu()->get())


            @foreach($menus as $menu)

                @if(auth()->user()->can($menu->name))

                    <li class=" nav-item"><a href="{{route($menu->name)}}"><i class="bx {{$menu->icon}}"></i><span
                                class="menu-title"
                            >{{$menu->display_name}}</span></a>
@dump($menu->children)
                        {{--            <ul class="menu-content">
                                        @foreach($childrenMenus as $subMenu)
                                            @php($subChildrenMenus=$subMenu->childrenMenu)
                                            @if($subChildrenMenus->count()>1)
                                                <li class=" nav-item"><a href="#"><i class="bx {{$subMenu->icon}}"></i><span
                                                            class="menu-title"
                                                            data-i18n="User">{{$subMenu->display_name}}</span></a>
                                                    <ul class="menu-content">
                                                        @foreach($subChildrenMenus as $childSubMenu)

                                                            <li class="{{Route::current()->getName() == $childSubMenu->name ?"active" : ""}}">
                                                                <a href="{{route("$childSubMenu->name")}}"><i
                                                                        class="bx bx-left-arrow-alt"></i><span class="menu-item"
                                                                                                               data-i18n="List">{{$childSubMenu->display_name}}</span></a>
                                                            </li>
                                                        @endforeach
                                                    </ul>

                                                </li>
                                            @elseif($subChildrenMenus->count()>0)
                                                @foreach($subChildrenMenus as $childSubMenu)
                                                    @if(auth()->user()->can($childSubMenu->name))

                                                        <li class="{{Route::current()->getName() == $childSubMenu->name ?"active" : ""}} nav-item">
                                                            <a href="{{route("$childSubMenu->name")}}"><i
                                                                    class="bx bx-user"></i><span class="menu-title"
                                                                                                 data-i18n="User Profile">{{$subMenu->display_name}}</span></a>
                                                        </li>
                                                    @endif
                                                @endforeach
                                            @else
                                                @if(auth()->user()->can($subMenu->name))
                                                    <li class="{{Route::current()->getName() == $subMenu->name ?"active" : ""}}">
                                                        <a href="{{route("$subMenu->name")}}"><i
                                                                class="bx bx-left-arrow-alt"></i><span class="menu-item"
                                                                                                       data-i18n="List">{{$subMenu->display_name}}</span></a>
                                                    </li>
                                                @endif

                                            @endif


                                        @endforeach

                                    </ul>--}}
                    </li>



                @endif



            @endforeach


        </ul>
    </div>
</div>
<!-- END: Main Menu-->
