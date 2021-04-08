<?php

namespace App\Http\Controllers\Admin\Page;

use App\Http\Controllers\Admin\Content\ContentController;
use App\Http\Requests\Admin\Content\CreateContentRequest;
use App\Http\Requests\Admin\Content\EditContentRequest;
use App\Http\Requests\Admin\Content\multipleDestroyRequest;
use App\Http\Requests\Admin\Content\SearchContentRequest;
use App\Models\Content;
use App\Models\ContentTag;
use App\Models\Tag;


class PageController extends ContentController
{
    protected $owner='page';


    public function index()
    {
        return adminView("pages.admin.page.index");

    }

    public function list()
    {

        $content=Content::where('owner',$this->owner)->paginate(12);

        return $content;

    }

    public function store(CreateContentRequest $request){
        $page=$this->createContent(
            [
                'owner'=>$this->owner,
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
                    'content_id'=>$page->id,
                ]);
            }

        return redirect(route("admin.page.index"))->with("info", "ثبت صفحه با موفقیت انجام شد");



    }

    public function create()
    {
        return adminView("pages.admin.page.create");
    }

    public function edit($pageId)
    {
        $page=Content::findOrFail($pageId);
        return adminView("pages.admin.page.edit")->with("page",$page);
    }

    public function destroy($id)
    {
        Content::findOrFail($id)->delete();
        return redirect(route("admin.page.index"))->with("info", "عملیات حذف صفحه موفقیت انجام شد");
    }

    public function multipleDestroy(multipleDestroyRequest $request)
    {
        if (isset($request->pageIds))
            Content::whereIn('id',$request->input('pageIds'))->delete();

        return redirect(route("admin.page.index"))->with('info','صفحه های انتخاب شده حذف شدند');

    }

    public function update(EditContentRequest $request, $contentId)
    {
//|unique:contents,title&slug,'.$this->request->get("contentId")
        $page=$this->EditContent([
            'owner'=>$this->owner,
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


        return redirect(route("admin.page.edit",$contentId))->with("info", "عملیات ویرایش صفحه با موفقیت انجام شد");


    }

    public function search(SearchContentRequest $request){
        $searchHelper=new \ContentSearchHelper($request);
        $pages=$searchHelper->searchContents();
        $pages=$searchHelper->ownerContents($pages);
        $pages=$searchHelper->commentStatusContents($pages);
        $pages=$searchHelper->statusContents($pages);

        return adminView("pages.admin.page.index")->with('pages',$pages);

    }

}
