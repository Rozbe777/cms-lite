<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComponentItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('component_items', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('component_data_id')->unsigned();
            $table->string('title');
            $table->longText('content')->nullable();
            $table->string('image')->nullable();
            $table->string('icon')->nullable();
            $table->json('payload')->nullable();
            $table->enum('status', ['active', 'deactivate'])->default('active');
            $table->bigInteger('wight')->default(0);
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
        Schema::dropIfExists('component_items');
    }
}
