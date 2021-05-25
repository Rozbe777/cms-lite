@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "کاربران")

@section("content")

    <div class="content-wrapper">
        <div class="content-header row">
            <div class="item-title">
                <h3>افزودن کاربر</h3>
            </div>
        </div>
        <div class="content-body"><!-- users edit start -->
            <div class="card">
                <div class="card-content">
                    <div class="card-body">


                        <div class="tab-pane active fade show" id="account" aria-labelledby="account-tab"
                             role="tabpanel">
                            <div id="create-user-form"
                                 data-roles={{\Illuminate\Support\Facades\Auth::user()->roles()->first()->name}}
                                     data-action="{{route('user.store')}}"
                                 data-token="{{csrf_token()}}"></div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('pageScripts')
    <script src="{{asset('js/app.js')}}"></script>
@endsection
