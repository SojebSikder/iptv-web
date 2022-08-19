<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        User::create([
            'id' => '1',
            'name' => 'sojebsikder',
            'email' => 'sojebsikder@gmail.com',
            'phone' => '01833962595',
            'password' => bcrypt('sojeb123'),
            'user_type' => 'admin',
        ]);
    }
}
