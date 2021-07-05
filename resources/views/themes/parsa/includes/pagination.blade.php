<div class="col-lg-12 col-md-12">
        <div class="pagination-area text-center">

            @foreach ($elements as $element)
                @if (is_string($element))
                    <span class="page-numbers current">{{$element}}</span>
                @endif
                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        @if ($page == $paginator->currentPage())
                            <span class="page-numbers current">{{$page}}</span>
                        @else
                            <a href="{{ $url }}" class="page-numbers">{{ $page }}</a>
                        @endif
                    @endforeach

                @endif
            @endforeach
            @if ($paginator->hasMorePages())

                <a href="{{ $paginator->nextPageUrl() }}" class="next page-numbers"><i class="ri-arrow-left-s-line"></i></a>

            @endif

        </div>
    </div>
