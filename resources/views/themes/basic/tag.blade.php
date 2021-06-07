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
            <h3 class="text-heading">{{ $data->name }}</h3>
            <div class="blog-info-link mt-3 mb-4">
                <p><i class="far fa-user" style="padding: 0 1em"></i> نویسنده </p><p>{{ $data->user->name }} {{ $data->user->last_name }}</p>
                <p> تعداد بازدید<i class="far fa-eye" style="padding: 0 0.2em"></i>{{ $data->viewCounts->view_count }}</p>
            </div>
        </div>
    </section>
    <!-- End Sample Area -->

    <!-- Start Align Area -->
    <div class="whole-wrap">
        <div class="container box_1170">
            <div class="section-top-border">
                <h3 class="mb-30">Table</h3>
                <div class="progress-table-wrap">
                    <div class="progress-table">
                        <div class="table-head">
                            <div class="serial">#</div>
                            <div class="country">تعداد بازدید کل</div>
                            <div class="visit">تاریخ انتشار</div>
                        </div>
                        <?php $tags = \App\Models\Tag::with('user')->with('contents')->get(); $i = 1; ?>
                        @foreach( $tags as $index )
                        <div class="table-row">
                            <div class="serial"> <?php echo $i ?> </div>
                            <div class="country"><img src="{{ asset("portal/img/elements/f$i.jpg") }}" alt="flag">{{ $index->name }}</div>
                            <div class="visit">{{ $index->viewCounts->view_count }}</div>
                            <div class="percentage">
                                <div class="progress">
                                    <div class="progress-bar color-1" role="progressbar" style="width: 59%"
                                         aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                            <?php $i++; ?>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
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

{{--                <div class="row">--}}
{{--                    @foreach($data->contents as $content)--}}
{{--                        @if($content->owner != "page")--}}
{{--                            <div class="col-lg-3 col-sm-6">--}}
{{--                                <div class="single_category_product">--}}

{{--                                    <div class="single_category_img">--}}
{{--                                        <img src="{{ asset(" portal/img/category/category_5.png") }}" alt="">--}}
{{--                                        <div class="category_product_text">--}}
{{--                                            <a href="{{ $content->url }}"><h5>{{ $content->title }}</h5></a>--}}
{{--                                            <p class="far fa-eye" style="padding: 0 0.2em">{{ $data->viewCounts->view_count }}</p>--}}
{{--                                        </div>--}}
{{--                                    </div>--}}

{{--                                </div>--}}
{{--                            </div>--}}
{{--                        @endif--}}
{{--                    @endforeach--}}
{{--                </div>--}}
            </div>
        </section>
    </div>
    </div>
    <!-- End Align Area -->

@endsection
