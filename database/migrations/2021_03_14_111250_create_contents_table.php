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
            $table->string('slug', 255);
            $table->longText('content');
            $table->longText('fields')->nullable();
            $table->enum('status', ["preview", "active", "pending", "deactivate"])->default('active');
            $table->bigInteger('user_id')->unsigned()->default(1);
            $table->bigInteger('layout_id')->default(0);
            $table->bigInteger('view_count')->unsigned()->default(0);
            $table->string('image')->nullable()->default(0);
            $table->enum('comment_status', ['active', 'deactivate'])->default('active');
            $table->bigInteger('weight')->default(0);
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
