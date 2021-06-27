<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCouponsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->enum('status',['active','deactivate'])->default('deactivate');
            $table->enum('type',['fixed_price','percentage','free_delivery'])->default('percentage');
            $table->string('value')->nullable();
            $table->integer('max_limit')->nullable();
            $table->enum('functionality',['total_items_price','total_card_price','special_products','special_categories'])->default('total_card_price');
            $table->enum('card_situation',['unlimited','min_price','min_number','max_card_price'])->default('unlimited');
            $table->enum('user_status',['all','special_users','group_of_users'])->default('all');
            $table->integer('times_use_card')->default(10);
            $table->integer('times_use_user')->default(1);
            $table->time('start_date');
            $table->time('end_date');
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
        Schema::dropIfExists('coupons');
    }
}
