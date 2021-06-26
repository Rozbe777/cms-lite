<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGatewayesInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gatewayes_infos', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('bank_id')->default('1');
            $table->string('user_name')->nullable();
            $table->string('merchantId')->default('00000000-0000-0000-0000-000000000000');
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
        Schema::dropIfExists('gatewayes_infos');
    }
}
