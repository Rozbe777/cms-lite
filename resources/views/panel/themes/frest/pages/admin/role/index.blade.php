@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "دسترسی ها")
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
                    </span>
                            <span id="icon">
                        <a><i style="font-size: 25px;margin-top: 5px;" class="bx bx-chevron-left"></i></a>
                    </span>
                            <span id="icon">
                        <a>سطح دسترسی کاربران و مدیریت آن ها</a>
                    </span>

                            <button id="show-loader-selected" style="float : left"
                                    class="btn btn-primary shadow mr-1 mb-1">
                                <a href="{{ url('/roles/create') }}" style="color: #fff !important;">
                                    <i class="bx bx-plus"></i>&nbsp; افزودن
                                    &nbsp;</a>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="content-body col-12" style="margin-top : 15px">
            <div class="card height-auto" style="border-radius: 5px !important;">
                <div class="card-body" style="padding: 5px 0">

                    <div class="table-responsive">
                        <table style="border: unset" class="table display  text-nowrap data-table text-nowrap">
                            <thead>
                            <tr>
                                <th>
                                    شناسه
                                </th>
                                <th>نام فارسی</th>
                                <th>نام لاتین</th>
                                <th>مدیریت</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($data as $role)
                                <tr>
                                    <td class="footable-visible footable-first-column"><span
                                            class="footable-toggle"></span>{{$role->id}}</td>
                                    <td class="footable-visible footable-first-column"><span
                                            class="footable-toggle"></span>{{$role->display_name}}</td>
                                    <td class="footable-visible">{{$role->name}}</td>
                                    <td>
                                        <div class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown"
                                               aria-expanded="false">
                                                <span class="flaticon-more-button-of-three-dots"></span>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a class="dropdown-item"
                                                   href="{{route("roles.edit" , ["roleId"=>$role->id])}}"><i
                                                        class="fas fa-cogs text-dark-pastel-green"></i>ویرایش</a>
                                                <form class="deleteRecord"
                                                      action="{{route("roles.destroy" , ["roleId"=>$role->id])}}"
                                                      method="post">
                                                    @method("DELETE")
                                                    @csrf
                                                    <a class="dropdown-item" href="#">
                                                        <button
                                                            class="bg-transparent deleteRecordButton border-0 outline-0"
                                                            type="submit">
                                                            <i class="fas fa-times text-orange-red"></i>
                                                            حذف
                                                        </button>
                                                    </a>
                                                </form>
                                            </div>
                                        </div>
                                    </td>

                                </tr>


                            @endforeach

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
    </div>



    <script>
        function confirm_delete(id) {
            var r = confirm('آیا مایل به حذف دسترسی هستید؟')
            if (r) {
                event.preventDefault();
                document.getElementById('delete-form-' + id).submit();
            }
        }
    </script>
@endsection
