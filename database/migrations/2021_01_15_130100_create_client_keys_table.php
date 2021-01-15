<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientKeysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_keys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id');
            $table->string('live_publishable_key')->unique()->collation('utf8mb4_bin');
            $table->string('live_secret_key')->unique()->collation('utf8mb4_bin');
            $table->string('test_publishable_key')->unique()->collation('utf8mb4_bin');
            $table->string('test_secret_key')->unique()->collation('utf8mb4_bin');
            $table->string('webhook_signing_secret')->unique()->collation('utf8mb4_bin');
            $table->tinyInteger('active')->default(1);
            $table->timestamps();

            $table->foreign('client_id')->references('id')->on('clients')
                ->onDelete('no action')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_keys');
    }
}
