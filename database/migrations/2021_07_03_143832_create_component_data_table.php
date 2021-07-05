<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComponentDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('component_data', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('content_id')->unsigned();
            $table->bigInteger('component_id')->unsigned();
            $table->bigInteger('type_id')->default(0);
            $table->json('payload')->nullable();
            $table->bigInteger('wight')->default(0);
            $table->enum('status', ['active', 'deactivate'])->default('active');
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
        Schema::dropIfExists('component_data');
    }
}
