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
                            <p>Home / About</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- breadcrumb start-->

    <!-- Start Sample Area -->
    <section class="sample-text-area">
        <div class="container box_1170">
            <h3 class="text-heading">{{ $data[0]->name }}</h3>
            <div class="blog-info-link mt-3 mb-4">
                <p><i class="far fa-user" style="padding: 0 1em"></i> نویسنده </p>
                <p>{{ $data[0]->user->name }} {{ $data[0]->user->last_name }}</p>
                <p> تعداد بازدید<i class="far fa-eye"
                                   style="padding: 0 0.2em"></i>{{ $data[0]->viewCounts->view_count }}
                </p>
            </div>
        </div>
    </section>
    <!-- End Sample Area -->
    <!-- product_list part start-->
    <section class="product_list best_seller padding_bottom">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section_tittle text-center">
                        <h2>محتواهای این کلیدواژه</h2>
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
                                        <a href="{{ $content->url }}"><h5>{{ $content->title }}</h5></a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    @endif
                @endforeach
                <div class="col-12">
                    {{ $data[1]->links() }}
                </div>
            </div>

        </div>
    </section>
    <!-- product_list part end-->
    <!-- End Align Area -->

@endsection
