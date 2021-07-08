<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned();
            $table->enum('status',['done','pending_pay','pending_operator','pending_delivery','process', 'rejected','failed'])->default('pending_pay');
            $table->integer('total_price')->nullable();
            $table->integer('coupon_id')->nullable();
            $table->integer('tax')->nullable();
            $table->string('description')->nullable();
            $table->integer('bank_id')->default(1);
            $table->integer('transport_id')->nullable();
            $table->integer('address_id')->nullable();
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
        Schema::dropIfExists('orders');
    }
}
