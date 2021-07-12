<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public function tvs()
    {
        return $this->hasMany(Tv::class, 'category_id')
            ->orderBy('title', 'ASC');
    }
}
