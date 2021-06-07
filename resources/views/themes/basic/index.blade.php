@extends('themes.basic.includes.main')
@section('content')


    <!-- product_list part start-->
    <section class="product_list best_seller padding_bottom">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="section_tittle text-center">
                        <h2>محتواهای یافت شده</h2>
                    </div>
                </div>
            </div>

            <div class="row">
                @foreach($data as $content)
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
                {{ $data->links() }}
            </div>
        </div>
    </section>

@endsection
