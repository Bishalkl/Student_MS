<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    // Constructor to ensure user is authenticated for all methods
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    // Get all tasks for the authenticated user
    public function index()
    {
        $tasks = Auth::user()->tasks; // Retrieve tasks for the authenticated user
        return response()->json($tasks);
    }

    // Create a new task
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task = Auth::user()->tasks()->create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json($task, 201);
    }

    // Update the status of a task
    public function updateStatus($id)
    {
        $task = Auth::user()->tasks()->findOrFail($id);
        $task->status = !$task->status; // Toggle the status
        $task->save();

        return response()->json($task);
    }

    // Delete a task
    public function destroy($id)
    {
        $task = Auth::user()->tasks()->findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}
