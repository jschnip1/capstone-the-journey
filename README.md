# Adventure Time App (270 hours)

## Deliverables

An app that simplifies road trip planning. A user will be able to:

* plan a trip with multiple stops
* invite friends to help plan the trip
* create an itinerary
* save pictures taken at different spots during the trip
* provide recommendations for places to stop during the trip
* include turn by turn navigation ???

## Database (MySQL, Docker)

* [x] Create ddl script
* [x] Create a docker container
* [ ] Create a Dockerfile

## Server (Spring)

### Model
* [ ] User
    * userId **int**
    * email **string**
    * password **string**
    * disabled **boolean**
    * trips **ArrayList\<Trip>**
* [ ] Profile
    * profileId **int**
    * profilePhoto **string**
    * profileDescription **string**
    * userId **int**
    * comments **ArrayList<\Comment>**
    * items **ArrayList\<Item>**
* [ ] Trip
    * tripId **int**
    * startTime **LocalDate**
    * endTime **LocalDate**
    * tripReview **int**
    * totalDistance **int**
    * name **String**
    * items **ArrayList\<Item>**
    * comments **ArrayList\<Comment>**
* [ ] Location
    * locationId **int**
    * latitude **string**
    * longitude **string**
    * name **string**
    * type **string**
    * photoUrl **string**
* [ ] Item
    * itemId **int**
    * itemName **string**
    * tripId **int** 
    * itemDescription **string**
    * profileId **int**
    * itemQuantity **int**
    * isPacked **boolean**
* [ ] Photo
    * photoId **int**
    * photo **String?**
    * tripLocationId **int**
    * caption **String**
* [ ] Comment
    * commentId **int**
    * tripId **int**
    * commentBody **string**
    * profileId **int**
* [ ] TripLocation
    * tripLocationId **int**
    * tripId **int**
    * location **object**
    * sortOrder **int**
    * photos **list\<Photo>**
* [ ] LocationTrip
    * tripLocationId **int**
    * locationId **int**
    * trip **object**
    * sortOrder **int**
    * photos **list\<Photo>**

### Controllers

* [ ] UserController
    * /user
    * GET: /user/{userId}
* [ ] ProfileController
    * /profile
    * GET: /profile/{profileId}
    * POST: /profile
    * PUT: /profile/{profileId}
* [ ] TripController
    * /trip
    * GET: /trip/{tripId}
    * POST: /trip
    * PUT: /trip/{tripId}
    * DELETE: /trip/{tripId}
* [ ] LocationController
    * /location
    * GET: /location/{locationId}
    * POST: /location
    * PUT: /{locationId}
    * DELETE: /{locationId} (not delete location entirely just connection)
* [ ] ItemController
    * /item
    * GET: /item/{itemId}
    * POST: /item
    * PUT: /{itemId}
    * DELETE: /{itemId}
* [ ] PhotoController
    * /photo
    * GET: /photo/{photoId}
    * POST: /photo/{photoId}
    * DELETE: /photo/{photoId}
* [ ] CommentController
    * /comment
    * GET: /comment/{commentId}
    * POST: /comment
    * PUT: /{commentId} Needed?
    * DELETE: /{commentId}
* [ ] AuthController
    * POST: /authenticate
    * POST: /refresh-token
    * POST: /register
    * third party authentication: https://www.callicoder.com/spring-boot-security-oauth2-social-login-part-1/
* [ ] TripLocationController
    * /trip/location
    * POST: /trip/location
    * PUT: /trip/location
    * DELETE: /trip/location/{tripId}/{locationId}
* [ ] LocationTripController
    * /location/trip
    * POST: /location/trip
    * PUT: /location/trip
    * DELETE: /location/trip/{locationId}/{tripId}
* [ ] ErrorResponse

#### Controller Tests

* [ ] UserController
* [ ] ProfileController
* [ ] TripController
* [ ] LocationController
* [ ] ItemController
* [ ] PhotoController
* [ ] CommentController
* [ ] AuthController
* [ ] TripLocationController
* [ ] LocationTripController

### Data

#### Mappers

* [ ] UserMapper
* [ ] ProfileMapper
* [ ] TripMapper
* [ ] LocationMapper
* [ ] ItemMapper
* [ ] PhotoMapper
* [ ] CommentMapper
* [ ] TripLocationMapper
* [ ] LocationTripMapper

#### Repositories

* [ ] UserRepository
    * findByEmail **User**
    * create **User**
    * update **boolean**
* [ ] ProfileRepository
    * findByUserId **Profile**
    * create **Profile**
    * update **boolean**
* [ ] TripRepository
    * findById **Trip**
    * create **Trip**
    * update **boolean**
    * deleteById **boolean**
* [ ] LocationRepository
    * findById **Location**
    * add **Location**
    * update **boolean**
    * deleteById **boolean**
* [ ] ItemRepository
    * findById **Item**
    * findByTrip **List\<Item>**
    * findByUser **List\<Item>**
    * add **Item**
    * update **boolean**
    * deleteById **boolean**
* [ ] PhotoRepository
    * findById **Photo**
    * findByLocation **List\<Photo>**
    * add **Photo**
    * deleteById **boolean**
* [ ] CommentRepository
    * findById **Comment**
    * findByTripId **List\<Comment>**
    * findByProfileId **List\<Comment>**
    * add **Comment**
    * update **boolean**
    * deleteById **boolean**
    * deleteByTripId **boolean**
* [ ] TripLocationRepository
    * add **boolean**
    * update **boolean**
    * deleteByKey **boolean**
* [ ] LocationTripRepository
    * add **boolean**
    * update **boolean**
    * deleteByKey **boolean**

##### Repository Tests

* [ ] UserRepository
* [ ] ProfileRepository
* [ ] TripRepository
* [ ] LocationRepository
* [ ] ItemRepository
* [ ] PhotoRepository
* [ ] CommentRepository
* [ ] TripLocationRepository
* [ ] LocationTripRepository

### Domain

**Rules**
* User
    * [ ] userId required
    * [ ] email required
    * [ ] password required
    * [ ] disabled not required
    * [ ] trips not required
* Profile
    * [ ] profileId required
    * [ ] profilePhoto not required
    * [ ] profileDescription not required
    * [ ] userId required
    * [ ] comments not required
    * [ ] items not required
* Trip
    * [ ] startTime must be before endTime
    * [ ] must have at least two locations
    * [ ] name is required (use starting and ending destinations if null)
* Location
    * [ ] locationId required
    * [ ] latitude required
    * [ ] longitude required
    * [ ] name not required
    * [ ] type required
    * [ ] photoUrl (use default pic if not available)
* Item
    * [ ] itemId required
    * [ ] name required
    * [ ] tripId required
    * [ ] description not required
    * [ ] profileId not required
    * [ ] quantity required. default 1.
    * [ ] isPacked required
* Photo
    * [ ] photoId required
    * [ ] photo required
    * [ ] locationId required
    * [ ] caption not required
* Comment
    * [ ] commentId required
    * [ ] tripId required
    * [ ] commentBody required
    * [ ] profileId required
* TripLocation
    * [ ] tripLocationId required
    * [ ] tripId required
    * [ ] locationId required
    * [ ] sortOrder required
* LocationTrip
    * [ ] locationTripId required
    * [ ] tripId required
    * [ ] locationId required
    * [ ] sortOrder required

**Services**
* [ ] UserService
    * findByUsername
    * add
    * update
    * disable
* [ ] ProfileService
    * findByUserId
    * add
    * update
* [ ] TripService
    * findById
    * add
    * update
    * deleteById
* [ ] LocationService
    * findById
    * add
    * update
    * deleteById
* [ ] ItemService
    * findById
    * add
    * update
    * deleteById
* [ ] PhotoService
    * findById
    * findByLocation
    * add
    * deleteById
* [ ] CommentService
    * findById
    * findByTripId
    * findByProfileId
    * add
    * update
    * deleteById
    * deleteByTripId
* [ ] TripLocationService
    * add
    * update
    * deleteByKey
* [ ] LocationTripService
    * add
    * update
    * deleteByKey

#### Domain Tests

* [ ] UserService
* [ ] ProfileService
* [ ] TripService
* [ ] LocationService
* [ ] ItemService
* [ ] PhotoService
* [ ] CommentService
* [ ] TripLocationService
* [ ] LocationTripService
    
### Security

* [ ] AppUserService
* [ ] JwtConverter
* [ ] JwtRequestFilter
* [ ] SecurityConfig

## API (Flicker, MapBox)

Flicker API call
``` 
flickr.photos.search
Return a list of photos matching some criteria. Only photos visible to the calling user will be returned. To return private or semi-private photos, the caller must be authenticated with 'read' permissions, and have permission to view the photos. Unauthenticated calls will only return public photos.
Authentication
This method does not require authentication.

Arguments
api_key (Required)
  Your API application key. See here for more details.
user_id (Optional)
  The NSID of the user who's photo to search. If this parameter isn't passed then everybody's public photos will be searched. A value of "me" will search against the calling user's photos for authenticated calls.
tags (Optional)
  A comma-delimited list of tags. Photos with one or more of the tags listed will be returned. You can exclude results that match a term by prepending it with a - character.
tag_mode (Optional)
  Either 'any' for an OR combination of tags, or 'all' for an AND combination. Defaults to 'any' if not specified.
text (Optional)
  A free text search. Photos who's title, description or tags contain the text will be returned. You can exclude results that match a term by prepending it with a - character.
min_upload_date (Optional)
  Minimum upload date. Photos with an upload date greater than or equal to this value will be returned. The date can be in the form of a unix timestamp or mysql datetime.
max_upload_date (Optional)
  Maximum upload date. Photos with an upload date less than or equal to this value will be returned. The date can be in the form of a unix timestamp or mysql datetime.
min_taken_date (Optional)
  Minimum taken date. Photos with an taken date greater than or equal to this value will be returned. The date can be in the form of a mysql datetime or unix timestamp.
max_taken_date (Optional)
  Maximum taken date. Photos with an taken date less than or equal to this value will be returned. The date can be in the form of a mysql datetime or unix timestamp.
license (Optional)
  The license id for photos (for possible values see the flickr.photos.licenses.getInfo method). Multiple licenses may be comma-separated.
sort (Optional)
  The order in which to sort returned photos. Defaults to date-posted-desc (unless you are doing a radial geo query, in which case the default sorting is by ascending distance from the point specified). The possible values are: date-posted-asc, date-posted-desc, date-taken-asc, date-taken-desc, interestingness-desc, interestingness-asc, and relevance.
privacy_filter (Optional)
  Return photos only matching a certain privacy level. This only applies when making an authenticated call to view photos you own. Valid values are:
  1 public photos
  2 private photos visible to friends
  3 private photos visible to family
  4 private photos visible to friends & family
  5 completely private photos
bbox (Optional)
  A comma-delimited list of 4 values defining the Bounding Box of the area that will be searched.

  The 4 values represent the bottom-left corner of the box and the top-right corner, minimum_longitude, minimum_latitude, maximum_longitude, maximum_latitude.
  
  Longitude has a range of -180 to 180 , latitude of -90 to 90. Defaults to -180, -90, 180, 90 if not specified.
  
  Unlike standard photo queries, geo (or bounding box) queries will only return 250 results per page.
  
  Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against "parameterless searches" for queries without a geo component.
  
  A tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future).
accuracy (Optional)
  Recorded accuracy level of the location information. Current range is 1-16 :
  World level is 1
  Country is ~3
  Region is ~6
  City is ~11
  Street is ~16
  Defaults to maximum value if not specified.
safe_search (Optional)
  Safe search setting:
  1 for safe.
  2 for moderate.
  3 for restricted.
  (Please note: Un-authed calls can only see Safe content.)
content_type (Optional)
  Content Type setting:
  1 for photos only.
  2 for screenshots only.
  3 for 'other' only.
  4 for photos and screenshots.
  5 for screenshots and 'other'.
  6 for photos and 'other'.
  7 for photos, screenshots, and 'other' (all).
machine_tags (Optional)
  Aside from passing in a fully formed machine tag, there is a special syntax for searching on specific properties :
  Find photos using the 'dc' namespace : "machine_tags" => "dc:"
  Find photos with a title in the 'dc' namespace : "machine_tags" => "dc:title="
  Find photos titled "mr. camera" in the 'dc' namespace : "machine_tags" => "dc:title=\"mr. camera\"
  Find photos whose value is "mr. camera" : "machine_tags" => "*:*=\"mr. camera\""
  Find photos that have a title, in any namespace : "machine_tags" => "*:title="
  Find photos that have a title, in any namespace, whose value is "mr. camera" : "machine_tags" => "*:title=\"mr. camera\""
  Find photos, in the 'dc' namespace whose value is "mr. camera" : "machine_tags" => "dc:*=\"mr. camera\""
  Multiple machine tags may be queried by passing a comma-separated list. The number of machine tags you can pass in a single query depends on the tag mode (AND or OR) that you are querying with. "AND" queries are limited to (16) machine tags. "OR" queries are limited to (8).
machine_tag_mode (Optional)
  Either 'any' for an OR combination of tags, or 'all' for an AND combination. Defaults to 'any' if not specified.
group_id (Optional)
  The id of a group who's pool to search. If specified, only matching photos posted to the group's pool will be returned.
contacts (Optional)
  Search your contacts. Either 'all' or 'ff' for just friends and family. (Experimental)
woe_id (Optional)
  A 32-bit identifier that uniquely represents spatial entities. (not used if bbox argument is present).

  Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against "parameterless searches" for queries without a geo component.

  A tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future).
place_id (Optional)
  A Flickr place id. (not used if bbox argument is present).

  Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against "parameterless searches" for queries without a geo component.

  A tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future).
media (Optional)
  Filter results by media type. Possible values are all (default), photos or videos
has_geo (Optional)
  Any photo that has been geotagged, or if the value is "0" any photo that has not been geotagged.

  Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against "parameterless searches" for queries without a geo component.

  A tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future).
geo_context (Optional)
  Geo context is a numeric value representing the photo's geotagginess beyond latitude and longitude. For example, you may wish to search for photos that were taken "indoors" or "outdoors".

  The current list of context IDs is :
  
  0, not defined.
  1, indoors.
  2, outdoors.
  
  
  Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against "parameterless searches" for queries without a geo component.
  
  A tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future).
lat (Optional)
  A valid latitude, in decimal format, for doing radial geo queries.
  
  Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against "parameterless searches" for queries without a geo component.
  
  A tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future).
lon (Optional)
  A valid longitude, in decimal format, for doing radial geo queries.
  
  Geo queries require some sort of limiting agent in order to prevent the database from crying. This is basically like the check against "parameterless searches" for queries without a geo component.
  
  A tag, for instance, is considered a limiting agent as are user defined min_date_taken and min_date_upload parameters — If no limiting factor is passed we return only photos added in the last 12 hours (though we may extend the limit in the future).
radius (Optional)
  A valid radius used for geo queries, greater than zero and less than 20 miles (or 32 kilometers), for use with point-based geo queries. The default value is 5 (km).
radius_units (Optional)
  The unit of measure when doing radial geo queries. Valid options are "mi" (miles) and "km" (kilometers). The default is "km".
is_commons (Optional)
  Limit the scope of the search to only photos that are part of the Flickr Commons project. Default is false.
in_gallery (Optional)
  Limit the scope of the search to only photos that are in a gallery? Default is false, search all photos.
is_getty (Optional)
  Limit the scope of the search to only photos that are for sale on Getty. Default is false.
extras (Optional)
  A comma-delimited list of extra information to fetch for each returned record. Currently supported fields are: description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o
per_page (Optional)
  Number of photos to return per page. If this argument is omitted, it defaults to 100. The maximum allowed value is 500.
page (Optional)
  The page of results to return. If this argument is omitted, it defaults to 1.

Example Call

https://www.flickr.com/services/rest/
?method=flickr.photos.search&api_key=5afed3f89085093808a56df407379159
&lat=41.501690&lon=-81.688721&radius=15&radius_units=mi&per_page=10&format=rest

Example Response
This method returns the standard photo list xml:

<?xml version="1.0" encoding="utf-8" ?>
<rsp stat="ok">
  <photos page="1" pages="15484" perpage="10" total="154840">
    <photo id="51826842833" owner="142512743@N07" secret="3d357804ef" server="65535" farm="66" title="IMG_2221  - Stockings by Ballerina Style is Fashion Holdups # 174 Shade is Nude w/ Black design" ispublic="1" isfriend="0" isfamily="0" />
    <photo id="51826842728" owner="142512743@N07" secret="4186782aa5" server="65535" farm="66" title="IMG_2254  - Stockings by Ballerina Style is Fashion Holdups # 174 Shade is Nude w/ Black design" ispublic="1" isfriend="0" isfamily="0" />
    <photo id="51827057355" owner="23165290@N00" secret="4729cd7bb4" server="65535" farm="66" title="snowstorm of January 16-17 2022" ispublic="1" isfriend="0" isfamily="0" />
    <photo id="51827057165" owner="23165290@N00" secret="488331e477" server="65535" farm="66" title="snowstorm of January 16-17 2022" ispublic="1" isfriend="0" isfamily="0" />
    <photo id="51826438628" owner="23165290@N00" secret="4651fc02b2" server="65535" farm="66" title="Ellie Mae - snowbound" ispublic="1" isfriend="0" isfamily="0" />
    <photo id="51824830406" owner="142512743@N07" secret="20e9df4d8f" server="65535" farm="66" title="IMG_2161  - Stockings by Ballerina Style is Fashion Holdups # 174 Shade is Nude w/ Black design" ispublic="1" isfriend="0" isfamily="0" />
    <photo id="51825172129" owner="142512743@N07" secret="11c5e25573" server="65535" farm="66" title="IMG_2252  - Stockings by Ballerina Style is Fashion Holdups # 174 Shade is Nude w/ Black design" ispublic="1" isfriend="0" isfamily="0" />
    <photo id="51822652533" owner="142512743@N07" secret="d2f16f9b9e" server="65535" farm="66" title="IMG_1860 - Pantyhose by Trasparenze Style is Debby 40 Denier Shade is: Fango" ispublic="1" isfriend="0" isfamily="0" />
    <photo id="51821593842" owner="142512743@N07" secret="51b13847e0" server="65535" farm="66" title="IMG_1809 - Pantyhose by Trasparenze Style is Debby 40 Denier Shade is: Fango" ispublic="1" isfriend="0" isfamily="0" />
    <photo id="51822481408" owner="127850938@N05" secret="c5f223cbb1" server="65535" farm="66" title="Beneath the Route 82 Bridge" ispublic="1" isfriend="0" isfamily="0" />
  </photos>
</rsp>

```
MapBox API Call

https://docs.mapbox.com/api/overview/
```
Mapbox APIs are divided into four distinct services: Maps, Navigation, Search, and Accounts. 
Each of these services has its own overview page in this documentation. 
These overview pages are divided into the individual APIs that make up the service. 
The documentation for each API is structured by endpoints. 
An endpoint is a specific method within an API that performs one action and is located at a specific URL.

```

## UI (React, Semantic, Leaflet)

### src
* [ ] App.js
* [ ] ErrorSummary.js
* [ ] NotFound.js
* [ ] NavBar.js
* [ ] design above classes

### Services
* [ ] AuthApi.js
* [ ] TripApi.js
* [ ] LocationApi.js
* [ ] ProfileApi.js
* [ ] CommentApi.js
* [ ] PhotoApi.js

### Map
* [ ] Leaflet Implementation

### Trip
* [ ] Trip.js
* [ ] design above classes

### Location
* [ ] Location.js
* [ ] design above classes

### Profile
* [ ] Profile.js
* [ ] design above classes

### Comment
* [ ] Comment.js
* [ ] design above classes

### Photo
* [ ] Photo.js
* [ ] design above classes

### Login
* [ ] Login.js
* [ ] design above classes

### Context
* [ ] AuthContext


## Deployment (15 hours)

### UI Docker (3 hours)
* [ ] .gitignore
* [ ] .dockerignore
* [ ] Dockerfile
* [ ] nginx.conf
* [ ] DockerCompose.yml

### API Docker(3 hours)
* [ ] .gitignore
* [ ] .dockerignore
* [ ] Dockerfile
* [ ] DockerCompose.yml

### RDS (1 hour)

### AWS Work (8 hours)
* [ ] UI Beanstalk (4 hours)
* [ ] API Beanstalk (4 hours)