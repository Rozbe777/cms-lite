<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
    <title>{{pageTitle(empty($title)?null:$title,'مدیریت')}}</title>
    <link rel="shortcut icon" type="image/x-icon" href="{{adminTheme("images/ico/favicon.ico")}}">
    <meta name="theme-color" content="#5A8DEE">
<!-- BEGIN: Vendor CSS-->
    <link rel="stylesheet" type="text/css" href="{{adminTheme("vendors/css/vendors.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("vendors/css/pickers/pickadate/pickadate.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("vendors/css/pickers/daterange/daterangepicker.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("vendors/css/pickers/datepicker-jalali/bootstrap-datepicker.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("vendors/css/tables/datatable/datatables.min.css")}}">

    <link rel="stylesheet" type="text/css" href="{{adminTheme("vendors/css/extensions/toastr.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("vendors/css/file-uploaders/dropzone.min.css")}}">



    <link rel="stylesheet" type="text/css" href="{{adminTheme("vendors/css/forms/select/select2.min.css")}}">
    <!-- END: Vendor CSS-->

    <!-- BEGIN: Theme CSS-->
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/bootstrap.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/bootstrap-extended.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/colors.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/components.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/themes/dark-layout.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/themes/semi-dark-layout.css")}}">
    <!-- END: Theme CSS-->
    <!-- Editor   -->


    <!-- BEGIN: Page CSS-->
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/core/menu/menu-types/vertical-menu.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/pages/page-users.css")}}">
    <link rel="stylesheet" type="text/css" href="{{adminTheme("css/plugins/extensions/toastr.css")}}">

    <!-- END: Page CSS-->

</head>
