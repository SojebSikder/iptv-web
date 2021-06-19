<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
//use Auth;
// use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Mail;
use App\Mail\PasswordReset;
use App\Models\DoctorCategory;
use Carbon\Carbon;
use Validator;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Http;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    use AuthenticatesUsers;

    public function __construct()
    {
        //$this->middleware('auth:api', ['except' => ['login', 'register', 'refresh', 'logout']]);
        $this->middleware('auth:api', ['except' => ['login', 'register', 'refresh', 'checkAuth']]);
    }

    public function index(Request $request)
    {
        if (!auth("api")->user()) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        $user = User::orderBy('created_at', 'DESC')->get();
        return response()->json(['data' => $user], 200);
    }

    // public function show($id)
    // {
    //     //
    //     if (!auth("api")->user()) {
    //         return response()->json(['message' => 'Unauthorize'], 500);
    //     }

    //     $user_id = auth("api")->user()->id;
    //     $user = User::where('id', $id)->first();

    //     if ($user_id == $user->user_id) {
    //         $address = Address::where('id', $id)->get();
    //         return response()->json(['data' => $address], 200);
    //     } else {
    //         return response()->json(["message" => "you're not able to proceed :("], 200);
    //     }
    // }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $user = User::where('id', $id)->first();
        return response()->json(['data' => $user], 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        if (!auth("api")->user()) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
    }


    public function register(Request $request)
    {
        $plainPassword = $request->password;

        $password = bcrypt($request->password);
        $name = $request->name;
        $email = $request->email;
        $phone = $request->phone;

        if ($request->input('name')) {
            // if (!User::where('name', '=', $request->input('name'))->exists()) {
            $request->request->add(['name' => $name]);
            // } else {
            //     return response()->json(['message' => 'Name already teken. Please choose another  :('], 201);
            // }
        } else {
            return response()->json(['message' => 'Name is required  :('], 201);
        }


        if ($request->input('email')) {
            if (!User::where('email', '=', $request->input('email'))->exists()) {
                $request->request->add(['email' => $email]);
            } else {
                return response()->json(['message' => 'Email already teken. Please choose another  :('], 201);
            }
        } else {
            return response()->json(['message' => 'Email is required  :('], 201);
        }


        $request->request->add(['phone' => $phone]);
        $request->request->add(['password' => $password]);

        // create the user account 
        // $created = User::create($request->all());

        $createId = uniqid(true);
        $created = new User();

        $created->id = $createId;
        $created->name = $request->input('name');
        $created->email = $request->input('email');
        $created->phone = $request->input('phone');
        $created->password = $password;
        $created->status = "allow";
        $created->user_type = "user";

        $created->image = "logo.png";
        $created->save();

        $request->request->add(['password' => $plainPassword]);

        // $user = Auth::user();

        // return response()->json([
        //         'success' => true,
        //         'user' => $user,
        //         'message' => 'Registration Completed successfully',
        //     ], 200);

        // login now..
        return $this->login($request);
    }


    public function login(Request $request)
    {
        $input = $request->only('email', 'password');


        $jwt_token = null;
        if (!$jwt_token = $this->guard()->attempt($input)) { //JWTAuth::attempt($input)) {

            return response()->json([
                'success' => false,
                'message' => 'Invalid Email or Password',
            ], 401);
        }
        // get the user 
        $user = Auth::user();

        // Save token to database
        $userModel = User::find(Auth::id());
        $userModel->api_token = $jwt_token;
        $userModel->save();


        // response back
        return response()->json([
            'success' => true,
            'token' => $jwt_token,
            'user' => $user
        ]);
    }


    public function logout(Request $request)
    {
        // $this->guard()->logout();
        // return response()->json(['message' => 'Successfully logged out']);

        if (!User::checkToken($request)) {
            return response()->json([
                'message' => 'Token is required',
                'success' => false,
            ], 422);
        }

        try {
            JWTAuth::invalidate(JWTAuth::parseToken($request->token));
            return response()->json([
                'success' => true,
                'message' => 'User logged out successfully'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, the user cannot be logged out'
            ], 500);
        }
    }



    public function getCurrentUser(Request $request)
    {
        if (!User::checkToken($request)) {
            return response()->json([
                'message' => 'Token is required'
            ], 422);
        }

        $user = JWTAuth::parseToken()->authenticate();
        // add isProfileUpdated....
        $isProfileUpdated = false;
        if ($user->isPicUpdated == 1 && $user->isEmailUpdated) {
            $isProfileUpdated = true;
        }
        $user->isProfileUpdated = $isProfileUpdated;

        return $user;
    }


    public function update(Request $request)
    {
        $user = $this->getCurrentUser($request);
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User is not found'
            ]);
        }

        unset($data['token']);

        $updatedUser = User::where('id', $user->id)->update($data);
        $user =  User::find($user->id);

        return response()->json([
            'success' => true,
            'message' => 'Information has been updated successfully!',
            'user' => $user
        ]);
    }

    public function update_info(Request $request)
    {
        if ($request->input('userType') == "admin") {
            // For admin
            if (auth("api")->user()->user_type != "admin") {
                return response()->json(['message' => 'Unauthorize'], 500);
            }

            $user = User::where('id', $request->input('id'))->first();

            if ($request->input('status')) {
                $user->status = $request->input('status');
            }
            if ($request->input('user_type')) {
                $user->user_type = $request->input('user_type');
            }
            $user->save();
            return response()->json([

                'message' => 'Saved successfully'
            ], 201);
        } else {
            // For rest of user
            if (!auth("api")->user()) {
                return response()->json(['message' => 'Unauthorize'], 500);
            }

            $user_id = auth("api")->user()->id;

            $user = User::where('id', $user_id)->first();


            if ($request->input('name')) {

                if (!User::where('name', '=', $request->input('name'))->exists()) {
                    $user->name = $request->input('name');
                } else {
                    //return response()->json(['message' => 'Name already teken. Please choose another  :('], 201);
                }
            }

            if ($request->input('email')) {
                if (!User::where('email', '=', $request->input('email'))->exists()) {
                    $user->email = $request->input('email');
                } else {
                    //return response()->json(['message' => 'Email already teken. Please choose another  :('], 201);
                }
            }

            if ($request->input('phone')) {
                $user->phone = $request->input('phone');
            }

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('uploads/profile'), $filename);

                $user->image = $filename;
            }

            $user->save();

            return response()->json([
                'user' => $user,
                'message' => 'Saved successfully'
            ], 201);
        }
    }

    // go online
    public function go_online(Request $request)
    {

        if (!auth("api")->user()) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }

        $user_id = auth("api")->user()->id;

        $user = User::where('id', $user_id)->first();

        if ($request->input('is_online')) {
            $user->is_online = $request->input('is_online');
        }

        $user->save();

        return response()->json([
            'message' => 'Onlined successfully'
        ], 201);
    }

    // public function checkAuth()
    // {
    //     // if (!auth("api")->user()) {
    //     //     return response()->json(['message' => 'Unauthorize'], 500);
    //     // }
    //     if (auth("api")->user()) {
    //         return response()->json(['message' => true, 'name' => Auth::check()]);
    //     } else {
    //         return response()->json(['message' => false]);
    //     }
    //     // return response()->json(['message' => "Hello World"]);
    // }
    public function checkAuth(Request $request)
    {
        $user = Auth::guard('api')->user();
        if ($user) {
            return response()->json(['state' => 1], 200);
        }
        return response()->json(['state' => 0], 401);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }
}
