<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComponentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('components', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('theme_id')->unsigned();
            $table->string('image');
            $table->string('name');
            $table->string('display_name');
            $table->enum('type', ['component', 'categories'])->default('component');
            $table->json('initial_payload')->nullable();
            $table->json('initial_item_payload')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('components');
    }
}
