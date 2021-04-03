<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 255);
            $table->string('slug', 255);
            $table->string('image', 255)->nullable();
            $table->text('description')->nullable();
            $table->text('fields')->nullable();
            $table->integer('parent_id')->default(0);
            $table->bigInteger('layout_id')->unsigned()->default(0);
            $table->bigInteger('module_id')->default(1);
            $table->enum('status', ['active', 'deactivate'])->default('deactivate');
            $table->softDeletes();
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
        Schema::dropIfExists('categories');
    }
}