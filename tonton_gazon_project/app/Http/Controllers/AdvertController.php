<?php

namespace App\Http\Controllers;

use App\Advert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdvertController extends Controller
{
    /**
     * Retrieve all the adverts of the application
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchAdvert()
    {
        //Fetching all informations from database
        $fetch = DB::table('advert')
            ->join('garden', 'advert.idGarden', 'garden.id')
            ->join('users', 'garden.idOwner', 'users.id')
            ->select('advert.*',
                'garden.description as description_jardin',
                'garden.idOwner',
                'garden.size',
                'garden.movableObstacle',
                'garden.unmovableObstacle',
                'garden.pets',
                'garden.equipment',
                'garden.image',
                'users.xp',
                'users.name',
                'users.surname'
            )
            ->orderBy('advert.created_at', 'desc')
            ->get();

        $list = [];

        foreach ($fetch as $row) {
            //Here we are counting the amount of feedbacks received by the user
            $nbAvisRecus = DB::table('feedback')
                ->selectRaw('count(*) as cpt')
                ->where('idTarget', '=', $row->idOwner)
                ->first();

            $advert = [
                "id" => $row->id,
                "title" => $row->title,
                "description" => $row->description,
                "payout" => $row->payout,
                "state" => $row->state,
                "created_at" => $row->created_at,
                "updated_at" => $row->updated_at,
            ];
            $garden = [
                "id" => $row->idGarden,
                "description" => $row->description_jardin,
                "size" => $row->size,
                "movableObstacle" => $row->movableObstacle,
                "unmovableObstacle" => $row->unmovableObstacle,
                "pets" => $row->pets,
                "equipment" => $row->equipment,
                "image" => $row->image,
            ];
            $user = [
                "id" => $row->idOwner,
                "xp" => $row->xp,
                "name" => $row->name,
                "surname" => $row->surname,
                "nbAvis" => $nbAvisRecus->cpt,
            ];

            $list[] = array("Advert" => $advert, "Garden" => $garden, "User" => $user);
        }

        return response(['data' => $list], 200);
    }

    /**
     * Retrieve a specific advert by its ID
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchAdvertById(Request $request)
    {
        //Fetching all informations from database
        $fetch = DB::table('advert')
            ->join('garden', 'advert.idGarden', 'garden.id')
            ->join('users', 'garden.idOwner', 'users.id')
            ->select('advert.*',
                'garden.description as description_jardin',
                'garden.idOwner',
                'garden.size',
                'garden.movableObstacle',
                'garden.unmovableObstacle',
                'garden.pets',
                'garden.equipment',
                'garden.image',
                'users.xp',
                'users.name',
                'users.surname'
            )
            ->where("advert.id", "=", $request->get('id'))
            ->orderBy('advert.created_at', 'desc')
            ->first();

        //Here we are counting the amount of feedbacks received by the user
        $nbAvisRecus = DB::table('feedback')
            ->selectRaw('count(*) as cpt')
            ->where('idTarget', '=', $fetch->idOwner)
            ->first();

        $advert = [
            "id" => $fetch->id,
            "title" => $fetch->title,
            "description" => $fetch->description,
            "payout" => $fetch->payout,
            "state" => $fetch->state,
            "created_at" => $fetch->created_at,
            "updated_at" => $fetch->updated_at,
        ];
        $garden = [
            "id" => $fetch->idGarden,
            "description" => $fetch->description_jardin,
            "size" => $fetch->size,
            "movableObstacle" => $fetch->movableObstacle,
            "unmovableObstacle" => $fetch->unmovableObstacle,
            "pets" => $fetch->pets,
            "equipment" => $fetch->equipment,
            "image" => $fetch->image,
        ];
        $user = [
            "id" => $fetch->idOwner,
            "xp" => $fetch->xp,
            "name" => $fetch->name,
            "surname" => $fetch->surname,
            "nbAvis" => $nbAvisRecus->cpt,
        ];

        return response(['data' => array("Advert" => $advert, "Garden" => $garden, "User" => $user)], 200);
    }

    /**
     * Retrieve all the adverts of a specified author's ID
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchAdvertByAuthor($id)
    {
        $advert = Advert::where('idAuthor', $id)->get();

        return response(['advert' => $advert], 200);
    }

    public function addAdvert(Request $request)
    {

        //We validate the data through the request validator
        $validatedData = $request->validate([
            "title" => "required",
            "description" => "required",
            "idGarden" => "required",
            "payout" => "required",
            "date" => "required"
        ]);

        //Transform date json to assoc array
        $dates = json_decode($request->get('date'), true);
        //Final array to store dates
        $finalDates = array();

        foreach ($dates as $date) {
            if ($date !== "") {
                $finalDates[] = $date;
            }
        }

        if (empty($finalDates)) {
            abort('422');
        }

        usort($finalDates, function ($a, $b) {
            return strtotime($a) - strtotime($b);
        });

        $advert = new Advert;

        $advert->idGarden = $validatedData['idGarden'];
        $advert->title = $validatedData['title'];
        $advert->description = $validatedData['description'];
        $advert->payout = $validatedData['payout'];
        $advert->date = json_encode($finalDates);


        $advert->save();
    }

    /**
     * Retrieve all the adverts depending on filters
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function searchAdvert(Request $request)
    {
        //List of all the possible filters
        $search = $request->query('search') === null ? "t" : $request->query('search');
        $payout = $request->query('payout');
        $eval = $request->query('eval');
        $startDate = $request->query('start_date') === null ? DB::table('advert')->min('date') : $request->query('start_date');
        $endDate = $request->query('end_date') === null ? DB::table('advert')->max('date') : $request->query('end_date');
        $distance = $request->query('distance');
        $userCoordinates = json_decode($request->query('position'), true);

        //The part above handle the geolocation filter. We are comparing positions between two geographical points to return distance.
        //If there is a match, we add the advert id to list of match
        $listMatch = [];
        if (isset($distance)) {
            $addresses = DB::table('garden')
                ->join('advert', 'garden.id', 'advert.idGarden')
                ->select('garden.address', 'advert.id')
                ->whereNotNull('garden.address')
                ->get();

            foreach ($addresses as $address) {
                $coordinates = json_decode($address->address, true)['coordinates'];
                $distanceBetweenLocations = $this->distance($coordinates["lat"], $coordinates["lon"], $userCoordinates["lat"], $userCoordinates["lon"], "K");

                if ($distanceBetweenLocations <= $distance) {
                    $listMatch[] = $address->id;
                }
            }
        }

        //Here we are building the main query looking for all the possible matches, with filters defined or not
        $adverts = DB::table('advert')
            ->join('garden', 'advert.idGarden', 'garden.id')
            ->join('users', 'garden.idOwner', 'users.id')
            ->select('advert.*',
                'garden.description as description_jardin',
                'garden.idOwner as id_owner',
                'garden.size as size',
                'garden.movableObstacle as movable_obstacle',
                'garden.unmovableObstacle as unmovable_obstacle',
                'garden.pets as pets',
                'garden.equipment as equipment',
                'garden.image as image',
                'users.xp as xp',
                'users.name as name',
                'users.surname as username'
            )
            ->where(function ($query) use ($search) {
                $query->where('advert.title', 'like', '%' . $search . '%')
                    ->orWhere('advert.description', 'like', '%' . $search . '%');
            })
            ->where('advert.payout', '>=', isset($payout) ? $payout : 0)
            ->where('users.eval', '>=', isset($eval) ? $eval : 0)
            ->where(function ($query) use ($listMatch) {
                if (sizeof($listMatch)) {
                    $query->whereIn('advert.id', $listMatch);
                }
            })
            //In this part, we are looking for dates matching searched interval
            ->where(function ($query) use ($startDate, $endDate) {
                foreach ($query->select('advert.date')->get() as $dates) {
                    $datelist = json_decode($dates->date);
                    $in = false;
                    if($datelist !== null) {
                        foreach ($datelist as $date) {
                            if (($date >= $startDate) && ($date <= $endDate) && $in === false){
                                $in = true;
                                $query->orWhere('advert.date','=',$dates->date);
                            }
                        }
                    }
                }
            })
            ->orderBy('advert.created_at', 'desc')
            ->paginate(9);
        return response(['adverts' => $adverts], 200);
    }

    /**
     * This function is meant to calculate distances between two geographical coordinates
     * @param $lat1
     * @param $lon1
     * @param $lat2
     * @param $lon2
     * @param $unit
     * @return float|int
     */
    function distance($lat1, $lon1, $lat2, $lon2, $unit)
    {
        if (($lat1 == $lat2) && ($lon1 == $lon2)) {
            return 0;
        } else {
            $theta = $lon1 - $lon2;
            $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
            $dist = acos($dist);
            $dist = rad2deg($dist);
            $miles = $dist * 60 * 1.1515;
            $unit = strtoupper($unit);

            if ($unit == "K") {
                return ($miles * 1.609344);
            } else if ($unit == "N") {
                return ($miles * 0.8684);
            } else {
                return $miles;
            }
        }
    }
}
