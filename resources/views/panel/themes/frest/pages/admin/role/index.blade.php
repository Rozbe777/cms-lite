@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "دسترسی ها")
@section("content")
    <div class="content-wrapper">
        <div class="content-header row">
            <div class="content-body col-12">
                <div class="card height-auto">
                    <div class="card-body">
                        <div class="heading-layout1">
                            <div class="item-title">
                                <h3>سطح دسترسی کاربران</h3>
                            </div>
                            <div class="dropdown">
                                <a class="dropdown-toggle" href="#" role="button"
                                   data-toggle="dropdown" aria-expanded="false">...</a>

                                <div class="dropdown-menu dropdown-menu-right">
                                    <a class="dropdown-item" href="{{ url('/admin/role/create') }}"><i
                                            class="fas fa-redo-alt text-orange-peel"></i>افزودن</a>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table display  text-nowrap data-table text-nowrap">
                                <thead>
                                <tr>
                                    <th>
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input checkAll">
                                            <label class="form-check-label">شناسه</label>
                                        </div>
                                    </th>
                                    <th>نام فارسی</th>
                                    <th>نام لاتین</th>
                                    <th>مدیریت</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($roles as $role)
                                    <tr>
                                        <td class="footable-visible footable-first-column"><span
                                                class="footable-toggle"></span>{{$role->id}}</td>
                                        <td class="footable-visible footable-first-column"><span
                                                class="footable-toggle"></span>{{$role->display_name}}</td>
                                        <td class="footable-visible"><a href="#">{{$role->name}}</a></td>
                                        <td>
                                            <div class="dropdown">
                                                <a href="#" class="dropdown-toggle" data-toggle="dropdown"
                                                   aria-expanded="false">
                                                    <span class="flaticon-more-button-of-three-dots"></span>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right">
                                                    <a class="dropdown-item"
                                                       href="{{route("admin.role.edit" , ["role"=>$role->id])}}"><i
                                                            class="fas fa-cogs text-dark-pastel-green"></i>ویرایش</a>
                                                    <form class="deleteRecord"
                                                          action="{{route("admin.role.destroy" , ["role"=>$role->id])}}"
                                                          method="post">
                                                        @method("DELETE")
                                                        @csrf
                                                        <a class="dropdown-item" href="#">
                                                            <button class="bg-transparent deleteRecordButton border-0 outline-0"
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
