<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CsvUser;
use App\Jobs\ProcessCsvUpload;

class CsvUserController extends Controller
{
    public function index(Request $request)
    {
        $users = CsvUser::select('first_name', 'last_name', 'mobile', 'email', 'token')
                    ->orderBy('id', 'asc')
                    ->paginate(20);

        return Inertia::render('CsvUsers', [
            'users' => $users
        ]);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'csv' => 'required|mimes:csv,txt|max:2048',
        ]);

        try {
            $path = $request->file('csv')->store('csv_uploads');
            ProcessCsvUpload::dispatch($path); 
            return response()->json(['message' => 'CSV upload queued for processing.']);
        } catch (\Throwable $e) {
            \Log::error('CSV Upload Failed: ' . $e->getMessage());
            return response()->json(['message' => 'Server error during CSV upload'], 500);
        }
    }

    // public function show($token)
    // {
    //     $user = CsvUser::where('token', $token)->first();

    //     if (!$user) {
    //         return Inertia::render('ShowUserWithToken', [
    //             'error' => 'User with this token was not found.',
    //             'user' => null,
    //         ]);
    //     }

    //     return Inertia::render('ShowUserWithToken', [
    //         'user' => $user,
    //     ]);
    // }
}
