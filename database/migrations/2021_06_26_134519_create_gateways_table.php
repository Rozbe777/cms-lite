<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGatewaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gateways', function (Blueprint $table) {
            $table->id();
            $table->string('display_name');
            $table->integer('bank_id');
            $table->boolean('is_default')->default(0);
            $table->enum('status', ['enable', 'disable'])->default('disable');
            $table->string('merchantId')->default('00000000-0000-0000-0000-000000000000');
            $table->text('class');
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
        Schema::dropIfExists('gateways');
    }
}
