<!DOCTYPE html>
<html class="loading" lang="fa" data-textdirection="rtl" dir="rtl">
<!-- BEGIN: Head-->

@include('panel.themes.frest.includes.head')


<!-- END: Head-->

<!-- BEGIN: Body-->

<body class="vertical-layout vertical-menu-modern 2-columns  navbar-sticky footer-static  " data-open="click" data-menu="vertical-menu-modern" data-col="2-columns" >

<!-- BEGIN: Header-->
@include('panel.themes.frest.includes.header')
<!-- END: Header-->


<!-- BEGIN: Main Menu-->
@include('panel.themes.frest.includes.menu')

<!-- END: Main Menu-->

<!-- BEGIN: Content-->
<div class="app-content content">
    <div class="content-overlay"></div>
    @yield("content")

</div>
<!-- END: Content-->
@include('panel.themes.frest.includes.customizer')


<div class="sidenav-overlay"></div>
<div class="drag-target"></div>

<!-- BEGIN: Footer-->
@include('panel.themes.frest.includes.footer')

<!-- END: Footer-->

@include('panel.themes.frest.includes.scripts')

</body>
<!-- END: Body-->

</html>
