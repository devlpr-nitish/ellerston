<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


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

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
