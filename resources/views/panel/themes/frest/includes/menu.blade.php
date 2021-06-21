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


            {{--            @php($parents=\App\Models\Permission::where(['parent_id'=>0,'is_menu'=>1])->get())--}}

            {{--            <li class=" navigation-header"><span>صفحات</span>--}}
            {{--            </li>--}}

            {{--            @foreach($parents as $parent)--}}
            {{--                --}}
            {{--                @if(auth()->user()->can($parent->name))--}}

            {{--                    @php($childrenMenus=$parent->childrenMenu)--}}
            {{--                    @if($childrenMenus->count()>1)--}}

            {{--                        <li class=" nav-item"><a href="#"><i class="bx {{$parent->icon}}"></i><span class="menu-title" data-i18n="User">{{$parent->display_name}}</span></a>--}}
            {{--                            <ul class="menu-content">--}}
            {{--                                @foreach($childrenMenus as $subMenu)--}}
            {{--                                    @php($subChildrenMenus=$subMenu->childrenMenu)--}}
            {{--                                    @if($subChildrenMenus->count()>1)--}}
            {{--                                        <li class=" nav-item"><a href="#"><i class="bx {{$subMenu->icon}}"></i><span class="menu-title" data-i18n="User">{{$subMenu->display_name}}</span></a>--}}
            {{--                                            <ul class="menu-content">--}}
            {{--                                                @foreach($subChildrenMenus as $childSubMenu)--}}

            {{--                                                    <li class="{{Route::current()->getName() == $childSubMenu->name ?"active" : ""}}"><a href="{{route("$childSubMenu->name")}}"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="List">{{$childSubMenu->display_name}}</span></a>--}}
            {{--                                                    </li>--}}
            {{--                                                @endforeach--}}
            {{--                                            </ul>--}}

            {{--                                        </li>--}}
            {{--                                    @elseif($subChildrenMenus->count()>0)--}}
            {{--                                        @foreach($subChildrenMenus as $childSubMenu)--}}
            {{--                                            @if(auth()->user()->can($childSubMenu->name))--}}

            {{--                                                <li class="{{Route::current()->getName() == $childSubMenu->name ?"active" : ""}} nav-item"><a href="{{route("$childSubMenu->name")}}"><i class="bx bx-user"></i><span class="menu-title" data-i18n="User Profile">{{$subMenu->display_name}}</span></a>--}}
            {{--                                                </li>--}}
            {{--                                            @endif--}}
            {{--                                        @endforeach--}}
            {{--                                    @else--}}
            {{--                                        @if(auth()->user()->can($subMenu->name))--}}
            {{--                                            <li class="{{Route::current()->getName() == $subMenu->name ?"active" : ""}}"><a href="{{route("$subMenu->name")}}"><i class="bx bx-left-arrow-alt"></i><span class="menu-item" data-i18n="List">{{$subMenu->display_name}}</span></a>--}}
            {{--                                            </li>--}}
            {{--                                        @endif--}}

            {{--                                    @endif--}}


            {{--                                @endforeach--}}

            {{--                            </ul>--}}
            {{--                        </li>--}}
            {{--                    @else--}}
            {{--                        @foreach($childrenMenus as $subMenu)--}}
            {{--                            @if(auth()->user()->can($subMenu->name))--}}

            {{--                                <li class="{{Route::current()->getName() == $subMenu->name ?"active" : ""}} nav-item"><a href="{{route("$subMenu->name")}}"><i class="bx bx-user"></i><span class="menu-title" data-i18n="User Profile">{{$parent->display_name}}</span></a>--}}
            {{--                                </li>--}}
            {{--                            @endif--}}
            {{--                        @endforeach--}}


            {{--                    @endif--}}

            {{--                @endif--}}

            {{--            @endforeach--}}





            {{--        </ul>--}}


            <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation"
                data-icon-style="">
                @php($menus=\App\Models\Permission::isParent()->isMenu()->get())


                @foreach($menus as $menu)

                    @if(auth()->user()->can($menu->name))
                        @php($subMenus=\App\Models\Permission::parentId($menu->id)->isMenu()->get())
                        <li class="nav-item"><a href="{{route($menu->name)}}" style="
    margin: 5px 0;
    padding: 10px 10px;
    line-height: 2;"><i class="bx {{$menu->icon}}"></i><span
                                    class="menu-title"
                                >{{$menu->display_name}}</span></a>
                            @if(sizeof($subMenus))
                                <ul class="menu-content">
                                    <li class=" nav-item"><a href="{{route($menu->name)}}"><i
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
