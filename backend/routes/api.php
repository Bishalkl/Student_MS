<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// route for auth
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);



Route::middleware('auth:sanctum')->group(function () {
    Route::get('tasks', [TaskController::class, 'index']); // List all tasks
    Route::post('tasks', [TaskController::class, 'store']); // Create a new task
    Route::patch('tasks/{id}/status', [TaskController::class, 'updateStatus']); // Update task status
    Route::delete('tasks/{id}', [TaskController::class, 'destroy']); // Delete a task
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


