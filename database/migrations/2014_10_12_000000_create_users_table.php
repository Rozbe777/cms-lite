<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 45)->nullable();
            $table->string('last_name', 45)->nullable();
            $table->string('email', 145)->nullable()->unique();
            $table->string('mobile', 10)->unique();
            $table->string('description')->nullable();
            $table->string('image')->nullable();
            $table->integer('group')->default(-3);
            $table->string('registration_source')->nullable()->default("web");
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('mobile_verified_at')->nullable();
            $table->enum('status', ['active', 'deactivate'])->default('active');
            $table->string('password')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
