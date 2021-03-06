# 1. YelpCamp
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

# 2. Each Campground has:
* Name
* Image

# 3. Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

# 4. Creating New Campgrounds
* Setup new Campgrounds POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

# 5. Style the campgrounds page
* Add a better Header/title
* Make Campgrounds diplay in a grid

# 6. Add a mongodb database
* Install and configure Mongoose
* Setup campground model
* Use campground model inside our routes

# 7. Show Page
* Review Restfull routes
* Add discription to campground model
* Add a show route/template
```
Restful Routes
name    url         verb    desc.
======================================================
INDEX   /camp       GET     display a list of all
NEW     /camp/new   GET     Display form to make a new
CREAT   /camp       POST    Add new to Database
Show    /camp/:id   GET     Show info about one

INDEX   /campgrounds
NEW     /campgrounds/new
CREATE  /campgrounds
SHOW    /campgrounds/:id

NEW     /campgrounds/:id/comments/new   GET
CREATE  /campgrounds/:id/comments       POST

```
# 8 Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly

# 9 Add Seeds File
* Add seeds.js file
* Run the seeds file every time the server starts

# 10 Add the comments model
* Make our errors go away
* Display comments on campground show page 

# 11 Comment NEW/CREATE
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

# 12 Show page Styling
* Add Sidebar to show page
* Display comments nicely

# 13 Intro to Auth
* Tools = Passport, Passport local, Passport local mongoose
* Auth flow
* Express-session

