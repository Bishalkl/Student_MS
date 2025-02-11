<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request) {
        // get task for the authenticated user
        $tasks = $request->user()->tasks;
        return response()->json($tasks);
    }
}
