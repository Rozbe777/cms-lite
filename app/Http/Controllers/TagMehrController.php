<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Admin\Tag\Traits\CreateTagTrait;
use App\Http\Controllers\Admin\Tag\Traits\EditTagTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Tag\CreateTagRequest;
use App\Http\Requests\Admin\Tag\EditTagRequest;
use App\Http\Requests\Admin\Tag\multipleDestroyRequest;
use App\Http\Requests\Admin\Tag\SearchTagRequest;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagMehrController extends Controller
{
    use CreateTagTrait,EditTagTrait;
    public function index()
    {
        return adminView("pages.admin.tag.index");

    }

    public function list()
    {
        $tags=Tag::paginate(12);

        return $tags;

    }

    public function store(CreateTagRequest $request){
        $tag=$this->createTag(
            [
                'name'=>$request->input('name'),
            ]
        );

        return redirect(route("admin.tag.index"))->with("info", "ثبت برچسب با موفقیت انجام شد");



    }

    public function create()
    {
        return adminView("pages.admin.tag.create");
    }

    public function edit($tagId)
    {
        $tag=Tag::findOrFail($tagId);
        return adminView("pages.admin.tag.edit")->with("tag",$tag);
    }

    public function destroy($id)
    {
        Tag::findOrFail($id)->delete();
        return redirect(route("admin.tag.index"))->with("info", "عملیات حذف برچسب موفقیت انجام شد");
    }

    public function multipleDestroy(multipleDestroyRequest $request)
    {
        if (isset($request->tagIds))
            Tag::whereIn('id',$request->input('tagIds'))->delete();

        return redirect(route("admin.tag.index"))->with('info','برچسب های انتخاب شده حذف شدند');

    }



    public function update(EditTagRequest $request,$tagId)
    {
        $tag=$this->EditTag([
            'name'=>$request->input('name'),
            'tag_id'=>$tagId,


        ]);

        return redirect(route("admin.tag.edit",$tagId))->with("info", "عملیات ویرایش برچسب با موفقیت انجام شد");


    }

    public function search(SearchTagRequest $request){
        $searchHelper=new \TagSearchHelper($request);
        $tags=$searchHelper->searchTags();

        return adminView("pages.admin.tag.index")->with('tags',$tags);

    }
}
