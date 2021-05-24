@extends("panel.themes.frest.layouts.authLayout")
@section("content")
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="content-wrapper">
            <div class="content-header row">
            </div>
            <div class="content-body"><!-- login page start -->
                <section id="auth-login" class="row flexbox-container">
                    <div class="col-xl-8 col-11">
                        <div class="card bg-authentication mb-0">
                            <div class="row m-0">


                                <!-- left section-login -->

                                <div class="col-md-6">
                                    <div style="width: 100%;height : 100%" data-action="{{route('auth.login')}}"
                                         data-token="{{csrf_token()}}" id="login-form"></div>
                                </div>
                                <!-- right section image -->

                                <div class="col-md-6 d-md-block d-none text-center align-self-center p-3">
                                    <img class="img-fluid" src="{{adminTheme("images/pages/login.png")}}"
                                         alt="branding logo"/>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <!-- login page ends -->
            </div>


        </div>
    </div>

    <!-- /content area -->
@endsection

@section("pageScripts")

    <script>
        document.getElementById('verify_codes').focus();
    </script>
    <script src="{{asset("/js/app.js")}}"></script>


@endsection
