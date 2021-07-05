<?php


namespace App\Classes\Themes\Traits;


use App\Http\Controllers\Admin\Content\Traits\ContentTrait;
use App\Http\Controllers\Admin\Page\Traits\PageTrait;
use App\Models\Component;
use App\Models\ComponentData;
use App\Models\ComponentItem;
use App\Models\Content;
use App\Models\Page;
use App\Models\Theme;
use App\Models\ThemeSetting;

trait ThemeImporter
{
    use PageTrait;

    public $themeId = 0;


    function getUserId()
    {
        return (auth()->check()) ? auth()->id() : 1;
    }

    function general($general)
    {
        $themeModel = new Theme();
        $themeModel->user_id = $this->getUserId();
        $themeModel->name = $general['name'];
        $themeModel->display_name = $general['display_name'];
        $themeModel->developer = $general['developer'];
        $themeModel->developer_link = $general['developer_link'];
        $themeModel->description = $general['description'];
        $themeModel->status = !empty($general['is_default']) ? 'active' : 'deactivate';
        $themeModel->created_at = now();
        $themeModel->save();
        $this->themeId = $themeModel->id;
        return $themeModel;
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
            $p->user_id = $this->getUserId();
            $p->save();
            $p->viewCounts()->create();
        }
    }

    function createContent($contents)
    {
        foreach ($contents as $content) {
            $c = new Content();
            $c->owner = 'content';
            $c->title = $content['title'];
            $c->slug = $this->slugHandler($content['title']);

            $c->is_index = 0;
            $c->content = $content['content'];
            if(!empty($content['image']))
            $c->image = $content['image'];
            $c->metadata = (string)json_encode(json_encode(['robots' => false]));
            if (empty($content['published_at']))
                $c->published_at = $content['published_at'];
            else
                $c->published_at = now();
            $c->user_id = $this->getUserId();
            $c->save();
            $c->viewCounts()->create();
        }
    }

    function createSettings($settings)
    {
        foreach ($settings as $setting) {
            $s = new ThemeSetting();
            $s->user_id = $this->getUserId();
            $s->theme_id = $this->themeId;
            $s->name = $setting['name'];
            $s->display_name = $setting['display_name'];
            $s->status = $setting['status'];
            $s->value = json_encode($setting['value']);
            $s->save();
        }
    }

    function createComponent($components)
    {

        foreach ($components as $component) {
            $c = new Component();
            $c->theme_id = $this->themeId;
            $c->image = $component['image'];
            $c->type = $component['type'];

            $c->name = $component['name'];
            $c->display_name = $component['display_name'];
            $c->initial_payload = json_encode($component['initial_payload']);
            if (!empty($c->initial_item_payload))
                $c->initial_item_payload = json_encode($component['initial_item_payload']);
            $c->save();

            $cd = new  ComponentData();
            $cd->component_id = $c->id;
            if (!empty($c->type_id))
                $cd->type_id = $component['type_id'];
            else
                $cd->type_id = 0;
            $cd->user_id = $this->getUserId();
            $cd->content_id = 1;
            $cd->payload = json_encode($component['initial_payload']);
            $cd->save();
            if (!empty($component['items'])) {
                foreach ($component['items'] as $item) {
                    $i = new ComponentItem();
                    $i->component_data_id = $cd->id;
                    $i->title = $item['title'];
                    if (!empty($item['content']))
                        $i->content = $item['content'];
                    if (!empty($item['image']))
                        $i->image = $item['image'];
                    if (!empty($item['icon']))
                        $i->icon = $item['icon'];
                    if (!empty($item['payload']))
                        $i->payload = json_encode($item['payload']);
                    $i->save();
                }
            }

        }
    }


}
