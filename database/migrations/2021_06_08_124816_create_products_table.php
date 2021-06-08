<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('code');
            $table->string('title', 255);
            $table->string('slug', 255)->unique();
            $table->float('price', null,null);
            $table->longText('content')->nullable();
            $table->longText('metadata')->nullable();
//            $table->longText('fields')->nullable();
            $table->enum('status', ["active", "deactivate"])->default('active');
            $table->bigInteger('user_id')->unsigned();
            $table->string('image')->nullable()->default(null);
            $table->enum('comment_status', ['active', 'deactivate'])->default('active');
//            $table->bigInteger('weight')->default(0);
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
        Schema::dropIfExists('products');
    }
}
