<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCouponSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coupon_settings', function (Blueprint $table) {
            $table->id();
            $table->string('coupon->id');
            $table->enum('functionality',['total_items_price','total_card_price','special_products','special_categories'])->default('total_card_price');
            $table->enum('card_conditions',['unlimited','min_price','min_purchase_number','max_card_price','max_purchase_number'])->default('unlimited');
            $table->integer('card_conditions_amount');
            $table->enum('user_status',['all','special_users','group_of_users'])->default('all');
            $table->integer('user_group')->default(-1); /** -1 is all | (-2,-5) specially group | positive numbers are user_id */
            $table->integer('number_times_allowed')->default(10);
            $table->integer('number_of_user_allowed')->default(1);
            $table->timestamp('start_date');
            $table->timestamp('end_date');
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
        Schema::dropIfExists('coupon_settings');
    }
}