<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    public $table = 'admin';
//    public $id = 'id';
    public $guarded = [];
    public $timestamps = false;
}
