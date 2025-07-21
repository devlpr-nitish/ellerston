<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CsvUser extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'mobile',
        'email',
        'token',
    ];
}
