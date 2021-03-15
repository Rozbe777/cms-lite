<?php

namespace App\Http\Controllers\Admin\Content;

use App\Http\Controllers\Api\Content\Traits\CreateContentTrait;
use App\Http\Controllers\Api\Content\Traits\EditContentTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Content\CreateContentRequest;
use App\Http\Requests\Admin\Content\EditContentRequest;
use App\Http\Requests\Admin\Content\multipleDestroyRequest;
use App\Http\Requests\Admin\Content\SearchContentRequest;
use App\Models\Content;
use Illuminate\Http\Request;

class ContentController extends Controller
{

    use CreateContentTrait,EditContentTrait;
    public function index()
    {
        $content=Content::paginate(12);

        return adminView("pages.admin.content.index")->with('content',$content);

    }

    public function store(CreateContentRequest $request){
        $content=$this->createContent(
            [
                'owner'=>$request->input('owner'),
                'title'=>$request->input('title'),
                'slug'=>$request->input('slug'),
                'content'=>$request->input('content'),
                'fields'=>$request->input('fields'),
                'status'=>$request->input('status'),
                'user_id'=>$request->input('user_id'),
                'layout_id'=>$request->input('layout_id'),
                'image'=>$request->input('image'),
                'comment_status'=>$request->input('comment_status'),
                'weight'=>$request->input('weight'),
            ]
        );

        return redirect(route("admin.content.index"))->with("info", "ثبت محتوا با موفقیت انجام شد");



    }

    public function create()
    {
        return adminView("pages.admin.content.create");
    }

    public function edit($contentId)
    {
        $content=Content::findOrFail($contentId);
        return adminView("pages.admin.content.edit")->with("content",$content);
    }

    public function destroy($id)
    {
        Content::findOrFail($id)->delete();
        return redirect(route("admin.content.index"))->with("info", "عملیات حذف محتوا موفقیت انجام شد");
    }

    public function multipleDestroy(multipleDestroyRequest $request)
    {
        if (isset($request->contentIds))
            Content::where('id',$request->input('contentIds'))->delete();

        return redirect(route("admin.content.index"))->with('info','محتوا های انتخاب شده حذف شدند');

    }

    public function update(EditContentRequest $request,$contentId)
    {
//|unique:contents,title&slug,'.$this->request->get("contentId")
        $content=$this->EditContent([
            'owner'=>$request->input('owner'),
            'title'=>$request->input('title'),
            'slug'=>$request->input('slug'),
            'content'=>$request->input('content'),
            'fields'=>$request->input('fields'),
            'status'=>$request->input('status'),
            'user_id'=>$request->input('user_id'),
            'layout_id'=>$request->input('layout_id'),
            'image'=>$request->input('image'),
            'comment_status'=>$request->input('comment_status'),
            'weight'=>$request->input('weight'),
            'content_id'=>$contentId,


        ]);


        return redirect(route("admin.content.edit",$contentId))->with("info", "عملیات ویرایش محتوا با موفقیت انجام شد");


    }

    public function search(SearchContentRequest $request){
        $searchHelper=new \ContentSearchHelper($request);
        $contents=$searchHelper->searchContents();
        $contents=$searchHelper->ownerContents($contents);
        $contents=$searchHelper->commentStatusContents($contents);
        $contents=$searchHelper->statusContents($contents);

        return adminView("pages.admin.content.index")->with('contents',$contents);

    }

}
