<!DOCTYPE html>
<html class="loading" lang="fa" data-textdirection="rtl" dir="rtl">
<!-- BEGIN: Head-->
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
    <title>صفحه ثبت نام</title>
@include('panel.themes.frest.includes.head')
    <!-- END: Theme CSS-->

    <!-- BEGIN: Page CSS-->
    <link rel="stylesheet" type="text/css" href={{adminTheme("css/core/menu/menu-types/vertical-menu.css")}}>
    <link rel="stylesheet" type="text/css" href={{adminTheme("css/pages/authentication.css")}}>
    <link rel="stylesheet" type="text/css" href={{adminTheme("vendors/css/extensions/toastr.css")}}>
    <link rel="stylesheet" type="text/css" href={{adminTheme("css/plugins/extensions/toastr.css")}}>
    <!-- END: Page CSS-->














</head>
<!-- END: Head-->

<!-- BEGIN: Body-->
<body class="vertical-layout vertical-menu-modern boxicon-layout no-card-shadow 1-column  navbar-sticky footer-static bg-full-screen-image  blank-page blank-page" data-open="click" data-menu="vertical-menu-modern" data-col="1-column">
<!-- BEGIN: Content-->
<div class="app-content content">

    @yield("content")

</div>
<!-- END: Content-->


<!-- BEGIN: Vendor JS-->
<script src={{adminTheme("vendors/js/vendors.min.js")}}></script>
<script src={{adminTheme("fonts/LivIconsEvo/js/LivIconsEvo.tools.min.js")}}></script>
<script src={{adminTheme("fonts/LivIconsEvo/js/LivIconsEvo.defaults.js")}}></script>
<script src={{adminTheme("fonts/LivIconsEvo/js/LivIconsEvo.min.js")}}></script>
<!-- BEGIN Vendor JS-->

<!-- BEGIN: Page Vendor JS-->
<script src={{adminTheme("vendors/js/extensions/toastr.min.js")}}></script>
<!-- END: Page Vendor JS-->

<!-- BEGIN: Theme JS-->
<script src={{adminTheme("js/core/app-menu.js")}}></script>
<script src={{adminTheme("js/core/app.js")}}></script>
<script src={{adminTheme("js/scripts/components.js")}}></script>
<script src={{adminTheme("js/scripts/footer.js")}}></script>
<!-- END: Theme JS-->

<!-- BEGIN: Page JS-->
<script src={{adminTheme("js/scripts/extensions/toastr.js")}}></script>
<!-- END: Page JS-->

</body>
<!-- END: Body-->
</html>
