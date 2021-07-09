@extends(layout('layout'))
@section('content')
    <div class="page-title-area">
        <div class="container">
            <div class="page-title-content">
                <h2>{{$product->title}}</h2>
                <ul>
                    <li><a href="{{url('/')}}">خانه</a></li>
                    <li>{{$product->title}}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="products-details-area ptb-100">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-12">
                    <div class="products-details-image">
                        <a href="assets/img/products/products-img1.jpg" class="popup-image">
                            <img src="assets/img/products/products-img1.jpg" alt="image">
                        </a>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12">
                    <div class="products-details-desc">
                        <h3>{{$product->title}}</h3>
                        <div class="products-review d-flex align-items-center">
                            <div class="rating">
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                            </div>
                            <a href="#" class="rating-count">(3 بازدید)</a>
                        </div>
                        <div class="price">
                            <span class="old-price">99000 تومان</span>
                            <span class="new-price">69000 تومان</span>
                        </div>
                        <p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است.</p>
                        <div class="products-meta">
                            <span>تعداد: <span class="sku">10</span></span>
                            <span>موجود: <span class="in-stock">در انبار</span></span>
                            <span>دسته بندی: <a href="#">تی شرت</a></span>
                        </div>
                        <div class="products-add-to-cart">
                            <div class="quantities">
                                <span class="sub-title">تعداد:</span>
                                <div class="input-counter">
                                    <span class="minus-btn"><i class="ri-subtract-line"></i></span>
                                    <input type="text" value="1">
                                    <span class="plus-btn"><i class="ri-add-line"></i></span>
                                </div>
                            </div>
                            <button type="submit" class="default-btn">افزودن خرید <i class="ri-arrow-left-line"></i></button>
                        </div>
                        <ul class="social-share">
                            <li><span>اشتراک گذاری:</span></li>
                            <li><a href="#" target="_blank"><i class="ri-facebook-fill"></i></a></li>
                            <li><a href="#" target="_blank"><i class="ri-twitter-fill"></i></a></li>
                            <li><a href="#" target="_blank"><i class="ri-linkedin-fill"></i></a></li>
                            <li><a href="#" target="_blank"><i class="ri-instagram-line"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-12 col-md-12">
                    <div class="products-details-tabs">
                        <div class="single-tabs-box">
                            <h2><span>شرح محصول</span></h2>
                            <div class="inner-box">
                                <h3>بررسی اجمالی</h3>
                                <p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است.</p>
                                <p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است.</p>
                                <ul>
                                    <li>فوری <strong>انری</strong> فروش برتر</li>
                                    <li>به 18 زبان ترجمه شده است</li>
                                    <li>#1 توصیه شده ترین کتاب سال.</li>
                                    <li>یک پروژه نادیده گرفته شده ، به طور گسترده رد شد ، قهرمان آن به عنوان نوشت.</li>
                                </ul>
                            </div>
                        </div>
                        <div class="single-tabs-box">
                            <h2><span>اطلاعات تکمیلی</span></h2>
                            <div class="inner-box">
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <tbody>
                                        <tr>
                                            <td>ارتفاع دستگیره</td>
                                            <td>40-45″</td>
                                        </tr>
                                        <tr>
                                            <td>عرض</td>
                                            <td>24″</td>
                                        </tr>
                                        <tr>
                                            <td>چرخ</td>
                                            <td>12″</td>
                                        </tr>
                                        <tr>
                                            <td>ابعاد</td>
                                            <td>10 × 10 × 10 سانتی متر</td>
                                        </tr>
                                        <tr>
                                            <td>ماده</td>
                                            <td>آهن</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                       {{-- <div class="single-tabs-box">
                            <h2><span>نظرات</span></h2>
                            <div class="inner-box">
                                <div class="products-review-comments">
                                    <div class="user-review">
                                        <img src="assets/img/user/user1.jpg" alt="image">
                                        <div class="review-rating">
                                            <div class="review-stars">
                                                <i class="ri-star-fill checked"></i>
                                                <i class="ri-star-fill checked"></i>
                                                <i class="ri-star-fill checked"></i>
                                                <i class="ri-star-fill checked"></i>
                                                <i class="ri-star-fill checked"></i>
                                            </div>
                                        </div>
                                        <span class="d-block sub-comment">جیمز اندرسون</span>
                                        <p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است.</p>
                                    </div>
                                    <div class="user-review">
                                        <img src="assets/img/user/user2.jpg" alt="image">
                                        <div class="review-rating">
                                            <div class="review-stars">
                                                <i class="ri-star-fill checked"></i>
                                                <i class="ri-star-fill checked"></i>
                                                <i class="ri-star-fill checked"></i>
                                                <i class="ri-star-fill"></i>
                                                <i class="ri-star-fill"></i>
                                            </div>
                                        </div>
                                        <span class="d-block sub-comment">جیمز اندرسون</span>
                                        <p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است.</p>
                                    </div>
                                    <div class="user-review">
                                        <img src="assets/img/user/user3.jpg" alt="image">
                                        <div class="review-rating">
                                            <div class="review-stars">
                                                <i class="ri-star-fill checked"></i>
                                                <i class="ri-star-fill checked"></i>
                                                <i class="ri-star-fill checked"></i>
                                                <i class="ri-star-fill checked"></i>
                                                <i class="ri-star-fill checked"></i>
                                            </div>
                                        </div>
                                        <span class="d-block sub-comment">جیمز اندرسون</span>
                                        <p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است.</p>
                                    </div>
                                    <div class="user-review">
                                        <img src="assets/img/user/user4.jpg" alt="image">
                                        <div class="review-rating">
                                            <div class="review-stars">
                                                <i class="ri-star-fill checked"></i>
                                                <i class="ri-star-fill checked"></i>
                                                <i class="ri-star-fill checked"></i>
                                                <i class="ri-star-fill checked"></i>
                                                <i class="ri-star-fill"></i>
                                            </div>
                                        </div>
                                        <span class="d-block sub-comment">جیمز اندرسون</span>
                                        <p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است.</p>
                                    </div>
                                </div>
                                <div class="review-form-wrapper">
                                    <h3>افزودن نظر</h3>
                                    <p class="comment-notes">آدرس ایمیل شما منتشر نخواهد شد. قسمتهای مورد نیاز علامت گذاری شده اند <span>*</span></p>
                                    <form>
                                        <div class="row">
                                            <div class="col-lg-12 col-md-12">
                                                <div class="rating">
                                                    <input type="radio" id="star5" name="rating" value="5" /><label for="star5"></label>
                                                    <input type="radio" id="star4" name="rating" value="4" /><label for="star4"></label>
                                                    <input type="radio" id="star3" name="rating" value="3" /><label for="star3"></label>
                                                    <input type="radio" id="star2" name="rating" value="2" /><label for="star2"></label>
                                                    <input type="radio" id="star1" name="rating" value="1" /><label for="star1"></label>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" placeholder="نام *">
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6">
                                                <div class="form-group">
                                                    <input type="email" class="form-control" placeholder="ایمیل *">
                                                </div>
                                            </div>
                                            <div class="col-lg-12 col-md-12">
                                                <div class="form-group">
                                                    <textarea placeholder="موضوع شما" class="form-control" cols="30" rows="6"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-lg-12 col-md-12">
                                                <p class="comment-form-cookies-consent">
                                                    <input type="checkbox" id="test1">
                                                    <label for="test1">نام ، ایمیل و وب سایت من را برای دفعه بعدی که نظر می دهم در این مرورگر ذخیره کنید.</label>
                                                </p>
                                            </div>
                                            <div class="col-lg-12 col-md-12">
                                                <button type="submit">مشترک شدن</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>--}}
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="products-area pb-70">
        <div class="container">
            <div class="section-title">
                <h2>محصولات مشابه</h2>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="single-products-box">
                        <div class="image">
                            <a href="products-details.html" class="d-block"><img src="assets/img/products/products-img1.jpg" alt="image"></a>
                            <ul class="buttons-list">
                                <li>
                                    <a href="cart.html">
                                        <i class="ri-shopping-cart-2-line"></i>
                                        <span class="tooltip-label">افزودن خرید</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="ri-heart-line"></i>
                                        <span class="tooltip-label">افزودن علاقه مندی ها</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#productsQuickView">
                                        <i class="ri-search-2-line"></i>
                                        <span class="tooltip-label">مشاهده سریع</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="content">
                            <h3><a href="products-details.html">تی شرت</a></h3>
                            <div class="rating">
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                            </div>
                            <div class="price">
                                <span class="new-price">75000 تومان</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="single-products-box">
                        <div class="image">
                            <a href="products-details.html" class="d-block"><img src="assets/img/products/products-img2.jpg" alt="image"></a>
                            <ul class="buttons-list">
                                <li>
                                    <a href="cart.html">
                                        <i class="ri-shopping-cart-2-line"></i>
                                        <span class="tooltip-label">افزودن خرید</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="ri-heart-line"></i>
                                        <span class="tooltip-label">افزودن علاقه مندی ها</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#productsQuickView">
                                        <i class="ri-search-2-line"></i>
                                        <span class="tooltip-label">مشاهده سریع</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="content">
                            <h3><a href="products-details.html">فنجان قهوه</a></h3>
                            <div class="rating">
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-half-line"></i>
                            </div>
                            <div class="price">
                                <span class="new-price">94000 تومان</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="single-products-box">
                        <div class="image">
                            <a href="products-details.html" class="d-block"><img src="assets/img/products/products-img3.jpg" alt="image"></a>
                            <ul class="buttons-list">
                                <li>
                                    <a href="cart.html">
                                        <i class="ri-shopping-cart-2-line"></i>
                                        <span class="tooltip-label">افزودن خرید</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="ri-heart-line"></i>
                                        <span class="tooltip-label">افزودن علاقه مندی ها</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#productsQuickView">
                                        <i class="ri-search-2-line"></i>
                                        <span class="tooltip-label">مشاهده سریع</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="content">
                            <h3><a href="products-details.html">کیف کاغذی</a></h3>
                            <div class="rating">
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-fill"></i>
                                <i class="ri-star-line"></i>
                            </div>
                            <div class="price">
                                <span class="new-price">64000 تومان</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
