@extends(layout('layout'))
@section('content')

    @foreach($components as $component)
        @include(components($component->component->name),['component'=>$component])
    @endforeach

@endsection
