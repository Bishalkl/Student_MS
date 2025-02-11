<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::create([
            'student_id' => 1,
            'title' => 'Complete Laravel Project',
            'description' => 'Finish the backend for the student management system.',
            'is_completed' => false,
        ]);
    }
}
