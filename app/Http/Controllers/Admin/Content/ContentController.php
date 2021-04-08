<?php

namespace App\Http\Controllers\Admin\Content;



use App\Http\Controllers\Admin\Content\Traits\EditContentTrait;
use App\Http\Controllers\Admin\Content\Traits\CreateContentTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Content\CreateContentRequest;
use App\Http\Requests\Admin\Content\EditContentRequest;
use App\Http\Requests\Admin\Content\multipleDestroyRequest;
use App\Http\Requests\Admin\Content\SearchContentRequest;
use App\Models\Content;
use App\Models\ContentTag;
use App\Models\Tag;
use Illuminate\Http\Request;

class ContentController extends Controller
{

    use CreateContentTrait,EditContentTrait;
    protected $owner='content';
    public function index()
    {
        return adminView("pages.admin.content.index");

    }

    public function list()
    {
        $content=Content::where('owner',$this->owner)->paginate(12);

        return $content;

    }

    public function store(CreateContentRequest $request){
        $content=$this->createContent(
            [
                'owner'=>$this->owner,
                'title'=>$request->input('title'),
                'slug'=>$request->input('slug'),
                'content'=>$request->input('content'),
                'fields'=>$request->input('fields'),
                'status'=>$request->input('status'),
                'user_id'=>$request->input('user_id'),
//                'layout_id'=>$request->input('layout_id'),//FIXME after insert layouts table
                'image'=>$request->input('image'),
                'comment_status'=>$request->input('comment_status'),
                'weight'=>$request->input('weight'),
                'is_index'=>$request->input('is_index'),
                'is_menu'=>$request->input('is_menu'),

            ]
        );

        if ($request->input('tag_list'))
            foreach ($request->input('tag_list') as $tagName){
                $tag=Tag::firstOrCreate([
                    'name'=>$tagName
                ]);
                ContentTag::firstOrCreate([
                    'tag_id'=>$tag->id,
                    'content_id'=>$content->id,
                ]);
            }

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
            Content::whereIn('id',$request->input('contentIds'))->delete();

        return redirect(route("admin.content.index"))->with('info','محتوا های انتخاب شده حذف شدند');

    }

    public function update(EditContentRequest $request, $contentId)
    {
        $content=$this->EditContent([
            'owner'=>$this->owner,
            'title'=>$request->input('title'),
            'slug'=>$request->input('slug'),
            'content'=>$request->input('content'),
            'fields'=>$request->input('fields'),
            'status'=>$request->input('status'),
            'user_id'=>$request->input('user_id'),
//            'layout_id'=>$request->input('layout_id'),//FIXME after insert layouts table
            'image'=>$request->input('image'),
            'comment_status'=>$request->input('comment_status'),
            'weight'=>$request->input('weight'),
            'content_id'=>$contentId,
            'is_index'=>$request->input('is_index'),
            'is_menu'=>$request->input('is_menu'),


        ]);

        if ($request->input('tag_list'))
            foreach ($request->input('tag_list') as $tagName){
                $tag=Tag::firstOrCreate([
                    'name'=>$tagName
                ]);
                ContentTag::firstOrCreate([
                    'tag_id'=>$tag->id,
                    'content_id'=>$contentId,
                ]);
            }


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
