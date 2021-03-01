@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "کاربران")

@section("content")
    @if($errors->any())

        <script>
            updateProfileError("{!! $errors->first() !!}");
        </script>
    @endif
    <div class="content-wrapper">
            <div class="content-header row">
            </div>
            <div class="content-body"><!-- users list start -->
                <section class="users-list-wrapper">
                    <form action="{{route('admin.user.search')}}" method="get">

                        <div class="users-list-filter px-1">
                            <div class="row border rounded py-2 mb-2">
                                <div class="col-12 col-sm-6 col-lg-3">
                                    <label for="users-list-verified">تایید شده</label>
                                    <fieldset class="form-group">
                                        <select class="form-control" id="users-list-verified" name="confirmed">
                                            <option value="{{null}}">همه</option>
                                            <option value="1">بله</option>
                                            <option value="0">خیر</option>
                                        </select>
                                    </fieldset>
                                </div>
                                <div class="col-12 col-sm-6 col-lg-3">
                                    <label for="users-list-role">نقش</label>
                                    <fieldset class="form-group">
                                        <select class="form-control" id="users-list-role" name="role">
                                            <option value="{{null}}">همه</option>
                                            <option >ادمین</option>
                                            <option >کاربر</option>
                                        </select>
                                    </fieldset>
                                </div>
                                <div class="col-12 col-sm-6 col-lg-3">
                                    <label for="users-list-status">وضعیت</label>
                                    <fieldset class="form-group">
                                        <select class="form-control" id="users-list-status" name="status">
                                            <option value="{{null}}">همه</option>
                                            <option value="active">فعال</option>
                                            <option value="deactivate">غیر فعال</option>
                                        </select>
                                    </fieldset>
                                </div>
                                <div class="col-6 col-sm-3 col-lg-1 " style="    margin-block-start: auto;">
                                    <button type="submit" class="btn btn-icon rounded-circle btn-outline-primary mr-1 mb-1"><i class="bx bx-search"></i></button>

                                </div>
                                <div class="col-6 col-sm-3 col-lg-1 " style="    margin-block-start: auto;">
                                    <a href="{{route('admin.user.export')}}" class="btn btn-icon rounded-circle btn-warning mr-1 mb-1 tui-full-calendar-dayname-leftmargin"><i class="bx bx-archive"></i></a>
                                </div>

                            </div>
                        </div>

                    </form>
{{--                    <div class="newtable">--}}
{{--                        <div class="table-responsive">--}}
{{--                            <table id="table-extended-success" class="table mb-0">--}}
{{--                                <thead>--}}
{{--                                <tr>--}}
{{--                                    <th>کمپین</th>--}}
{{--                                    <th>جزئیات حساب</th>--}}
{{--                                    <th>دسته</th>--}}
{{--                                    <th>مقدار</th>--}}
{{--                                    <th>وضعیت</th>--}}
{{--                                    <th>عمل</th>--}}
{{--                                </tr>--}}
{{--                                </thead>--}}
{{--                                <tbody>--}}
{{--                                <tr>--}}
{{--                                    <td class="text-bold-600 pr-0"><img class="rounded-circle mr-1" src="../../assets/images/cards/1.png" alt="card">هدفون های بی سیم</td>--}}
{{--                                    <td>شماره کارت 4154 81** **** 7617</td>--}}
{{--                                    <td class="text-bold-700"><i class="text-bold-600 align-middle bx bx-music mr-50"></i><span>موزیک</span>--}}
{{--                                    </td>--}}
{{--                                    <td class="text-bold-700">1,934,000 تومان</td>--}}
{{--                                    <td class="text-success">موفقیت!</td>--}}
{{--                                    <td>--}}
{{--                                        <div class="dropdown">--}}
{{--                                            <span class="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menu"></span>--}}
{{--                                            <div class="dropdown-menu">--}}
{{--                                                <a class="dropdown-item" href="#"><i class="bx bx-edit-alt mr-1"></i> ویرایش</a>--}}
{{--                                                <a class="dropdown-item" href="#"><i class="bx bx-trash mr-1"></i> حذف</a>--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                    </td>--}}
{{--                                </tr>--}}
{{--                                <tr>--}}
{{--                                    <td class="text-bold-600 pr-0"><img class="rounded-circle mr-1" src="../../assets/images/cards/2.png" alt="card">کفش نایک</td>--}}
{{--                                    <td>شماره کارت 4154 81** **** 7617</td>--}}
{{--                                    <td class="text-bold-700"><i class="text-bold-600 align-middle bx bx-tennis-ball mr-50"></i><span>ورزشی</span></td>--}}
{{--                                    <td class="text-bold-700">232,000 تومان</td>--}}
{{--                                    <td class="text-danger">ناموفق!</td>--}}
{{--                                    <td>--}}
{{--                                        <div class="dropup">--}}
{{--                <span class="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menu">--}}
{{--                </span>--}}
{{--                                            <div class="dropdown-menu">--}}
{{--                                                <a class="dropdown-item" href="#"><i class="bx bx-edit-alt mr-1"></i> ویرایش</a>--}}
{{--                                                <a class="dropdown-item" href="#"><i class="bx bx-trash mr-1"></i> حذف</a>--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                    </td>--}}
{{--                                </tr>--}}
{{--                                <tr>--}}
{{--                                    <td class="text-bold-600 pr-0"><img class="rounded-circle mr-1" src="../../assets/images/cards/3.png" alt="card">نوشیدنی پپسی--}}
{{--                                    </td>--}}
{{--                                    <td>شماره کارت 4154 81** **** 7617</td>--}}
{{--                                    <td class="text-bold-700"><i class="text-bold-600 align-middle bx bx-truck mr-50"></i><span>حمل و نقل</span>--}}
{{--                                    </td>--}}
{{--                                    <td class="text-bold-700">564,000 تومان</td>--}}
{{--                                    <td class="text-success">موفقیت!</td>--}}
{{--                                    <td>--}}
{{--                                        <div class="dropup">--}}
{{--                <span class="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menu">--}}
{{--                </span>--}}
{{--                                            <div class="dropdown-menu">--}}
{{--                                                <a class="dropdown-item" href="#"><i class="bx bx-edit-alt mr-1"></i> ویرایش</a>--}}
{{--                                                <a class="dropdown-item" href="#"><i class="bx bx-trash mr-1"></i> حذف</a>--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                    </td>--}}
{{--                                </tr>--}}
{{--                                <tr>--}}
{{--                                    <td class="text-bold-600 pr-0"><img class="rounded-circle mr-1" src="../../assets/images/cards/4.png" alt="card">هدفون های بی سیم</td>--}}
{{--                                    <td>شماره کارت 4154 81** **** 7617</td>--}}
{{--                                    <td class="text-bold-700"><i class="text-bold-600 align-middle bx bx-music mr-50"></i><span>موزیک</span>--}}
{{--                                    </td>--}}
{{--                                    <td class="text-bold-700">232,000 تومان</td>--}}
{{--                                    <td class="text-warning">در انتظار!</td>--}}
{{--                                    <td>--}}
{{--                                        <div class="dropdown">--}}
{{--                <span class="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menu">--}}
{{--                </span>--}}
{{--                                            <div class="dropdown-menu">--}}
{{--                                                <a class="dropdown-item" href="#"><i class="bx bx-edit-alt mr-1"></i> ویرایش</a>--}}
{{--                                                <a class="dropdown-item" href="#"><i class="bx bx-trash mr-1"></i> حذف</a>--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                    </td>--}}
{{--                                </tr>--}}
{{--                                <tr>--}}
{{--                                    <td class="text-bold-600 pr-0"><img class="rounded-circle mr-1" src="../../assets/images/cards/5.png" alt="card">هدفون های بی سیم</td>--}}
{{--                                    <td>شماره کارت 4154 81** **** 7617</td>--}}
{{--                                    <td class="text-bold-700"><i class="text-bold-600 align-middle bx bx-truck mr-50"></i><span>حمل و نقل</span>--}}
{{--                                    </td>--}}
{{--                                    <td class="text-bold-700">564,000 تومان</td>--}}
{{--                                    <td class="text-success">موفقیت!</td>--}}
{{--                                    <td>--}}
{{--                                        <div class="dropdown">--}}
{{--                <span class="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menu">--}}
{{--                </span>--}}
{{--                                            <div class="dropdown-menu">--}}
{{--                                                <a class="dropdown-item" href="#"><i class="bx bx-edit-alt mr-1"></i> ویرایش</a>--}}
{{--                                                <a class="dropdown-item" href="#"><i class="bx bx-trash mr-1"></i> حذف</a>--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                    </td>--}}
{{--                                </tr>--}}
{{--                                <tr>--}}
{{--                                    <td class="text-bold-600 pr-0"><img class="rounded-circle mr-1" src="../../assets/images/cards/2.png" alt="card">هدفون های بی سیم</td>--}}
{{--                                    <td>شماره کارت 4154 81** **** 7617</td>--}}
{{--                                    <td class="text-bold-700"><i class="text-bold-600 align-middle bx bx-truck mr-50"></i><span>حمل و نقل</span>--}}
{{--                                    </td>--}}
{{--                                    <td class="text-bold-700">894,000 تومان</td>--}}
{{--                                    <td class="text-warning">در انتظار!</td>--}}
{{--                                    <td>--}}
{{--                                        <div class="dropdown">--}}
{{--                <span class="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menu">--}}
{{--                </span>--}}
{{--                                            <div class="dropdown-menu">--}}
{{--                                                <a class="dropdown-item" href="#"><i class="bx bx-edit-alt mr-1"></i> ویرایش</a>--}}
{{--                                                <a class="dropdown-item" href="#"><i class="bx bx-trash mr-1"></i> حذف</a>--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                    </td>--}}
{{--                                </tr>--}}
{{--                                </tbody>--}}
{{--                            </table>--}}
{{--                        </div>--}}
{{--                    </div>--}}
                    <div class="users-list-table">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <!-- datatable start -->
                                    <div class="table-responsive">
                                        <table id="users-list-datatable" class="table">
                                            <thead>
                                            <tr>
                                                <th class="dt-checkboxes-cell dt-checkboxes-select-all sorting_disabled" rowspan="1" colspan="1" style="width: 75px;" data-col="0" aria-label="">
                                                    <div class="form-check">
                                                        <input type="checkbox" class="form-check-input checkAll">
                                                        <label class="form-check-label"></label>
                                                    </div>
                                                </th>
                                                <th>ID</th>
                                                <th>نام </th>
                                                <th> نام خانوادگی</th>
                                                <th>ایمیل</th>
                                                <th>شماره موبایل</th>
                                                <th>نقش</th>
                                                <th>وضعیت</th>
                                                <th>عملیات</th>

                                            </tr>
                                            </thead>
                                            <tbody>


                                            @foreach($users as $user)
                                                <tr>
                                                    <td class="dt-checkboxes-cell">
{{--                                                        <div class="checkbox">--}}
{{--                                                            <input type="checkbox" class="dt-checkboxes">--}}
{{--                                                            <label></label>--}}
{{--                                                        </div>--}}
                                                        <div class="form-check">
                                                            <input type="checkbox" class="form-check-input checkAll">
                                                            <label class="form-check-label"></label>
                                                        </div>
                                                    </td>
                                                    <td>{{$user->id}}</td>
                                                    <td>{{$user->name}}</td>
                                                    <td>{{$user->family}}</td>
                                                    <td>{{$user->email}}</td>
                                                    <td>{{$user->phone}}</td>
                                                    <td>{{$user->roles()->first()->name}}</td>
                                                    <td>{{$user->persianStatus}}</td>
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
                                                        <div class="dropup ">
                <span class="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false" role="menu">
                </span>
                                                            <div class="dropdown-menu " x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(28px, 23px, 0px);">
{{--                                                                //FIXME when page loaded this menu not open--}}
                                                                <a class="dropdown-item" href="{{route('admin.user.edit',$user->id)}}"><i class="bx bx-edit-alt mr-1"></i> ویرایش</a>
                                                                <a class="dropdown-item sweet-alert-delete-confirm" href="{{route('admin.user.destroy',$user->id)}}"><i class="bx bx-trash mr-1"></i> حذف</a>

                                                            </div>
                                                        </div>
                                                    </td>
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

@section('pageScripts')
{{--    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/core/menu/menu-types/vertical-menu.css")}}">--}}
{{--  <!-- BEGIN: Page Vendor JS-->--}}
{{--    <script src="{{adminTheme("vendors/js/tables/datatable/datatables.min.js")}}"></script>--}}
{{--    <script src="{{adminTheme("vendors/js/tables/datatable/dataTables.bootstrap4.min.js")}}"></script>--}}
{{--    <!-- END: Page Vendor JS-->--}}
{{--    <script src="{{adminTheme("js/scripts/pages/page-users.js")}}"></script>--}}
    <script>
        $('.sweet-alert-delete-confirm').on('click', function (event) {
            event.preventDefault();
            const url = $(this).attr('href');
            swal({
                title: 'حذف کاربر',
                text: "آیا مطمئنید؟",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'تایید',
                confirmButtonClass: 'btn btn-primary',
                cancelButtonClass: 'btn btn-danger ml-1',
                cancelButtonText: 'انصراف',
                buttonsStyling: false,
            }).then(function(result) {
                if (result.value) {

                    Swal.fire({
                        type: "success",
                        title: 'حذف شد!',
                        text: 'کاربر مورد نظر حذف شد',
                        confirmButtonClass: 'btn btn-success',
                        confirmButtonText: 'باشه',
                    });

                    window.location.href = url;
                }
            });
        });
    </script>
@endsection
