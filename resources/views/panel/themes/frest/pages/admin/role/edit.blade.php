@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "ویرایش دسترسی")
@section("content")

    <div class="content-wrapper">
        <div class="content-header row">
            <div class="content-body">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card panel-flat">


                            <div class="card-body">
                                <div class="card-title">
                                    <h6>{{$title}}</h6>
                                </div>
                                <form action="{{route("admin.role.update" , ["role"=>$role->id])}}" method="post">
                                    @method("PUT")
                                    @csrf
                                    <input type="hidden" name="id" value="{{$role->id}}">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="display_name"
                                                       value="{{$role->display_name}}" placeholder="نام فارسی (ادمین)">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="name" value="{{$role->name}}"
                                                       placeholder="نام لاتین (admin)">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 row ">
                                            @foreach($permissions as $permission)
                                                <div class="col-md-6" style="min-height: 100px">
                                                    <div class="">
                                                        <h5 class="panel-title"> {{$permission->display_name}}</h5>

                                                        <div class="">
                                                            <div class="checkbox">
                                                                <label>
                                                                    <input {{in_array($permission->id , $rolePermissions)?"checked":""}} type="checkbox"
                                                                           class="control-custom"
                                                                           name="permissions[]" value="{{$permission->id}}">
                                                                    {{$permission->display_name}}
                                                                </label>
                                                            </div>
                                                            @foreach($permission->children as $child)
                                                                <div class="checkbox">
                                                                    <label>
                                                                        <input {{in_array($child->id , $rolePermissions)?"checked":""}} type="checkbox"
                                                                               class="control-custom"
                                                                               name="permissions[]" value="{{$child->id}}">
                                                                        {{$child->display_name}}
                                                                    </label>
                                                                </div>
                                                            @endforeach
                                                        </div>
                                                    </div>
                                                    <hr/>
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
@section("scripts")
    <script type="text/javascript" src="{{adminTheme("lib/js/plugins/forms/styling/uniform.min.js")}}"></script>
    <script type="text/javascript" src="{{adminTheme("lib/js/plugins/forms/styling/switchery.min.js")}}"></script>
    <script type="text/javascript" src="{{adminTheme("lib/js/plugins/forms/styling/switch.min.js")}}"></script>
    <script type="text/javascript" src="{{adminTheme("lib/js/pages/form_checkboxes_radios.js")}}"></script>
    <script type="text/javascript" src="{{adminTheme("lib/js/plugins/ui/ripple.min.js")}}"></script>
@endsection
