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
            {!! $content->content !!}
        </div>
    </section>




@endsection
