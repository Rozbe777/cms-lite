<!doctype html>
<html lang="fa" dir="rtl">
@include(includes('head'))
<body>

@include(includes('header'))

@yield('content')
@include(includes('footer'))

<div class="go-top"><i class="ri-arrow-up-s-line"></i></div>
@include(includes('scripts'))
</body>
</html>
