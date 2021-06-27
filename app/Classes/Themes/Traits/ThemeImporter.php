<?php


namespace App\Classes\Themes\Traits;


use App\Http\Controllers\Admin\Page\Traits\PageTrait;
use App\Models\Page;
use App\Models\Theme;

trait ThemeImporter
{
    use PageTrait;

    function general($general)
    {
        $themeModel = new Theme();
        $themeModel->name = $general['name'];
        $themeModel->display_name = $general['display_name'];
        $themeModel->developer = $general['developer'];
        $themeModel->developer_link = $general['developer_link'];
        $themeModel->description = $general['description'];
        $themeModel->status = !empty($general['is_default']) ? 'active' : 'deactivate';
        $themeModel->created_at = now();
        $themeModel->save();
    }

    function createPage($pages)
    {
        foreach ($pages as $page) {
            $p = new Page();
            $p->owner = 'page';
            $p->title = $page['title'];
            $p->slug = $this->slugHandler($page['title']);
            $p->is_index = $page['is_index'];
            $p->content = $page['content'];
            $p->metadata = (string)json_encode(json_encode(['robots' => false]));
            $p->published_at = $page['published_at'];
            $p->user_id = 1;
            $p->save();
            $p->viewCounts()->create();
        }
    }

}
