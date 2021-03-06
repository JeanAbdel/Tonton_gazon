<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\User;
use Carbon\Carbon;
use Faker\Generator as Faker;
use Faker\Provider\fr_FR\PhoneNumber;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/


$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->lastName,
        'surname' => $faker->firstName,
        'email' => $faker->unique()->safeEmail,
        'password' => Hash::make('secret'), // password
        'role' => $faker->numberBetween(1,9),
        'xp' => $faker->numberBetween(1,5), // xp
        'eval' => $faker->numberBetween(1,5), // xp,
        'phone_number' => $faker->phoneNumber,
        'remember_token' => Str::random(10),
        'email_verified_at' => Carbon::now()->format('Y-m-d H:i:s')
    ];
});
