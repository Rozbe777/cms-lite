@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "کاربران")

@section("content")
        <div class="content-wrapper">
            <div class="content-header row">
            </div>
            <div class="content-body"><!-- users list start -->
                <section class="users-list-wrapper">
                    <div class="users-list-filter px-1">
                        <form>
                            <div class="row border rounded py-2 mb-2">
                                <div class="col-12 col-sm-6 col-lg-3">
                                    <label for="users-list-verified">تایید شده</label>
                                    <fieldset class="form-group">
                                        <select class="form-control" id="users-list-verified">
                                            <option value="">همه</option>
                                            <option value="بله">بله</option>
                                            <option value="خیر">خیر</option>
                                        </select>
                                    </fieldset>
                                </div>
                                <div class="col-12 col-sm-6 col-lg-3">
                                    <label for="users-list-role">نقش</label>
                                    <fieldset class="form-group">
                                        <select class="form-control" id="users-list-role">
                                            <option value="">همه</option>
                                            <option value="کاربر">کاربر</option>
                                            <option value="کارمند">کارمند</option>
                                        </select>
                                    </fieldset>
                                </div>
                                <div class="col-12 col-sm-6 col-lg-3">
                                    <label for="users-list-status">وضعیت</label>
                                    <fieldset class="form-group">
                                        <select class="form-control" id="users-list-status">
                                            <option value="">همه</option>
                                            <option value="فعال">فعال</option>
                                            <option value="بسته شده">بسته شده</option>
                                            <option value="مسدود شده">مسدود شده</option>
                                        </select>
                                    </fieldset>
                                </div>
                                <div class="col-12 col-sm-6 col-lg-3 d-flex align-items-center">
                                    <button type="reset" class="btn btn-primary btn-block glow users-list-clear mb-0 mt-75">پاکسازی</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="users-list-table">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <!-- datatable start -->
                                    <div class="table-responsive">
                                        <table id="users-list-datatable" class="table">
                                            <thead>
                                            <tr>
                                                <th class="dt-checkboxes-cell dt-checkboxes-select-all sorting_disabled" rowspan="1" colspan="1" style="width: 75px;" data-col="0" aria-label=""><div class="checkbox"><input type="checkbox" class="dt-checkboxes" checked=""><label></label></div></th>
                                                <th>ID</th>
                                                <th>نام </th>
                                                <th> نام خانوادگی</th>
                                                <th>ایمیل</th>
                                                <th>شماره موبایل</th>
                                                <th>نقش</th>
                                                <th>وضعیت</th>
                                                <th>ویرایش</th>
                                                <th>حذف</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            @foreach($users as $user)
                                                <tr>
                                                    <td class="dt-checkboxes-cell"><div class="checkbox"><input type="checkbox" class="dt-checkboxes"><label></label></div></td>
                                                    <td>{{$user->id}}</td>
                                                    <td>{{$user->name}}</td>
                                                    <td>{{$user->family}}</td>
                                                    <td>{{$user->email}}</td>
                                                    <td>{{$user->phone}}</td>
                                                    <td>نقش</td>
                                                    <td>{{$user->status}}</td>
{{--                                                    <td>--}}
{{--                                                        <div class="dropup">--}}
{{--                <span class="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menu">--}}
{{--                </span>--}}
{{--                                                            <div class="dropdown-menu">--}}
{{--                                                                <a class="dropdown-item" href="#"><i class="bx bx-edit-alt mr-1"></i> ویرایش</a>--}}
{{--                                                                <a class="dropdown-item" href="#"><i class="bx bx-trash mr-1"></i> حذف</a>--}}
{{--                                                            </div>--}}
{{--                                                        </div>--}}
{{--                                                    </td>--}}
                                                    <td>
                                                        <button type="button" class="btn btn-primary mr-1 mb-1" onclick="{{route('admin.user.update',$user->id)}}">ویرایش</button>

                                                    </td>
                                                    <td>
{{--                                                        //TODO --}}
{{--                                                        confirm alert--}}
                                                        <button type="button" class="btn btn-primary mr-1 mb-1" onclick="{{route('admin.user.destroy',$user->id)}}">حذف</button>

                                                    </td>
{{--                                                    <td><a href={{route('admin.user.edit',$user->id)}}><i class="bx bx-edit-alt"></i></a></td>--}}
                                                </tr>
                                            @endforeach

                                            </tbody>
                                        </table>
                                    </div>
                                    <!-- datatable ends -->
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- users list ends -->
            </div>
        </div>

@endsection

@section('scripts')
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/core/menu/menu-types/vertical-menu.css")}}">
    <script src="{{adminTheme("js/scripts/pages/table-extended.js")}}"></script>

@endsection
