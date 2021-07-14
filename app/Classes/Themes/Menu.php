<?php


namespace App\Classes\Themes;


use App\Models\Category;
use App\Models\Content;

class Menu
{
    function all()
    {
        $menus = [];
        $pages = $this->getPages();
        $contents = $this->getContents();
        $categories = $this->getCategories();
        $menus = array_merge($contents, $menus);
        $menus = array_merge($categories, $menus);
        $menus = array_merge($pages, $menus);
        return $menus;
    }

    function getCategories()
    {
        $categories = Category::active()->isMenu()->isParent()->get();
        $menus = [];
        foreach ($categories as $i => $category) {
            $menus[$i]['name'] = $category->name;
            $menus[$i]['url'] = $category->url;
            $menus[$i]['children'] = $this->getCategoryChildren($category->id);
        }
        return $menus;
    }

    function getCategoryChildren($categoryId)
    {
        $menus = [];
        $categories = Category::active()->isMenu()->parentId($categoryId)->get();
        foreach ($categories as $i => $category) {
            $menus[$i]['name'] = $category->name;
            $menus[$i]['url'] = $category->url;
            $childrenCategories = Category::active()->isMenu()->parentId($category->id)->get();
            if (sizeof($childrenCategories)) {
                $menus[$i]['children'] = $this->getCategoryChildren($category->id);
            }

        }

        return $menus;
    }

    function getPages()
    {
        $pages = Content::page()->active()->isMenu()->get();
        $menus = [];
        foreach ($pages as $i => $page) {
            $menus[$i]['name'] = $page->title;
            $menus[$i]['url'] = $page->url;
        }
        return $menus;
    }

    function getContents()
    {
        $pages = Content::content()->active()->isMenu()->get();
        $menus = [];
        foreach ($pages as $i => $page) {
            $menus[$i]['name'] = $page->title;
            $menus[$i]['url'] = $page->url;
        }
        return $menus;
    }
}
