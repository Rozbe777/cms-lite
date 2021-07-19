@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "حساب کاربری")
@section("content")
    <!-- BEGIN: Content-->
    <div class="content-wrapper" style="padding: 0px !important; margin : 0px !important ; border-top : 1px solid #eee">
        <div class="row col-12" id="headerContent">
            <div id="bradcrummmm" style="width: 100%">

            </div>
        </div>
        <div class="content-body" style="padding: 20px 30px"><!-- users edit start -->
            <section class="users-edit">
               <div id="users-profile" data-token="{{csrf_token()}}"></div>
            </section>
            <!-- users edit ends -->
        </div>
    </div>
    <!-- END: Content-->
@endsection
@section('pageScripts')
    <script src="{{asset('js/app.js')}}"></script>
@endsection
