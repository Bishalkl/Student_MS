<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Handle user registration.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',  // Adding password confirmation for security
        ]);

        // If validation fails, return a custom error message
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Create the user with hashed password
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Return success response
            return response()->json([
                'status' => 'success',
                'message' => 'User registered successfully.',
                'user' => $user
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Registration failed, please try again.',
            ], 500);
        }
    }

    /**
     * Handle user login.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // Validate the incoming login request
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Check if credentials match
        if (Auth::attempt($request->only('email', 'password'))) {
            // If successful, create a token
            $user = Auth::user();
            $token = $user->createToken('StudentMS')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful.',
                'token' => $token,
                'user' => $user,
            ], 200);
        }

        // If credentials don't match, return unauthorized
        return response()->json([
            'status' => 'error',
            'message' => 'Unauthorized, invalid credentials.',
        ], 401);
    }

    /**
     * Logout user and invalidate token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // Revoke user's current token
        $request->user()->tokens->each(function ($token) {
            $token->delete();
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Logged out successfully.',
        ], 200);
    }
}

