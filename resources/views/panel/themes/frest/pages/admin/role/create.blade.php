@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "افزودن دسترسی جدید")
@section("content")
    <div class="content-wrapper" style="padding: 0px;margin: 0px;border-top: 1px solid #eee;">
        @if($errors->any())
            <script>
                updateProfileError("{!! $errors->first() !!}");
            </script>
        @endif

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
                    </span>

                                <span id="icon">
                                <a>
                                    <i style="font-size: 25px;margin-top: 5px;" class="bx bx-chevron-left"></i>
                                </a>
                            </span>

                                <span id="icon">
                                <a href="/roles"><span style="color: #727e8c">دسترسی ها</span></a>
                            </span>

                                <span id="icon">
                                <a>
                                    <i style="font-size: 25px;margin-top: 5px;" class="bx bx-chevron-left"></i>
                                </a>
                            </span>

                                <span id="icon">
                                 <a>افزودن دسترسی</a>
                             </span>


                            </div>
                        </div>
                    </div>

                </div>
            </div>



        <div class="content-header row" style="margin: 20px 5px">
            <div class="content-body col-12">
                <div class="row">

                    <div class="col-lg-12">
                        <div class="card card-flat" style="border-radius: 5px !important;">

                            <div class="card-body">
                                <div class="card-title">
                                    <h6>{{$title}}</h6>

                                </div>
                                <form method="post">
                                    @csrf
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="display_name"
                                                       required
                                                       placeholder="نام فارسی (ادمین)">

                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="name"
                                                       required
                                                       placeholder="نام لاتین (admin)">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div style="width: 100% ;padding: 0px ;margin: 0px" class="row">
                                            @foreach($data as $permission)
                                                <div class="col-md-6" style="min-height: 100px">
                                                    <div class="permitionbox">
                                                        <div class="lineeeeee"></div>
                                                        <fieldset>
                                                            <div class="checkbox">
                                                                <input type="checkbox"
                                                                       style="z-index: 99"
                                                                       class="checkbox-input checkAll"
                                                                       id="{{$permission->id}}"
                                                                       value="{{$permission->id}}"
                                                                       name="permissions[]"
                                                                       onclick="toggle(this,{{$permission->children}})">
                                                                <label style="font-size: 16px;line-height: 1.5;background: #fff"
                                                                       for="{{$permission->id}}">{{$permission->display_name}}</label>
                                                            </div>

                                                        </fieldset>

                                                        <div style="padding-right: 27px;font-size: 15px !important;position: relative">

{{--                                                            <fieldset style="position:relative;">--}}
{{--                                                                <div class="lineeeeeeChild"></div>--}}
{{--                                                                <div class="checkbox">--}}
{{--                                                                    <input type="checkbox"--}}
{{--                                                                           class="checkbox-input checkAll"--}}
{{--                                                                           id="{{$permission->id}}"--}}
{{--                                                                           name="permissions[]"--}}
{{--                                                                           value="{{$permission->id}}"--}}
{{--                                                                           onclick="toggle(this,{{$permission->children}})">--}}
{{--                                                                    <label style="font-size: 13px;background: #fff"--}}
{{--                                                                        for="{{$permission->id}}">{{$permission->display_name}}</label>--}}
{{--                                                                </div>--}}

{{--                                                            </fieldset>--}}

                                                            @foreach($permission->children as $child)
                                                                <fieldset style="position:relative;">
                                                                    <div class="lineeeeeeChild"></div>
                                                                        <div class="checkbox">
                                                                            <input type="checkbox"
                                                                                   class="checkbox-input checkAll"
                                                                                   name="permissions[]"
                                                                                   value="{{$child->id}}"
                                                                                   id="{{$child->id}}">
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
                                            @endforeach
                                        </div>
                                    </div>

                                    <div class="text-right">
                                        <button type="submit" class="btn btn-lg btn-primary ">افزودن دسترسی جدید
                                        </button>
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


        // $(function (){
        //     $("input[name=permissions]").on("change" , function (){
        //         var id = $(this).attr("id");
        //         let state = $(this).prop("checked");
        //         console.log("stateee : " , state)
        //         $("input[name=permissions]#"+id).prop("checked" , state)
        //     })
        // })

        // function checkChange(sourse){
        //     console.log(sourse.checked)
        // }


        function toggle(source, children) {
            for (var i = 0, n = children.length; i < n; i++) {
                childId = children[i].id
                checkbox = document.getElementById(childId);
                checkbox.checked = source.checked;
            }

        }
    </script>
@endsection
