<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'status'  // This is the foreign key linking task to the user
    ];

    // Define the inverse of the one-to-many relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
