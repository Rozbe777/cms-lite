@extends(layout('layout'))
@section('content')

    <div class="page-title-area">
        <div class="container">
            <div class="page-title-content">
                <h2>{{$tag->name}}</h2>
                <ul>
                    <li><a href="{{url('/')}}">خانه</a></li>
                    <li>{{$tag->name}}</li>
                </ul>
            </div>
        </div>
    </div>



    <div class="blog-area ptb-100">
        <div class="container">
            <div class="row justify-content-center">
                @forelse($contents as $content)
                    <div class="col-lg-4 col-md-6">
                        <div class="single-blog-post">
                            <div class="post-image">
                                <a href="{{$content->title}}" class="d-block">
                                    <img src="{{image($content->image)}}" alt="{{$content->title}}">
                                </a>
                            </div>
                            <div class="post-content">
                                <ul class="meta">
                                    <li><i class="ri-calendar-2-line"></i>{{$content->created_at}}</li>
                                    <li><i class="ri-user-voice-line"></i> <a
                                            href="{{$content->url}}">{{$content->user->fullname}}</a></li>
                                </ul>
                                <h3><a href="{{$content->url}}">{{$content->title}}</a></h3>
                                {!! $content->content !!}
                                <a href="{{$content->url}}" class="default-btn">ادامه خواندن <i
                                        class="ri-arrow-left-line"></i></a>
                            </div>
                        </div>
                    </div>
                @empty
                    <h3 class="text-center">موردی یافت نشد!</h3>
                @endforelse
                {{$contents->links(includes('pagination'))}}

            </div>
        </div>
    </div>

@endsection
