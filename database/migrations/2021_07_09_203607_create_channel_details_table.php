<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChannelDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('channel_details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('sale_channel_id')->unsigned();
            $table->string('token')->nullable();
            $table->json('payload')->nullable();
            $table->enum('status',['active','deactivate'])->nullable('active');
            $table->timestamp('expired_at')->nullable();
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
        Schema::dropIfExists('channel_details');
    }
}
