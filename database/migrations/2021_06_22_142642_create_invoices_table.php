<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->char('title', 255)->default('noname');
            $table->integer('gateway_id')->default(0);
            $table->string('callback_url')->nullable();
            $table->json('payload')->nullable();
            $table->text('description')->nullable();
            $table->integer('amount')->default(0);
            $table->enum('status', ['paid', 'unpaid', 'fail'])->default('unpaid');
            $table->string('bank_result')->nullable();
            $table->bigInteger('user_id')->unsigned();
            $table->integer('order_id')->unsigned();
            $table->timestamp('paid_at')->nullable();
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
        Schema::dropIfExists('invoices');
    }
}
