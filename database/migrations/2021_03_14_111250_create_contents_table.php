<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contents', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->enum('owner', ["page", "content"])->default('content');
            $table->string('title', 255);
            $table->string('slug', 255)->unique();
            $table->longText('content')->nullable();
            $table->longText('metadata')->nullable();
//            $table->longText('fields')->nullable();
            $table->enum('status', ["active", "pending", "deactivate"])->default('active');
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('page_id')->unsigned();
            $table->bigInteger('layout_id')->default(0);
            $table->string('image')->nullable()->default(0);
            $table->enum('comment_status', ['active', 'deactivate'])->default('active');
//            $table->bigInteger('weight')->default(0);
            $table->boolean('is_index')->default(0);
            $table->integer('is_menu')->default(0);
            $table->timestamp('published_at')->default(\Carbon\Carbon::now());
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
        Schema::dropIfExists('contents');
    }
}
