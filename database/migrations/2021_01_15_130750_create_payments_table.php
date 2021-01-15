<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id');
            $table->string('status');
            $table->string('payment_secret')->unique()->collation('utf8mb4_bin');
            $table->text('payment_data');
            $table->text('payment_meta_data')->nullable();
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
        Schema::dropIfExists('payments');
    }
}
