<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttributesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attributes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('product_id')->index();
            $table->bigInteger('product_code')->unique();
            $table->bigInteger('price');
            $table->bigInteger('discount')->default(0);
            $table->integer('discount_percentage')->default(0);
            $table->enum('discount_status',['active','deactivate'])->default('deactivate');
            $table->bigInteger('count')->nullable();
            $table->bigInteger('limit')->nullable();
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
        Schema::dropIfExists('attributes');
    }
}
