<?php

namespace App\Http\Controllers\api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only(['store', 'update', 'destroy']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        if ($request->input('limit')) {
            $category = Category::orderBy('title', 'ASC')
                ->with(['tvs' => function ($q) {
                    $q->where("status", "1");
                }])->get();

            return response()->json(['data' => $category], 200);
        } else {
            $category = Category::orderBy('title', 'ASC')
                ->with(['tvs' => function ($q) {
                    $q->where("status", "1");
                }])->get();

            return response()->json(['data' => $category], 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        if (auth("api")->user()->user_type != "admin") {
            return response()->json(['message' => 'Unauthorize'], 500);
        }

        $category = new Category();
        $category->title = $request->input('title');

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/category'), $filename);

            $category->image = $filename;
        }
        // set created at time
        $category->created_at = Carbon::now()->toDateTimeString();
        $category->save();

        return response()->json(['data' => $category, 'message' => 'Added category successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $category = Category::where('id', $id)->get();
        return response()->json(['data' => $category], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        if (auth("api")->user()->user_type != "admin") {
            return response()->json(['message' => 'Unauthorize'], 500);
        }

        $category = Category::where('id', $id)->first();
        $category->title = $request->input('title');

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/category'), $filename);

            $category->image = $filename;
        }
        // set created at time
        $category->updated_at = Carbon::now()->toDateTimeString();
        $category->save();

        return response()->json(['data' => $category, 'message' => 'Category have changed successfully'], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        if (auth("api")->user()->user_type != "admin") {
            return response()->json(['message' => 'Unauthorize'], 500);
        }

        $category = Category::where('id', $id)->first();
        $this->removeImage($category);
        $category->delete();

        return response()->json(['data' => $category, 'message' => 'Deleted successfully'], 201);
    }
    private function removeImage($post)
    {
        if ($post->image != "" && !\File::exists('uploads/category/' . $post->image)) {
            @unlink(public_path('uploads/category/' . $post->image));
        }
    }
}
