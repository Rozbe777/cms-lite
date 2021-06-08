@extends('themes.basic.includes.main')
@section('content')

    <!--================Home Banner Area =================-->
    <!-- breadcrumb start-->
    <section class="breadcrumb breadcrumb_bg">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="breadcrumb_iner">
                        <div class="breadcrumb_iner_item">
                            <p>صفحه محتوا</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- breadcrumb start-->
    <!--================Blog Area =================-->
    <section class="blog_area single-post-area section_padding">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 posts-list">
                    <div class="single-post">
                        <div class="feature-img">
                            <img class="img-fluid" src="{{ asset('portal/img/blog/single_blog_1.png') }}" alt="">
                        </div>
                        <div class="blog_details">
                            <h2>{{ $data->slug }}
                            </h2>
                            <ul class="blog-info-link mt-3 mb-4">
                                <li><i class="far fa-user" style="padding: 0 1em"></i>{{ $data->user->name }} {{ $data->user->last_name }}</li>
                                <li><i class="far fa-eye" style="padding: 0 0.2em"></i>{{ $data->viewCounts->view_count }}</li>
                            </ul>
                            <p class="excert">
                                {{ $data->content }}
                            </p>
                            <p>
                                {{ $data->metadata }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="blog_right_sidebar">
                        <aside class="single_sidebar_widget search_widget">
                            <form method="post" action="{{ route('front.search') }} ">
                                @csrf
                                @error('slug')
                                <div class="error text-danger">{{ $message }}</div>
                                @enderror
                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <input id="search-slug" type="text" class="form-control" name="slug" placeholder='Search Keyword'>
                                    </div>
                                </div>
                                <button class="button rounded-0 primary-bg text-white w-100 btn_1" type="submit">Search</button>
                            </form>
                        </aside>
                        <aside class="single_sidebar_widget post_category_widget">
                            <h4 class="widget_title">عنوان</h4>
                            <ul class="list cat-list">
                                <li>
                                    <p> {{$data->slug}} </p>
                                </li>
                            </ul>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--================Blog Area end =================-->
@endsection
