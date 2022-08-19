<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Admin
Route::group(['namespace' => 'Admin', 'prefix' => 'admin'], (function () {
    Route::resource('tv', TvController::class);
    Route::resource('category', CategoryController::class);
    // Login/Register
    Route::post('/register', 'UserController@register');
    Route::post('/login', 'UserController@login');
    Route::post('/logout', 'UserController@logout');
}));

// App
Route::group(['namespace' => 'App',], function () {
    Route::resource('tv', TvController::class);
    Route::resource('category', CategoryController::class);
    // Login/Register
    Route::post('/register', 'UserController@register');
    Route::post('/login', 'UserController@login');
    Route::post('/logout', 'UserController@logout');
});
