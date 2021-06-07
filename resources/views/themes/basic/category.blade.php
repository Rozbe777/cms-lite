@extends('themes.basic.includes.main')
@section('content')

    <!--================Single Product Area =================-->
    <div class="product_image_area section_padding">
        <div class="container">
            <div class="row s_product_inner">
                <div class="col-lg-5">
                    <div class="product_slider_img">
                        <div id="vertical">
                            <div data-thumb="img/product_details/prodect_details_1.png">
                                <img src="{{ asset("portal/img/product_details/prodect_details_3.png") }}" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5 offset-lg-1">
                    <div class="s_product_text">
                        <h3>{{ $data->name }}</h3>
                        <h2>{{ $data->slug }}</h2>
                        <ul class="blog-info-link mt-3 mb-4">
                            <li><p><i class="far fa-user" style="padding: 0 1em"></i> نویسنده </p>{{ $data->user->name }} {{ $data->user->last_name }}</li>
                        </ul>
                        <ul class="blog-info-link mt-3 mb-4">
                            <li><p> تعداد بازدید<i class="far fa-eye" style="padding: 0 0.2em"></i>{{ $data->viewCounts->view_count }}</p></li>
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
        </div>
    </div>
    <!--================End Single Product Area =================-->


    <!-- product_list part start-->
    <section class="product_list best_seller padding_bottom">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section_tittle text-center">
                        <h2>محتواهای مرتبط</h2>
                    </div>
                </div>
            </div>

            <div class="row">
                @foreach($data->contents as $content)
                    @if($content->owner != "page")
                <div class="col-lg-3 col-sm-6">
                    <div class="single_category_product">

                        <div class="single_category_img">
                            <img src="{{ asset("portal/img/category/category_5.png") }}" alt="">
                            <div class="category_product_text">
                                <a href="{{ $content->url }}"><h5>{{ $content->title }}</h5></a>
                                <p class="far fa-eye" style="padding: 0 0.2em">{{ $data->viewCounts->view_count }}</p>
                            </div>
                        </div>

                    </div>
                </div>
                    @endif
                @endforeach
            </div>
        </div>
    </section>
    <!-- product_list part end-->

@endsection

