@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "ویرایش دسترسی")
@section("content")

    <div class="content-wrapper" style="padding: 0px;margin: 0px;border-top: 1px solid #ccc;">
        <div class="row col-12" id="headerContent">
            <div id="breadCrumb" style="width: 100%" class="activeCrumb">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12" style="marginbottom: 5; margin-top: 5px; line-height: 2.3">
                            <span id="title">سطح دسترسی کاربران</span>
                            <span id="icon">
                        <a style="float: right" href="/dashboard"><i
                                style="float: right;margin: 5px;font-size: 22px;color: #727e8c;"
                                class="bx bxs-home"></i> <span
                                style="color: #727e8c">پیشخوان</span> </a>
                    </span
                            <span id="icon">
                        <a>
                            <i style="font-size: 25px;margin-top: 5px;" class="bx bx-chevron-left"></i>
                        </a>

                            </span>
                            <span id="icon">
                        <a>ویرایش دسترسی</a>
                    </span>
                            <span id="icon">
                        <a>
                            <i style="font-size: 25px;margin-top: 5px;" class="bx bx-chevron-left"></i>
                        </a>

                            </span>
                            <span id="icon">
                        <a>ویرایش دسترسی</a>
                    </span>

                            <button id="show-loader-selected" style="float : left" href="{{ url('/roles/create') }}"
                                    class="btn btn-primary shadow mr-1 mb-1"><i class="bx bx-plus"></i>&nbsp; افزودن
                                &nbsp;
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="content-body col-12" style="margin-top : 15px">
            <div class="card height-auto" style="border-radius: 5px !important;">
                <div class="card-body">

                    <div class="card-title">
                        <h6>{{$title}}</h6>
                    </div>
                    <form action="{{route("roles.update" , ["roleId"=>$data['role']->id])}}" method="post">
                        @method("PUT")
                        @csrf
                        <input type="hidden" name="id" value="{{$data['role']->id}}">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="display_name"
                                           value="{{$data['role']->display_name}}"
                                           placeholder="نام فارسی (ادمین)">
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="name"
                                           value="{{$data['role']->name}}"
                                           placeholder="نام لاتین (admin)">
                                </div>
                            </div>
                        </div>
                        <div class="row" style="width: 100% ;padding: 0px ;margin: 0px">

                            @foreach($data['permissions'] as $permission)
                                <div class="col-md-6" style="min-height: 100px">
                                    <div class="permitionbox">
                                        <div class="lineeeeee"></div>
                                        <fieldset>
                                            <div class="checkbox">
                                                <input type="checkbox"
                                                       style="z-index: 99"
                                                       class="checkbox-input checkAll"
                                                       {{in_array($permission->id , $data['rolePermissions'])?"checked":""}} onclick="toggle(this,{{$permission->childrenIds}})"
                                                       name="permissions[]" value="{{$permission->id}}">
                                                <label
                                                    style="font-size: 16px;line-height: 1.5;background: #fff"
                                                    for="{{$permission->id}}">{{$permission->display_name}}</label>
                                            </div>
                                        </fieldset>
                                        <div
                                            style="padding-right: 27px;font-size: 15px !important;position: relative">
                                            @foreach($permission->children as $child)
                                                <fieldset style="position:relative;">
                                                    <div class="lineeeeeeChild"></div>
                                                    <div class="checkbox">
                                                        <input type="checkbox"
                                                               id="{{$child->id}}"
                                                               class="checkbox-input checkAll"
                                                               {{in_array($child->id , $data['rolePermissions'])?"checked":""}}
                                                               name="permissions[]"
                                                               value="{{$child->id}}">
                                                        <label
                                                            style="font-size: 13px;background: #fff"
                                                            for="{{$child->id}}"
                                                            class="form-check-label">{{$child->display_name}}</label>
                                                    </div>
                                                </fieldset>
                                            @endforeach
                                        </div>
                                    </div>
                                </div>
                                {{--<div class="col-md-4">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" class="control-custom" name="permissions[]" value="{{$permission->id}}">
                                            {{$permission->display_name}}
                                        </label>
                                    </div>
                                </div>--}}

                            @endforeach
                        </div>


                        <div class="text-right">
                            <button type="submit" class="btn btn-lg btn-primary ">ثبت</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    </div>
    </div>
    </div>


@endsection
@section("pageScripts")
    <script>
        function toggle(source, children) {
            for (var i = 0, n = children.length; i < n; i++) {
                childId = children[i].id
                checkbox = document.getElementById(childId);
                checkbox.checked = source.checked;
            }

        }
    </script>
    <script type="text/javascript" src="{{adminTheme("lib/js/plugins/forms/styling/uniform.min.js")}}"></script>
    <script type="text/javascript" src="{{adminTheme("lib/js/plugins/forms/styling/switchery.min.js")}}"></script>
    <script type="text/javascript" src="{{adminTheme("lib/js/plugins/forms/styling/switch.min.js")}}"></script>
    <script type="text/javascript" src="{{adminTheme("lib/js/pages/form_checkboxes_radios.js")}}"></script>
    <script type="text/javascript" src="{{adminTheme("lib/js/plugins/ui/ripple.min.js")}}"></script>

@endsection
