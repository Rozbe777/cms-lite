@extends("panel.themes.frest.layouts.dashboardLayout")
@php($title = "دسته بندی")
@section("content")
    @if($errors->any())

        <script>
            updateProfileError("{!! $errors->first() !!}");
        </script>
    @endif


@endsection

@section('pageScripts')

@endsection
