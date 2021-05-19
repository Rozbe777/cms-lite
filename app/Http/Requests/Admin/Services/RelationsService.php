<?php


namespace App\Http\Requests\Admin\Services;


class RelationsService
{
    public function tagService($instance, $tag_list_old = [], $tag_list_new = [])
    {
        if (is_array($tag_list_old)) {
            foreach ($tag_list_old as $old) {
                $instance->tags()->detach($old);
            }
        }
        if (is_array($tag_list_new)) {
            foreach ($tag_list_new as $new) {
                $instance->tags()->syncWithoutDetaching($new);
            }
        }

    }

    public function categoryService($instance, $category_list_old = [], $category_list_new = [])
    {
        if (is_array($category_list_old)) {
            foreach ($category_list_old as $old) {
                $instance->categories()->detach($old);
            }
        }
        if (is_array($category_list_new)) {
            foreach ($category_list_new as $new) {
                $instance->categories()->syncWithoutDetaching($new);
            }
        }
    }

}
