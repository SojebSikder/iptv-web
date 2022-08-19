<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTvsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tvs', function (Blueprint $table) {
            // $table->id();
            $table->string('id')->primary()->nullable();

            $table->string('title')->nullable();
            $table->string('link')->nullable();
            $table->string('image')->nullable();

            $table->string('is_link_ext')->nullable()->default('false');
            $table->string('is_image_ext')->nullable()->default('false');

            $table->string('status')->nullable()->default('1');

            $table->unsignedBigInteger('category_id')->nullable();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');

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
        Schema::dropIfExists('tvs');
    }
}
