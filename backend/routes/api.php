<?php

use App\Http\Controllers\TaskController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

// Registration route lagi
Route::post('register', function (Request $request) {
    // Validate request data
    $validator = Validator::make($request->all(),[
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email',
        'password' => 'required|string|min:8|confirmed', // password confirmation lagi
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }


    // natra user create garne
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password), // Encrypt password
    ]);

    // Return response ramro khalko
    return response()->json(['user' => $user], 201);
});

// Login route
Route::post('login', function (Request $request) {
    // Validate login credentials
    $validator = Validator::make($request->all(), [
        'email' => 'required|string|email|max:255',
        'password' => 'required|string|min:8',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }

    // Find user by email
    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Create and return token
    $token = $user->createToken('StudentMs')->plainTextToken;

    return response()->json(['token' => $token]);
});

// Logout route
Route::middleware('auth:sanctum')->post('logout', function (Request $request) {
    // Revoke the user's current token
    $request->user()->tokens->each(function ($token) {
        $token->delete();
    });

    return response()->json(['message' => 'Logged out successfully']);
});


//  User route to get authenticated user details
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json(['user' => $request->user()]);
});

// Task route for authenticated users
// Tasks route for authenticated users
Route::middleware('auth:sanctum')->get('/tasks', [TaskController::class, 'index']);






