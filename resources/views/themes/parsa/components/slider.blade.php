<div class="home-slides owl-carousel owl-theme">
    @foreach($component->items as $item)
        <div class="single-banner-item "
             style="background-image: url('{{themeAsset(p($item->payload,'background')->content())}}');">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 col-md-12">
                        <div class="banner-item-content">
                            <h1>{{$item->title}}</h1>
                            <p>{!! $item->content !!}</p>
                            <div class="btn-box">
                                @if(p($item->payload,'first_button')->isVisible())
                                    <a href="{{p($item->payload,'first_button','link')->content()}}"
                                       class="default-btn">{{p($item->payload,'first_button','title')->content()}}<i
                                            class="{{p($item->payload,'first_button','icon')->content()}}"></i></a>
                                @endif
                                @if(p($item->payload,'second_button')->isVisible())
                                    <a href="{{p($item->payload,'second_button','link')->content()}}"
                                       class="default-btn">{{p($item->payload,'second_button','title')->content()}}<i
                                            class="{{p($item->payload,'second_button','icon')->content()}}"></i></a>
                                @endif
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="banner-item-image">
                            <img src="{{themeAsset($item->image)}}" alt="image">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endforeach
</div>
