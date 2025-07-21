<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CsvUserController;

Route::get('/clear-cache', function() {
    $exitCode = Artisan::call('cache:clear');
    // return what you want
 });
 Route::get('/clear-configcache', function() {
    $exitCode = Artisan::call('config:clear');
    // return what you want
 });

 Route::get('/clear-routecache', function() {
    $exitCode = Artisan::call('route:clear');
    // return what you want
 });

Route::get('/thank_you', function () {
    return Inertia::render('ThankYou');
});

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::get('/classic-form', function () {
    return Inertia::render('classicform');
})->name('classicform');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/upload-csv', function () {
    return Inertia::render('UploadCsv');
})->middleware(['auth', 'verified']);

Route::post('/upload-csv', [CsvUserController::class, 'upload'])->middleware(['auth']);
Route::get('/golf/{token}', [CsvUserController::class, 'show'])->middleware(['auth'])->name('golf.token');
Route::get('/csv-users', [CsvUserController::class, 'index'])->middleware(['auth'])->name('csv.users');

Route::post('/', [ContactController::class, 'store'])->name('express.store');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
