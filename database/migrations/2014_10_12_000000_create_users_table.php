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
            $table->string('name', 255)->nullable();
            $table->string('last_name', 255)->nullable();
            $table->string('email',255)->unique();
            $table->string('phone', 11)->unique();
            $table->string('registration_source')->nullable()->default("web");
            $table->timestamp('email_verified_at')->nullable();
            $table->enum('status', ['active', 'deactivate'])->default('active');
            $table->string('password',255);
            $table->rememberToken();
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
