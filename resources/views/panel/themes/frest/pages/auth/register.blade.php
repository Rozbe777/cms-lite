@extends("panel.themes.frest.layouts.authLayout")
@section("content")

    <!-- Content area -->
    <div class="content-wrapper">
        <div class="content-header row">
        </div>
        <div class="content-body"><!-- register section starts -->
            <section class="row flexbox-container">
                <div class="col-xl-8 col-10">
                    <div class="card bg-authentication mb-0">
                        <div class="row m-0">
                            <!-- register section left -->
                            <div id="register-form" data-token="{{csrf_token()}}"></div>
                            <!-- image section right -->
                            <div class="col-md-6 d-md-block d-none text-center align-self-center p-3">
                                <img class="img-fluid" src="{{adminTheme("images/pages/register.png")}}"
                                     alt="branding logo">
                            </div>
                        </div>
                    </div>
                </div>



            </section>
            <!-- register section endss -->
        </div>
    </div>



    <!-- /content area -->

@endsection
@section('pageScripts')

    <script>

        // show when page load
        // toastr.info('Page Loaded!');
        //
        // toastr.danger('پنهان سازی آهسته', 'پنهان سازی آهسته', {
        //     rtl: true,
        //     hideDuration: 3000,
        //     positionClass: 'position-bottom-right'
        // });
        function showError(){
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "preventDuplicates": true,
                "onclick": null,
                "showDuration": "100",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "show",
                "hideMethod": "hide"
            };
            toastr.info('MY MESSAGE!');
        }


    </script>
@endsection
