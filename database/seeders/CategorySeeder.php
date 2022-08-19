<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Category::create([
            'id' => '1',
            'title' => 'Bangla',
            'slug' => 'bangla',
        ]);
        Category::create([
            'id' => '2',
            'title' => 'Movies',
            'slug' => 'movies',
        ]);
        Category::create([
            'id' => '3',
            'title' => 'Music',
            'slug' => 'music',
        ]);
        Category::create([
            'id' => '4',
            'title' => 'News',
            'slug' => 'news',
        ]);
    }
}
