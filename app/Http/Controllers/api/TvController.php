<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Tv;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TvController extends Controller
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
    public function index()
    {
        //
        $data = Tv::with('category')->get();
        return response()->json(['data' => $data], 200);
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
        $data = new Tv();
        $data->id = uniqid(true);
        $data->title = $request->input('title');
        $data->link = $request->input('link');
        $data->category_id = $request->input('category_id');
        $data->is_link_ext = $request->input('is_link_ext');
        $data->is_image_ext = $request->input('is_image_ext');

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/tv'), $filename);

            $data->image = $filename;
        }
        $data->status = $request->input('status');
        // set updated at time
        $data->updated_at = Carbon::now()->toDateTimeString();
        $data->save();

        return response()->json(['message' => 'Created successfully'], 201);
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
        $data = Tv::where('id', $id)->get();
        return response()->json(['data' => $data], 200);
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
        $data = Tv::where('id', $id)->first();

        $data->title = $request->input('title');

        $data->link = $request->input('link');

        if ($request->input('is_link_ext')) {
            $data->is_link_ext = $request->input('is_link_ext');
        }

        if ($request->input('is_image_ext')) {
            $data->is_image_ext = $request->input('is_image_ext');
        }

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/tv'), $filename);

            $data->image = $filename;
        }

        if ($request->input('status')) {
            $data->status = $request->input('status');
        }

        // set updated at time
        $data->updated_at = Carbon::now()->toDateTimeString();
        $data->save();

        return response()->json(['data' => $data, 'message' => 'Updated successfully'], 200);
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
        $data = Tv::where('id', $id)->first();

        // remove image
        $this->removeImage($data);
        $data->delete();
        return response()->json(['message' => 'Deleted successfully'], 200);
    }
    private function removeImage($data)
    {
        if ($data->image != "" && !\File::exists('uploads/tv/' . $data->image)) {
            @unlink(public_path('uploads/tv/' . $data->image));
        }
    }
}
