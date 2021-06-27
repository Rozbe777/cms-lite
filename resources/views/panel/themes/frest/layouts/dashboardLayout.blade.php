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




<!-- END: Head-->


<div class="preloaderss" style="background: #00b0ff ; width: 100vw ; height: 100vh">
    <div class="spinner-grow spinner-grow-lg" role="status">
        <span class="sr-only">در حال بارگذاری ...</span>
    </div>
</div>
<!-- BEGIN: Body-->
<body
    class="vertical-layout vertical-menu-modern boxicon-layout no-card-shadow 2-columns  navbar-sticky footer-static  "
    data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">


<div class="priz" style="display: none">


@include('panel.themes.frest.includes.header')
<!-- END: Head-->



    @include('panel.themes.frest.includes.menu')
    @include('panel.themes.frest.includes.scripts')
    @include('panel.themes.frest.includes.toastr')
    @include('panel.themes.frest.includes.sweetalert')

    <script type="text/javascript">


        //after window is loaded completely


        $(document).ready(function () {
            @if(!empty(session()->get('info'))) //TODO

            customInfoMessage("{!! session()->get('info') !!}")
            @endif

        });

    </script>
    <!-- BEGIN: Content-->
    <div class="app-content content">
        <div class="content-overlay"></div>
        @yield("content")

    </div>
    <!-- END: Content-->

    @include('panel.themes.frest.includes.customizer')


<!-- Buynow Button-->
    <div class="buy-now"><a href="#" target="_blank" class="btn btn-danger">ارتباط با ما</a>

    </div>
    <!-- demo chat-->
    <div class="widget-chat-demo"><!-- widget chat demo footer button start -->
        <button class="btn btn-primary chat-demo-button glow px-1"><i class="livicon-evo"
                                                                      data-options="name: comments.svg; style: lines; size: 24px; strokeColor: #fff; autoPlay: true; repeat: loop;"></i>
        </button>
        <!-- widget chat demo footer button ends -->
        <!-- widget chat demo start -->
        <div class="widget-chat widget-chat-demo d-none">
            <div class="card mb-0">
                <div class="card-header border-bottom p-0">
                    <div class="media m-75">
                        <a href="JavaScript:void(0);">
                            <div class="avatar mr-75">
                                <img src="{{adminTheme("images/portrait/small/avatar-s-2.jpg")}}" alt="avtar images"
                                     width="32" height="32">
                                <span class="avatar-status-online"></span>
                            </div>
                        </a>
                        <div class="media-body">
                            <h6 class="media-heading mb-0 mt-n25"><a href="javaScript:void(0);">جان اسنو</a></h6>
                            <span class="text-muted font-small-3">فعال</span>
                        </div>
                        <i class="bx bx-x widget-chat-close float-right my-auto cursor-pointer"></i>
                    </div>
                </div>
                <div class="card-body widget-chat-container widget-chat-demo-scroll">
                    <div class="chat-content">
                        <div class="badge badge-pill badge-light-secondary my-1">امروز</div>
                        <div class="chat">
                            <div class="chat-body">
                                <div class="chat-message">
                                    <p>How can we help? 😄</p>
                                    <span class="chat-time">7:45 ق.ظ</span>
                                </div>
                            </div>
                        </div>
                        <div class="chat chat-left">
                            <div class="chat-body">
                                <div class="chat-message">
                                    <p>Hey John, I am looking for the best admin template.</p>
                                    <p>Could you please help me to find it out? 🤔</p>
                                    <span class="chat-time">7:50 ق.ظ</span>
                                </div>
                            </div>
                        </div>
                        <div class="chat">
                            <div class="chat-body">
                                <div class="chat-message">
                                    <p>Stack admin is the responsive bootstrap 4 admin template.</p>
                                    <span class="chat-time">8:01 ق.ظ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer border-top p-1">
                    <form class="d-flex" onsubmit="widgetChatMessageDemo();" action="javascript:void(0);">
                        <input type="text" class="form-control chat-message-demo mr-75" placeholder="اینجا بنویسید ...">
                        <button type="submit" class="btn btn-primary glow px-1"><i class="bx bx-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <!-- widget chat demo ends -->

    </div>
    <div class="sidenav-overlay"></div>
    <div class="drag-target"></div>


    @include('panel.themes.frest.includes.footer')


    @yield("pageScripts")


</div>


</body>
<!-- END: Body-->
</html>
