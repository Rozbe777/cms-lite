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
            $table->longText('content')->nullable();
            $table->longText('metadata')->nullable();
            $table->unsignedInteger('parent_id')->nullable()->default(0);
            $table->bigInteger('layout_id')->unsigned()->default(0);
            $table->bigInteger('module_id')->default(1)->comment('1:blog --- 2:store');
            $table->enum('status', ['active', 'deactivate'])->default('active');
            $table->integer('is_menu')->default(0);
            $table->bigInteger('user_id')->default(0);
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
