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
            $table->string('coupon_id');
            $table->enum('functionality',['total_items_price','total_cart_price','special_products','special_categories'])->default('total_cart_price');
            $table->string('functionality_amount')->nullable();
            $table->enum('cart_conditions',['unlimited','min_price','min_purchase_number','max_cart_price','max_purchase_number'])->default('unlimited');
            $table->integer('cart_conditions_amount')->nullable();
            $table->enum('user_status',['all','special_users','group_of_users'])->default('all');
            $table->string('user_group')->default("-1"); /** -1 is all | (-2,-5) specially group | positive numbers are user_id */
            $table->integer('number_of_times_allowed_to_use')->nullable();
            $table->integer('number_of_use_allowed_per_user')->nullable();
            $table->integer('start_date')->nullable();
            $table->integer('end_date')->nullable();
            $table->string('start_time')->nullable();
            $table->string('end_time')->nullable();
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
        Schema::dropIfExists('coupon_settings');
    }
}
