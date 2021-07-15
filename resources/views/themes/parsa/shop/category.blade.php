@extends(layout('layout'))
@section('content')

    <div class="page-title-area">
        <div class="container">
            <div class="page-title-content">
                <h2>{{$category->name}}</h2>
                <ul>
                    <li><a href="{{url('/')}}">خانه</a></li>
                    <li>{{$category->name}}</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="products-area ptb-100">
        <div class="container">
            <div class="enry-grid-sorting row align-items-center">
                <div class="col-lg-6 col-md-6 result-count">
                    <p>لیست محصولات</p>
                </div>
                <div class="col-lg-6 col-md-6 ordering">
                    <div class="select-box">
                        <label>مرتب سازی:</label>
                        <select>
                            <option>پیشفرض</option>
                            <option>محبوبیت</option>
                            <option>آخرین ها</option>
                            <option>قیمت: ارزان تا گران</option>
                            <option>قیمت: گران تا ارزان</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                @forelse($products as $product)
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-products-box">
                            <div class="image">
                                <a href="{{$product->url}}" class="d-block"><img
                                        src="{{image($product->image)}}" alt="{{$product->title}}"></a>
                                <ul class="buttons-list">
                                    <li>
                                        <a href="cart.html">
                                            <i class="ri-shopping-cart-2-line"></i>
                                            <span class="tooltip-label">افزودن خرید</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="ri-heart-line"></i>
                                            <span class="tooltip-label">افزودن علاقه مندی</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#productsQuickView">
                                            <i class="ri-search-2-line"></i>
                                            <span class="tooltip-label">مشاهده سریع</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="content">
                                <h3><a href="{{$product->url}}">{{$product->title}}</a></h3>
                                <div class="rating">
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-fill"></i>
                                </div>
                                <div class="price">
                                    <span class="new-price">{{number_format($product->attributes()->first()->final_price)}} تومان</span>
                                </div>
                            </div>
                        </div>
                    </div>
                @empty
                    <h4 class="text-center">موردی یافت نشد!</h4>
                @endforelse
                @if(sizeof($products))
                    {{$products->links(includes('pagination'))}}
                @endif

            </div>
        </div>
    </div>

@endsection
