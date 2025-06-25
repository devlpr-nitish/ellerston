<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'acceptPolicy' => 'accepted',
            // other validations...
        ]);

        // Save or process the form here...

        // Redirect via Inertia (preferred)
        return Inertia::location('/thank_you');
    }
}
