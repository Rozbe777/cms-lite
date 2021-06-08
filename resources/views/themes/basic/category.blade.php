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
                    <div class="s_product_text">
                        <h3>{{ $data[0]->name }}</h3>
                        <h2>{{ $data[0]->slug }}</h2>
                        <ul class="blog-info-link mt-3 mb-4">
                            <li><p><i class="far fa-user" style="padding: 0 1em"></i> نویسنده </p>{{ $data[0]->user->name }} {{ $data[0]->user->last_name }}</li>
                        </ul>
                        <ul class="blog-info-link mt-3 mb-4">
                            <li><p> تعداد بازدید<i class="far fa-eye" style="padding: 0 0.2em"></i>{{ $data[0]->viewCounts->view_count }}</p></li>
                        </ul>
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
                        <h2>محتواهای این دسته</h2>
                    </div>
                </div>
            </div>

            <div class="row">
                @foreach($data[1] as $content)
                    @if($content->owner != "page")
                <div class="col-lg-3 col-sm-6">
                    <div class="single_category_product">
                        <div class="single_category_img">
                            <img src="{{ asset("portal/img/category/category_5.png") }}" alt="">
                            <div class="category_product_text">
                                <a href="{{ $content->url }}"><h5>{{ $content->id }}</h5></a>
                            </div>
                        </div>

                    </div>
                </div>
                    @endif
                @endforeach
                    {{ $data[1]->links() }}
            </div>
        </div>
    </section>
    <!-- product_list part end-->

@endsection

