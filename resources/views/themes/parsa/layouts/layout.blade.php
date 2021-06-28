<!doctype html>
<html lang="fa" dir="rtl">
@include(includes('head'))
<body>

<div class="header-area">

    <div class="top-header-area">
        <div class="container-fluid">
            <div class="top-header-inner">
                <div class="row align-items-center">
                    <div class="col-lg-4 col-md-12">
                        <div class="top-header-left-side">
                            <div class="d-flex align-items-center">
                                <ul class="top-header-social-links d-flex align-items-center">
                                    <li>دنبال کنید:</li>
                                    <li><a href="#" target="_blank"><i class="ri-facebook-fill"></i></a></li>
                                    <li><a href="#" target="_blank"><i class="ri-twitter-fill"></i></a></li>
                                    <li><a href="#" target="_blank"><i class="ri-linkedin-fill"></i></a></li>
                                    <li><a href="#" target="_blank"><i class="ri-instagram-line"></i></a></li>
                                </ul>
                                <div class="dropdown language-switcher">
                                    <button class="btn btn-secondary d-flex align-items-center dropdown-toggle"
                                            type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                        <img src="{{themeAsset('img/flag/iran.jpg')}}" alt="image">
                                        <span>فا <i class="ri-arrow-down-s-line"></i></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <a href="#" class="dropdown-item d-flex align-items-center">
                                                <img src="{{themeAsset('img/flag/germany.jpg')}}" alt="flag">
                                                <span>Ger</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="dropdown-item d-flex align-items-center">
                                                <img src="{{themeAsset('img/flag/france.jpg')}}" alt="flag">
                                                <span>Fre</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="dropdown-item d-flex align-items-center">
                                                <img src="{{themeAsset('img/flag/spain.jpg')}}" alt="flag">
                                                <span>Spa</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="dropdown-item d-flex align-items-center">
                                                <img src="{{themeAsset('img/flag/russia.jpg')}}" alt="flag">
                                                <span>Rus</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="dropdown-item d-flex align-items-center">
                                                <img src="{{themeAsset('img/flag/italy.jpg')}}" alt="flag">
                                                <span>Ita</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-12">
                        <ul class="top-header-contact-info">
                            <li><i class="ri-time-line"></i><span>شنبه - جمعه:</span> 8:00 صبح - 9:00 عصر</li>
                            <li><i class="ri-map-pin-2-line"></i><span>دفتر:</span> ایران ، استان تهران ، میدان آزادی
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="navbar-area navbar-style-two">
        <div class="enry-responsive-nav">
            <div class="container">
                <div class="enry-responsive-menu">
                    <div class="logo">
                        <a href="index.html"><img src="{{themeAsset('img/logo.png')}}" alt="logo"></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="enry-nav">
            <div class="container-fluid">
                <nav class="navbar navbar-expand-md navbar-light">
                    <a class="navbar-brand" href="index.html"><img src="{{themeAsset('img/logo.png')}}" alt="logo"></a>
                    <div class="collapse navbar-collapse mean-menu">
                        <ul class="navbar-nav">
                            <li class="nav-item"><a href="#" class="dropdown-toggle nav-link active">خانه</a>
                                <ul class="dropdown-menu">
                                    <li class="nav-item"><a href="index.html" class="nav-link active">صفحه اصلی - 1</a>
                                    </li>
                                    <li class="nav-item"><a href="index-2.html" class="nav-link">صفحه اصلی - 2</a></li>
                                    <li class="nav-item"><a href="index-3.html" class="nav-link">صفحه اصلی - 3</a></li>
                                </ul>
                            </li>
                            <li class="nav-item"><a href="#" class="dropdown-toggle nav-link">صفحات</a>
                                <ul class="dropdown-menu">
                                    <li class="nav-item"><a href="#" class="dropdown-toggle nav-link">درباره ما</a>
                                        <ul class="dropdown-menu">
                                            <li class="nav-item"><a href="about-simple.html" class="nav-link">درباره ما
                                                    (ساده)</a></li>
                                            <li class="nav-item"><a href="about-modern.html" class="nav-link">درباره ما
                                                    (مدرن)</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item"><a href="company-history.html" class="nav-link">تاریخچه
                                            شرکت</a></li>
                                    <li class="nav-item"><a href="team.html" class="nav-link">تیم ما</a></li>
                                    <li class="nav-item"><a href="testimonial.html" class="nav-link">بازخورد مشتریان</a>
                                    </li>
                                    <li class="nav-item"><a href="faq.html" class="nav-link">سوالات متداول</a></li>
                                    <li class="nav-item"><a href="sign-in.html" class="nav-link">ورود کاربران</a></li>
                                    <li class="nav-item"><a href="sign-up.html" class="nav-link">ثبت نام</a></li>
                                    <li class="nav-item"><a href="privacy-policy.html" class="nav-link">حریم خصوصی</a>
                                    </li>
                                    <li class="nav-item"><a href="terms-conditions.html" class="nav-link">قوانین و
                                            ضوابط</a></li>
                                    <li class="nav-item"><a href="coming-soon.html" class="nav-link">در دست ساخت</a>
                                    </li>
                                    <li class="nav-item"><a href="error-404.html" class="nav-link">خطای 404</a></li>
                                </ul>
                            </li>
                            <li class="nav-item"><a href="#" class="dropdown-toggle nav-link">خدمات ما</a>
                                <ul class="dropdown-menu">
                                    <li class="nav-item"><a href="services-1.html" class="nav-link">خدمات ما 01</a></li>
                                    <li class="nav-item"><a href="services-2.html" class="nav-link">خدمات ما 02</a></li>
                                    <li class="nav-item"><a href="services-3.html" class="nav-link">خدمات ما 03</a></li>
                                    <li class="nav-item"><a href="services-details.html" class="nav-link">جزئیات
                                            خدمات</a></li>
                                </ul>
                            </li>
                            <li class="nav-item"><a href="#" class="dropdown-toggle nav-link">پروژه ها</a>
                                <ul class="dropdown-menu">
                                    <li class="nav-item"><a href="projects-1.html" class="nav-link">پروژه 2 ستونی</a>
                                    </li>
                                    <li class="nav-item"><a href="projects-2.html" class="nav-link">پروژه 3 ستونی</a>
                                    </li>
                                    <li class="nav-item"><a href="projects-3.html" class="nav-link">پروژه فیلتردار</a>
                                    </li>
                                    <li class="nav-item"><a href="projects-4.html" class="nav-link">پروژه با لود
                                            بیشتر</a></li>
                                    <li class="nav-item"><a href="projects-5.html" class="nav-link">پروژه سایدبار</a>
                                    </li>
                                    <li class="nav-item"><a href="#" class="dropdown-toggle nav-link">جزئیات پروژه</a>
                                        <ul class="dropdown-menu">
                                            <li class="nav-item"><a href="single-projects-1.html" class="nav-link">جزئیات
                                                    نمونه کار 01</a></li>
                                            <li class="nav-item"><a href="single-projects-2.html" class="nav-link">جزئیات
                                                    نمونه کار 02</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item"><a href="#" class="dropdown-toggle nav-link">فروشگاه</a>
                                <ul class="dropdown-menu">
                                    <li class="nav-item"><a href="products.html" class="nav-link">محصولات فهرستی</a>
                                    </li>
                                    <li class="nav-item"><a href="cart.html" class="nav-link">سبد خرید</a></li>
                                    <li class="nav-item"><a href="checkout.html" class="nav-link">بررسی پرداخت</a></li>
                                    <li class="nav-item"><a href="products-details.html" class="nav-link">جزئیات
                                            محصولات</a></li>
                                </ul>
                            </li>
                            <li class="nav-item"><a href="#" class="dropdown-toggle nav-link">وبلاگ</a>
                                <ul class="dropdown-menu">
                                    <li class="nav-item"><a href="blog-grid.html" class="nav-link">وبلاگ شبکه ای</a>
                                    </li>
                                    <li class="nav-item"><a href="blog-right-sidebar.html" class="nav-link">وبلاگ
                                            سایدبار</a></li>
                                    <li class="nav-item"><a href="blog-details.html" class="nav-link">جزئیات وبلاگ</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item"><a href="contact.html" class="nav-link">تماس با ما</a></li>
                        </ul>
                        <div class="others-option">
                            <div class="cart-btn">
                                <a href="cart.html"><i class="ri-shopping-cart-line"></i><span>3</span></a>
                            </div>
                            <div class="search-icon">
                                <i class="ri-search-line"></i>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>

</div>


<div class="search-overlay">
    <div class="d-table">
        <div class="d-table-cell">
            <div class="search-overlay-layer"></div>
            <div class="search-overlay-layer"></div>
            <div class="search-overlay-layer"></div>
            <div class="search-overlay-close">
                <span class="search-overlay-close-line"></span>
                <span class="search-overlay-close-line"></span>
            </div>
            <div class="search-overlay-form">
                <form>
                    <input type="text" class="input-search" placeholder="کلمات کلیدی را وارد کنید...">
                    <button type="submit"><i class="ri-search-line"></i></button>
                </form>
            </div>
        </div>
    </div>
</div>


@yield('content')
<footer class="footer-area">
    <div class="container">
        <div class="row  justify-content-center">
            <div class="col-lg-3 col-sm-6 col-md-6">
                <div class="single-footer-widget">
                    <a href="index.html" class="logo">
                        <img src="{{themeAsset('img/white-logo.png')}}" alt="image">
                    </a>
                    <p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است.</p>
                    <div class="footer-contact-info">
                        <h5>تماس با ما:</h5>
                        <ul>
                            <li><span>تماس بگیرید:</span> <a href="tel:+(1)8144822296">+(1) 814 482 2296</a></li>
                            <li><span>ایمیل:</span> <a href="mailto: hello@enry.com"> hello@enry.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-md-6">
                <div class="single-footer-widget pl-4">
                    <h3>لینکهای سریع</h3>
                    <ul class="links-list">
                        <li><a href="contact.html">تماس بگیرید</a></li>
                        <li><a href="products.html">فروشگاه ما</a></li>
                        <li><a href="services-1.html">خدمات ما</a></li>
                        <li><a href="blog-details.html">جزئیات وبلاگ</a></li>
                        <li><a href="contact.html">دریافت نقل و قول</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-md-6">
                <div class="single-footer-widget pl-2">
                    <h3>کمک به ما</h3>
                    <ul class="links-list">
                        <li><a href="about-simple.html">درباره ما</a></li>
                        <li><a href="terms-conditions.html">مرکز پشتیبانی</a></li>
                        <li><a href="contact.html">تماس با ما</a></li>
                        <li><a href="testimonial.html">خوراک</a></li>
                        <li><a href="blog-grid.html">وبلاگ ما</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-md-6">
                <div class="single-footer-widget">
                    <h3>ساعت های کاری</h3>
                    <ul class="opening-hours">
                        <li>شنبه - جمعه: <span>8:00 صبح - 9:00 عصر</span></li>
                        <li>سه شنبه: <span>8:00 صبح - 9:00 عصر</span></li>
                        <li>چهارشنبه: <span>8:00 صبح - 9:00 عصر</span></li>
                        <li>پنجشنبه: <span>8:00 صبح - 9:00 عصر</span></li>
                        <li>جمعه: <span>تعطیل</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="copyright-area">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-7 col-sm-6">
                    <p> اجرا شده توسط سایت ساز ریسمان | <a href="https://risman.io" target="_blank">RISMAN.IO</a></p>
                </div>
                <div class="col-lg-6 col-md-5 col-sm-6">
                    <ul class="social-links">
                        <li><a href="#" target="_blank"><i class="ri-facebook-fill"></i></a></li>
                        <li><a href="#" target="_blank"><i class="ri-twitter-fill"></i></a></li>
                        <li><a href="#" target="_blank"><i class="ri-linkedin-fill"></i></a></li>
                        <li><a href="#" target="_blank"><i class="ri-instagram-line"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</footer>

<div class="go-top"><i class="ri-arrow-up-s-line"></i></div>
@include(includes('scripts'))
</body>
</html>
