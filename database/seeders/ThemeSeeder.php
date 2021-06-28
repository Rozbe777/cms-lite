<?php

namespace Database\Seeders;

use App\Classes\Themes\Traits\ThemeImporter;
use App\Models\Theme;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    use ThemeImporter;

    private $themes = [];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->themes();

        foreach ($this->themes as $theme) {
            if (empty($theme['general']))
                continue;
            if (empty($theme['general']['is_default'])) {
                continue;
            }
            $this->general($theme['general']);
            if (!empty($theme['pages'])) {
                $this->createPage($theme['pages']);
            }

        }
    }

    function themes()
    {
        $themes = glob(base_path('database/seeders/themes/*'));
        foreach ($themes as $t) {
            $theme = glob($t . "/*.php");
            if (!empty($theme[0])) {
                $this->themes[] = include $theme[0];
            }
        }

    }
}
