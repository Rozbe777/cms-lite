<div class="blog-area pt-100 pb-70">
    <div class="container">
        <div class="section-title">
            @if(p($component->payload,'title')->isVisible())
                <h2>{{p($component->payload,'title')->content()}}</h2>
            @endif
            @if(p($component->payload,'description')->isVisible())
                <span class="sub-title">{{p($component->payload,'description')->content()}}</span>
            @endif
        </div>
        <div class="row justify-content-center">

            @foreach($component->contents($component->type_id,p($component->payload,'limit')->content()) as $content)
                <div class="col-lg-4 col-md-6">
                    <div class="single-blog-post">
                        <div class="post-image">
                            <a href="{{$content->url}}" class="d-block">
                                <img src="{{themeAsset($content->image)}}" alt="{{$content->title}}">
                            </a>
                        </div>
                        <div class="post-content">
                            <ul class="meta">
                                <li><i class="ri-calendar-2-line"></i>{{$content->created_at}}</li>
                                <li><i class="ri-user-voice-line"></i> <a href="blog-right-sidebar.html">{{$content->user->fullname}}</a>
                                </li>
                            </ul>
                            <h3><a href="{{$content->url}}">{{$content->title}}</a></h3>
                            <p>{!! shorter(strip_tags( $content->content),200) !!}</p>
                            <a href="{{$content->url}}" class="default-btn">ادامه خواندن <i
                                    class="ri-arrow-left-line"></i></a>
                        </div>
                    </div>
                </div>
            @endforeach
            {{--<div class="col-lg-4 col-md-6">
                <div class="single-blog-post">
                    <div class="post-image">
                        <a href="blog-details.html" class="d-block">
                            <img src="{{themeAsset('img/blog/blog2.jpg')}}" alt="image">
                        </a>
                    </div>
                    <div class="post-content">
                        <ul class="meta">
                            <li><i class="ri-calendar-2-line"></i> 22 دی 1399</li>
                            <li><i class="ri-user-voice-line"></i> <a href="blog-right-sidebar.html">لرد ایوانز</a>
                            </li>
                        </ul>
                        <h3><a href="blog-details.html">راز موفقیت کسب و کار خود را به سرعت پیدا کنید</a></h3>
                        <p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم
                            ایپسوم ساختار چاپ و متن را در بر می گیرد.</p>
                        <a href="blog-details.html" class="default-btn">ادامه خواندن <i
                                class="ri-arrow-left-line"></i></a>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6">
                <div class="single-blog-post">
                    <div class="post-image">
                        <a href="blog-details.html" class="d-block">
                            <img src="{{themeAsset('img/blog/blog3.jpg')}}" alt="image">
                        </a>
                    </div>
                    <div class="post-content">
                        <ul class="meta">
                            <li><i class="ri-calendar-2-line"></i> 22 دی 1399</li>
                            <li><i class="ri-user-voice-line"></i> <a href="blog-right-sidebar.html">لرد ایوانز</a>
                            </li>
                        </ul>
                        <h3><a href="blog-details.html">راز موفقیت کسب و کار خود را به سرعت پیدا کنید</a></h3>
                        <p>لورم ایپسوم ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم استاندارد صنعت بوده است. لورم
                            ایپسوم ساختار چاپ و متن را در بر می گیرد.</p>
                        <a href="blog-details.html" class="default-btn">ادامه خواندن <i
                                class="ri-arrow-left-line"></i></a>
                    </div>
                </div>
            </div>--}}
        </div>
    </div>
</div>
