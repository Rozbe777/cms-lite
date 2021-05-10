<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserPermission
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
        if (auth()->guest())
            return redirect()->route('show.login');

        if (!auth()->user()->can(request()->route()->getName())) {
            return $request->ajax() ? response(["message" => "شما دسترسی به این بخش را ندارید"],403) : abort(403);
        }

        return $next($request);
    }
}
