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
            $table->integer('bank_id')->default(0);
            $table->bigInteger('user_id')->unsigned();
            $table->text('description')->nullable();
            $table->integer('amount')->default(0);
            $table->enum('status', ['paid', 'unpaid'])->default('unpaid');
            $table->string('bank_result')->nullable();
            $table->timestamp('paid_at')->nullable();
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
