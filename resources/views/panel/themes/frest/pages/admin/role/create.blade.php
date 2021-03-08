@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "افزودن دسترسی جدید")
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
                        <div class="card card-flat">

                            <div class="card-body">
                                <div class="card-title">
                                    <h6>{{$title}}</h6>

                                </div>
                                <form action="{{route("admin.role.store")}}" method="post">
                                    @csrf
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="display_name"
                                                       placeholder="نام فارسی (ادمین)">

                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="name"
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
                                                            <div class="form-check">
                                                                <input type="checkbox" class="form-check-input checkAll" id="control-custom"
                                                                       name="permissions[]" value="{{$permission->id}}" onclick="toggle(this,{{$permission->childrenIds}})">
                                                                <label class="form-check-label">{{$permission->display_name}}</label>
                                                            </div>
{{--                                                            <div class="checkbox">--}}
{{--                                                                <fieldset>--}}
{{--                                                                    --}}

{{--                                                                    <div class="checkbox checkbox-success checkbox-icon">--}}
{{--                                                                        <input type="checkbox" id="control-custom" name="permissions[]" value="{{$permission->id}}">--}}
{{--                                                                        <label for="checkboxIcon3"><i class="bx bx-x"></i>{{$permission->display_name}}</label>--}}
{{--                                                                    </div>--}}
{{--                                                                </fieldset>--}}

{{--                                                            </div>--}}
                                                            @foreach($permission->children as $child)
                                                                <div class="form-check">
                                                                    <input type="checkbox" class="form-check-input checkAll"
                                                                           name="permissions[]" value="{{$child->id}}" id="{{$child->id}}">
                                                                    <label class="form-check-label">{{$child->display_name}}</label>
                                                                </div>
{{--                                                                <div class="checkbox">--}}
{{--                                                                    <fieldset>--}}
{{--                                                                        <div class="checkbox checkbox-success checkbox-icon">--}}
{{--                                                                            <input type="checkbox" id="control-custom" name="permissions[]" value="{{$child->id}}">--}}
{{--                                                                            <label for="checkboxIcon3"><i class="bx bx-x"></i>{{$child->display_name}}</label>--}}
{{--                                                                        </div>--}}
{{--                                                                    </fieldset>--}}

{{--                                                                </div>--}}
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
                                        <button type="submit" class="btn btn-lg btn-primary ">افزودن دسترسی جدید</button>
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
    function toggle(source,children) {
        for(var i=0, n=children.length;i<n;i++) {
            childId=children[i]
            checkbox = document.getElementById(childId);
            checkbox.checked = source.checked;
        }
    }
</script>
@endsection
