<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlockLoginMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ((Auth::user() != null) && (in_array($request->route()->getName(), ["show.login", "show.register"]))) {
            return redirect()->route('dashboard.index');
        }
            return $next($request);
        }

}
