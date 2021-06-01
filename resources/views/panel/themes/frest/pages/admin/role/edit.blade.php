@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "ویرایش دسترسی")
@section("content")

    <div class="content-wrapper">
        @if($errors->any())
            <script>
                updateProfileError("{!! $errors->first() !!}");
            </script>
        @endif
        <div class="content-header row">
            <div class="content-body col-12">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card panel-flat">


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
                                    <div class="row">
                                        <div style="width: 100% ;padding: 0px ;margin: 0px" class="row">
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
                                                            <div style="padding-right: 27px;font-size: 15px !important;position: relative">
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
                                                                    </fieldset>>
                                                                @endforeach
                                                            </div>
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
    <script type="text/javascript" src="{{adminTheme("lib/js/plugins/forms/styling/uniform.min.js")}}"></script>
    <script type="text/javascript" src="{{adminTheme("lib/js/plugins/forms/styling/switchery.min.js")}}"></script>
    <script type="text/javascript" src="{{adminTheme("lib/js/plugins/forms/styling/switch.min.js")}}"></script>
    <script type="text/javascript" src="{{adminTheme("lib/js/pages/form_checkboxes_radios.js")}}"></script>
    <script type="text/javascript" src="{{adminTheme("lib/js/plugins/ui/ripple.min.js")}}"></script>
    <script>
        function toggle(source, children) {
            for (var i = 0, n = children.length; i < n; i++) {
                childId = children[i]
                checkbox = document.getElementById(childId);
                checkbox.checked = source.checked;
            }
        }
    </script>
@endsection
