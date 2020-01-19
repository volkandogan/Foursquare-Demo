<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class FoursquareController extends Controller
{
    public function getCategories()
    {
        
        $client = new \GuzzleHttp\Client();
        $request = $client->request('GET', 'https://api.foursquare.com/v2/venues/categories?', [
            'query' => [
                'client_id' => env('FOURSQUARE_CLIENT_ID'),
                'client_secret' => env('FOURSQUARE_SECRET_ID'),
                'v' => "20191009",
            ]
        ]);
        $response = json_decode($request->getBody());
        return response()->json($response);
    }

    public function explore($category)
    {
        $client = new Client();
        $request = $client->request('GET', 'https://api.foursquare.com/v2/venues/explore', [
            'query' => [
                'client_id' => env('FOURSQUARE_CLIENT_ID'),
                'client_secret' => env('FOURSQUARE_SECRET_ID'),
                'v' => "20191009",
                'near' => 'valletta',
                'query' => $category,
                'limit' => 1
            ]
        ]);
        $response = json_decode($request->getBody());
        return response()->json($response);
    }
}
