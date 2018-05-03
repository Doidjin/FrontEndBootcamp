# Running MongoDB -> You need to be in last directory
* ./mongod

* Meanwhile, after you're up and running with mongo, be sure to shut down your mongod server each time you're done working. You can do this with ctrl + c

## Restful Routes
name | url | verb | desc
---  | --- | ---  | ---
*INDEX* | /campgrounds | GET | Display a list of all campgrounds
*NEW* | /campgrounds/new | GET | Display form to make a new campground
*CREATE* | /campgrounds  | POST | Add a new campground for DB
*SHOW*  | /campgrounds/:id | GET | Show info about one campground
*EDIT*  | /campgrounds/:id/edit | GET | Show edit form for one campground
*UPDATE* | /campgrounds/:id     | PUT | Update a particular campground, then redirect to somewhere
*DESTROY* | /campgrounds/:id    | DELETE| Delete a particular campground, then redirect to somewhere

* Link -> https://boiling-forest-63370.herokuapp.com/