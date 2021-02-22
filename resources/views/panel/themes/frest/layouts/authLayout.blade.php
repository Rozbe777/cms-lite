<!DOCTYPE html>
<html class="loading" lang="fa" data-textdirection="rtl" dir="rtl">
<!-- BEGIN: Head-->

@include('panel.themes.frest.includes.head')
@include('panel.themes.frest.includes.scripts')

    <!-- END: Theme CSS-->


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
<!-- END: Page Vendor JS-->

<!-- BEGIN: Theme JS-->
<script src={{adminTheme("js/core/app-menu.js")}}></script>
<script src={{adminTheme("js/core/app.js")}}></script>
<script src={{adminTheme("js/scripts/components.js")}}></script>
<script src={{adminTheme("js/scripts/footer.js")}}></script>
<!-- END: Theme JS-->

<!-- BEGIN: Page JS-->
<!-- END: Page JS-->
@yield("scripts")
</body>
<!-- END: Body-->
</html>
