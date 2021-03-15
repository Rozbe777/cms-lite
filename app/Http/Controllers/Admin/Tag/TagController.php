<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Http\Controllers\Admin\Tag\Traits\CreateTagTrait;
use App\Http\Controllers\Admin\Tag\Traits\EditTagTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Tag\CreateTagRequest;
use App\Http\Requests\Admin\Tag\EditTagRequest;
use App\Http\Requests\Admin\Tag\multipleDestroyRequest;
use App\Http\Requests\Admin\Tag\SearchTagRequest;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    use CreateTagTrait,EditTagTrait;
    public function index()
    {
        $tags=Tag::paginate(12);

        return adminView("pages.admin.tag.index")->with('tags',$tags);

    }

    public function store(CreateTagRequest $request){
        $tag=$this->createTag(
            [
                'name'=>$request->input('name'),
                'slug'=>$request->input('slug'),
            ]
        );

        return redirect(route("admin.tag.index"))->with("info", "ثبت برچسب با موفقیت انجام شد");



    }

    public function create()
    {
        return adminView("pages.admin.tags.create");
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
            Tag::where('id',$request->input('tagIds'))->delete();

        return redirect(route("admin.tag.index"))->with('info','برچسب های انتخاب شده حذف شدند');

    }



    public function update(EditTagRequest $request,$tagId)
    {
//|unique:tags,email,'.$this->request->get("userId")//FIXME
        $tag=$this->EditTag([
            'name'=>$request->input('name'),
            'slug'=>$request->input('slug'),
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
