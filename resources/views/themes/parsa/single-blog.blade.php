@extends(layout('layout'))
@section('content')

    <div class="page-title-area">
        <div class="container">
            <div class="page-title-content">
                <h2>{{$content->title}}</h2>
                <ul>
                    <li><a href="{{url('/')}}">خانه</a></li>
                    <li>{{$content->title}}</li>
                </ul>
            </div>
        </div>
    </div>
    <section class="blog-details-area ptb-100">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-12">
                    <div class="blog-details-desc">
                        <div class="article-image">
                            <img src="{{themeAsset($content->image)}}" alt="{{$content->title}}">
                        </div>
                        <div class="article-content">
                            <div class="entry-meta">
                                <ul>
                                    <li><i class="ri-shield-user-line"></i><a href="">{{$content->user->fullname}}</a>
                                    </li>
                                    <li><i class="ri-calendar-2-line"></i>{{$content->created_at}}</li>
                                    <li><i class="ri-message-2-line"></i><a href="">بدون نظر</a></li>
                                </ul>
                            </div>
                            <h3>{{$content->title}}</h3>

                            {!! $content->content !!}
                        </div>
                        <div class="article-footer">
                            <div class="article-tags">
                                @foreach($content->tags as $tag )
                                    <a href="{{$tag->url}}">{{$tag->name}}</a>
                                @endforeach
                            </div>
                            <div class="article-share">
                                <ul class="social">
                                    <li><span>اشتراک گذاری:</span></li>
                                    <li><a href="https://www.facebook.com/sharer/sharer.php?u={{$content->url}}" class="facebook" target="_blank"><i
                                                class="ri-facebook-fill"></i></a></li>
                                    <li><a href="http://twitter.com/share?text={{$content->title}}&url={{$content->url}}" class="twitter" target="_blank"><i class="ri-twitter-fill"></i></a>
                                    </li>
                                    <li><a href="https://www.linkedin.com/sharing/share-offsite/?url={{$content->url}}" class="linkedin" target="_blank"><i class="ri-linkedin-fill"></i></a>

                                </ul>
                            </div>
                        </div>
                        {{--<div class="comments-area">
                            <h3 class="comments-title">2 نظر:</h3>
                            <ol class="comment-list">
                                <li class="comment">
                                    <div class="comment-body">
                                        <footer class="comment-meta">
                                            <div class="comment-author vcard">
                                                <img src="assets/img/user/user1.jpg" class="avatar" alt="image">
                                                <b class="fn">جان جونز</b>
                                            </div>
                                            <div class="comment-metadata">
                                                <span>01 دی 1399 ساعت 10:59 صبح</span>
                                            </div>
                                        </footer>
                                        <div class="comment-content">
                                            <p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت
                                                بوده است. لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم
                                                استاندارد صنعت بوده است.</p>
                                        </div>
                                        <div class="reply">
                                            <a href="#" class="comment-reply-link">پاسخ</a>
                                        </div>
                                    </div>
                                    <ol class="children">
                                        <li class="comment">
                                            <div class="comment-body">
                                                <footer class="comment-meta">
                                                    <div class="comment-author vcard">
                                                        <img src="assets/img/user/user2.jpg" class="avatar" alt="image">
                                                        <b class="fn">جان جونز</b>
                                                    </div>
                                                    <div class="comment-metadata">
                                                        <span>01 دی 1399 ساعت 10:59 صبح</span>
                                                    </div>
                                                </footer>
                                                <div class="comment-content">
                                                    <p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم
                                                        استاندارد صنعت بوده است. لورم ایپسوم ساختار چاپ و متن را در بر
                                                        می گیرد. لورم ایپسوم استاندارد صنعت بوده است.</p>
                                                </div>
                                                <div class="reply">
                                                    <a href="#" class="comment-reply-link">پاسخ</a>
                                                </div>
                                            </div>
                                            <ol class="children">
                                                <li class="comment">
                                                    <div class="comment-body">
                                                        <footer class="comment-meta">
                                                            <div class="comment-author vcard">
                                                                <img src="assets/img/user/user3.jpg" class="avatar"
                                                                     alt="image">
                                                                <b class="fn">جان جونز</b>
                                                            </div>
                                                            <div class="comment-metadata">
                                                                <span>01 دی 1399 ساعت 10:59 صبح</span>
                                                            </div>
                                                        </footer>
                                                        <div class="comment-content">
                                                            <p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم
                                                                ایپسوم استاندارد صنعت بوده است. لورم ایپسوم ساختار چاپ و
                                                                متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده
                                                                است.</p>
                                                        </div>
                                                        <div class="reply">
                                                            <a href="#" class="comment-reply-link">پاسخ</a>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ol>
                                        </li>
                                    </ol>
                                </li>
                                <li class="comment">
                                    <div class="comment-body">
                                        <footer class="comment-meta">
                                            <div class="comment-author vcard">
                                                <img src="assets/img/user/user4.jpg" class="avatar" alt="image">
                                                <b class="fn">جان جونز</b>
                                            </div>
                                            <div class="comment-metadata">
                                                <span>01 دی 1399 ساعت 10:59 صبح</span>
                                            </div>
                                        </footer>
                                        <div class="comment-content">
                                            <p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت
                                                بوده است. لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم
                                                استاندارد صنعت بوده است.</p>
                                        </div>
                                        <div class="reply">
                                            <a href="#" class="comment-reply-link">پاسخ</a>
                                        </div>
                                    </div>
                                    <ol class="children">
                                        <li class="comment">
                                            <div class="comment-body">
                                                <footer class="comment-meta">
                                                    <div class="comment-author vcard">
                                                        <img src="assets/img/user/user1.jpg" class="avatar" alt="image">
                                                        <b class="fn">جان جونز</b>
                                                    </div>
                                                    <div class="comment-metadata">
                                                        <span>01 دی 1399 ساعت 10:59 صبح</span>
                                                    </div>
                                                </footer>
                                                <div class="comment-content">
                                                    <p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم
                                                        استاندارد صنعت بوده است. لورم ایپسوم ساختار چاپ و متن را در بر
                                                        می گیرد. لورم ایپسوم استاندارد صنعت بوده است.</p>
                                                </div>
                                                <div class="reply">
                                                    <a href="#" class="comment-reply-link">پاسخ</a>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                            <div class="comment-respond">
                                <h3 class="comment-reply-title">نظر بدهید</h3>
                                <form class="comment-form">
                                    <p class="comment-notes">
                                        <span id="email-notes">آدرس ایمیل شما منتشر نخواهد شد.</span>
                                        قسمتهای مورد نیاز علامت گذاری شده اند <span class="required">*</span>
                                    </p>
                                    <p class="comment-form-author">
                                        <label>نام <span class="required">*</span></label>
                                        <input type="text" id="author" placeholder="نام شما*" name="author"
                                               required="required">
                                    </p>
                                    <p class="comment-form-email">
                                        <label>ایمیل <span class="required">*</span></label>
                                        <input type="email" id="email" placeholder="ایمیل شما*" name="email"
                                               required="required">
                                    </p>
                                    <p class="comment-form-url">
                                        <label>وبسایت</label>
                                        <input type="url" id="url" placeholder="وبسایت" name="url">
                                    </p>
                                    <p class="comment-form-comment">
                                        <label>نظرات</label>
                                        <textarea name="comment" id="comment" cols="45" placeholder="نظر شما..."
                                                  rows="5" maxlength="65525" required="required"></textarea>
                                    </p>
                                    <p class="comment-form-cookies-consent">
                                        <input type="checkbox" value="yes" name="wp-comment-cookies-consent"
                                               id="wp-comment-cookies-consent">
                                        <label for="wp-comment-cookies-consent">نام ، ایمیل و وب سایت من را برای دفعه
                                            بعدی که نظر می دهم در این مرورگر ذخیره کنید.</label>
                                    </p>
                                    <p class="form-submit">
                                        <input type="submit" name="submit" id="submit" class="submit" value="ارسال نظر">
                                    </p>
                                </form>
                            </div>
                        </div>--}}
                    </div>
                </div>
                <div class="col-lg-4 col-md-12">
                    <aside class="widget-area">
                        <div class="widget widget_search">
                            <form class="search-form" action="{{url('search')}}">
                                <label><input name="query" type="search" class="search-field" placeholder="جستجو..."></label>
                                <button type="submit"><i class="ri-search-2-line"></i></button>
                            </form>
                        </div>
                        <div class="widget widget_enry_posts_thumb">
                            <h3 class="widget-title">پست های محبوب</h3>
                            @forelse($content->related_contents as $rc)
                                <article class="item">
                                    <a href="{{$rc->url}}" class="thumb"><span class="fullimage cover "
                                                                               style="    background-image: url({{themeAsset($rc->image)}});"
                                                                               role="img"></span></a>
                                    <div class="info">
                                        <h4 class="title usmall"><a href="{{$rc->url}}">{{$rc->title}}</a></h4>
                                        <span class="date"><i class="ri-calendar-2-fill"></i>{{$rc->created_at}}</span>
                                    </div>
                                </article>
                            @empty
                                <p class="text-center">موردی یافت نشد!</p>
                            @endforelse
                        </div>
                        <div class="widget widget_categories">
                            <h3 class="widget-title">دسته بندی ها</h3>
                            <ul>
                                @forelse($categories as $category)
                                    <li><a href="{{$category->url}}">{{$category->name}}</a></li>
                                @empty
                                    <p class="text-center">موردی یافت نشد!</p>
                                @endforelse
                            </ul>
                        </div>

                        <div class="widget widget_tag_cloud">
                            <h3 class="widget-title">برچسب ها</h3>
                            <div class="tagcloud">
                                @forelse($tags as $tag)
                                    <a href="{{$tag->url}}">{{$tag->name}}</span></a>
                                @empty
                                    <p class="text-center">موردی یافت نشد!</p>
                                @endforelse
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </section>




@endsection
