@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "کاربران")
@section("content")
    @if($errors->any())
        <script>
            updateProfileError("{!! $errors->first() !!}");
        </script>
    @endif

    <div class="content-wrapper" style="padding : 0px !important;margin: 0px !important;border-top : 1px solid #eee">

        <div class="content-body" style="padding-top:0px">
            <section class="users-list-wrapper">


                <div id="show-user-list-by-admin"
                    data-destroylink="{{route('users.multipleDestroy')}}"
                     data-searchlink="{{route('users.index')}}"
                     data-token="{{csrf_token()}}"
                >

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
            }).then(function (result) {
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
        $('.sweet-alert-multi-delete-confirm').on('click', function (event) {
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
            }).then(function (result) {
                if (result.value) {
                    document.getElementById("myForm").submit();

                    Swal.fire({
                        type: "success",
                        title: 'حذف شد!',
                        text: 'کاربر مورد نظر حذف شد',
                        confirmButtonClass: 'btn btn-success',
                        confirmButtonText: 'باشه',
                    });

                }
            });
        });

        function toggle(source) {
            checkboxes = document.getElementsByName('userIds[]');
            for (var i = 0, n = checkboxes.length; i < n; i++) {
                checkboxes[i].checked = source.checked;
            }
        }
    </script>

    <script src="{{asset('js/app.js')}}"></script>

@endsection
