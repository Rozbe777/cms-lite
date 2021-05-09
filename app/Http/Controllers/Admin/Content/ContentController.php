<?php

namespace App\Http\Controllers\Admin\Content;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Content\CreateContentRequest;
use App\Http\Requests\Admin\Content\EditContentRequest;
use App\Http\Requests\Admin\Content\multipleDestroyRequest;
use App\Models\Content;
use App\Repositories\ContentRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ContentController extends Controller
{

    protected $contentRepository;

    public function __construct(ContentRepository $contentRepository)
    {
        $this->contentRepository = $contentRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json([
            'data' => $this->contentRepository->all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function create()
    {
        return adminView("pages.admin.content.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateContentRequest $request)
    {
        return response()->json([
           'data'=> $this->contentRepository->create($request->all())
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Content  $content
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Content $content)
    {
        return response()->json([
            "data" => $content
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Content  $content
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function edit(Content $content)
    {
        return adminView("pages.admin.content.edit",compact('content'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Content  $content
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(EditContentRequest $request, Content $content)
    {
        return response()->json([
            'data'=> $this->contentRepository->update($request->all(),$content)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Content  $content
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Content $content)
    {
        return response()->json([
            'data'=>$this->contentRepository->delete($content)
        ]);
    }

    public function multipleDestroy(multipleDestroyRequest $request)
    {dd($request->all());
        $this->contentRepository->multipleDestroy($request);
    }
}
