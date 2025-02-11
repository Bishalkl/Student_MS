<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Fetch all tasks for the authenticated user with pagination
    public function index(Request $request)
    {
        $tasks = $request->user()->tasks()->paginate(10);
        return response()->json($tasks);
    }

    // Store a new task
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,in_progress,completed',
        ], [
            'status.in' => 'Status must be one of the following: pending, in_progress, or completed.',
        ]);

        try {
            $task = Task::create([
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'user_id' => $request->user()->id,
                'status' => $validatedData['status'] ?? 'pending',
            ]);

            return response()->json(['task' => $task], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create task', 'message' => $e->getMessage()], 500);
        }
    }

    // Show a single task by ID
    public function show(Request $request, $id)
    {
        $task = $request->user()->tasks()->find($id);

        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        return response()->json(['task' => $task]);
    }

    // Update a task
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,in_progress,completed',
        ], [
            'status.in' => 'Status must be one of the following: pending, in_progress, or completed.',
        ]);

        $task = $request->user()->tasks()->find($id);

        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        $task->update([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'status' => $validatedData['status'] ?? $task->status,
        ]);

        return response()->json(['task' => $task]);
    }

    // Delete a task
    public function destroy(Request $request, $id)
    {
        $task = $request->user()->tasks()->find($id);

        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}
