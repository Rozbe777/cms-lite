<!DOCTYPE html>
<html lang="fa" data-textdirection="rtl" dir="rtl">
<!-- BEGIN: Head-->
<script>
    window.onload = function () {
        //hide the preloader
        document.querySelector(".preloaderss").style.display = "none";
        document.querySelector(".priz").style.display = "block";
        // document.querySelector(".app-content").style.display = "block";
        // document.querySelector(".buy-now").style.display = "block";
        // document.querySelector(".widget-chat-demo").style.display = "block";
        // document.querySelector(".main-menu.menu-fixed").style.display = "block";
        // document.querySelector("body").style.display = "block";
        // document.querySelector("body").style.display = "block";
    }

</script>
@include('panel.themes.frest.includes.head')
<body
    class="vertical-layout vertical-menu-modern boxicon-layout no-card-shadow 2-columns  navbar-sticky footer-static  "
    data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
<div class="container-fluid">
    <div class="row">
        <div id="checkout" data-checkoutData="{{json_encode($attributes)}}"></div>
    </div>
</div>

</body>



<script src="{{asset('/js/app.js')}}"></script>

</html>
