<!DOCTYPE html>
<html class="loading" lang="fa" data-textdirection="rtl" dir="rtl">
<!-- BEGIN: Head-->

@include('panel.themes.frest.includes.head')


<!-- END: Head-->

<!-- BEGIN: Body-->

<body class="vertical-layout vertical-menu-modern 2-columns  navbar-sticky footer-static  " data-open="click" data-menu="vertical-menu-modern" data-col="2-columns" style="background: url({{adminTheme("images/pages/auth-bg.jpg")}}) no-repeat center center;">

<!-- BEGIN: Header-->
@include('panel.themes.frest.includes.header')
<!-- END: Header-->


<!-- BEGIN: Main Menu-->
@include('panel.themes.frest.includes.menu')

<!-- END: Main Menu-->

<!-- BEGIN: Content-->
<div class="app-content content">
    @yield("content")

</div>
<!-- END: Content-->

<div class="sidenav-overlay"></div>
<div class="drag-target"></div>

<!-- BEGIN: Footer-->
@include('panel.themes.frest.includes.footer')

<!-- END: Footer-->


<!-- BEGIN: Vendor JS-->
<script src={{adminTheme("vendors/js/vendors.min.js")}}></script>
<script src={{adminTheme("fonts/LivIconsEvo/js/LivIconsEvo.tools.min.js")}}></script>
<script src={{adminTheme("fonts/LivIconsEvo/js/LivIconsEvo.defaults.js")}}></script>
<script src={{adminTheme("fonts/LivIconsEvo/js/LivIconsEvo.min.js")}}></script>
<script src={{adminTheme("vendors/js/forms/select/select2.full.min.js")}}></script>
<!-- BEGIN Vendor JS-->

<!-- BEGIN: Page Vendor JS-->
<script src={{adminTheme("vendors/js/ui/prism.min.js")}}></script>
<!-- END: Page Vendor JS-->

<!-- BEGIN: Theme JS-->
<script src={{adminTheme("js/core/app-menu.js")}}></script>
<script src={{adminTheme("js/core/app.js")}}></script>
<!-- END: Theme JS-->

<!-- BEGIN: Page JS-->
<!-- END: Page JS-->

</body>
<!-- END: Body-->

</html>
