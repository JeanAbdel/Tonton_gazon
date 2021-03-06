<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    function register(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed',
            'name' => 'required',
            'surname' => 'required',
            'birthday' => 'required'
        ]);

        $validatedData['password'] = Hash::make($request->password);
        $user = User::create($validatedData);

        $user->sendApiEmailVerificationNotification();

        return response([],200);
    }

    function login(Request $request)
    {
        $validatedLogin = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!auth()->attempt($validatedLogin)) {
            return response([['message' => ['Les identifiants saisis sont incorrects.']]], 409);
        }
        if(auth()->user()->email_verified_at === null) {
            return response([['message' => ['Vous devez vérifier votre adresse mail avant de pouvoir vous connecter.']]], 403);
        }

        $accessToken = auth()->user()->createToken('authToken')->accessToken;

        return response(['user' => auth()->user(), 'access_token' => $accessToken]);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Vous avez été déconnecté avec succès.'
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function verify(Request $request)
    {
        $userID = $request["id"];
        $user = User::findOrFail($userID);
        $date = date("Y-m-d g:i:s");
        $user->email_verified_at = $date; // to enable the “email_verified_at field of that user be a current time stamp by mimicing the must verify email feature
        $user->save();
        return redirect('/');
    }

    public function resend(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json("Cet utilisateur a déjà vérifier son adresse email.", 422);
        }
        $request->user()->sendEmailVerificationNotification();
        return response()->json("Un nouveau mail de vérification a été envoyé. Veuillez vérifier votre boite mail.");
    }
}
