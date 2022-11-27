# 3PicosProject-API

This API is the Backend project that concerns to the blog that follows the adventures of 3 motorcycle lovers. 


## What to expect

It will provide information regarding the adventures whether they are trips or gastronomical experiences and the motorcycles. It will also include the merchandising products that will be available from this group as well as members information.


## Specifications

The users defined with admin role will be responsible for managing all content for the blog, merchandising products and information regarding other users. All the members will be encouraged to leave reviews on the products with their opinion and a rating according to their evaluation of the product.


## Enpoints 
Bellow there will be described all the endpoints with payloads, parameters, query options and respective responses for each endpoint.


####  Enpoints Overview

    GET    /api/v1/trips                            | Gets information regarding all the trips
    POST   /api/v1/trips                            | Creates a new trip
    GET    /api/v1/trips/:id                        | Gets information regarding a single trip
    PUT    /api/v1/trips/:id                        | Updates a given trip.
    DELETE /api/v1/trips/:id                        | Deletes a given trip.
    GET    /api/v1/gastronomy                       | Gets the information regarding all the gastronomic experiences.
    POST   /api/v1/gastronomy                       | Creates and stores a new gastronomic experience on the database.
    GET    /api/v1/gastronomy/:id                   | Gets the information regarding a single gastronomic experience.
    PUT    /api/v1/gastronomy/:id                   | Updates a given gastronomic experience.
    DELETE /api/v1/gastronomy/:id                   | Deletes a given gastronomic experience.
    GET    /api/v1/motorcycles                      | Gets the information regarding all the motorcycles.
    POST   /api/v1/motorcycles                      | Creates and stores a new motorcycle on the database.
    GET    /api/v1/motorcycles/:id                  | Gets the information regarding a single motorcycle.
    PUT    /api/v1/motorcycles/:id                  | Updates a given motorcycle.
    DELETE /api/v1/motorcycles/:id                  | Deletes a given motorcycle.
    GET    /api/v1/categories                       | Gets the information regarding all the categories.
    POST   /api/v1/categories                       | Creates and stores a new category on the database.
    GET    /api/v1/categories/:id                   | Gets the information regarding a single category.
    PUT    /api/v1/categories/:id                   | Updates a given category.
    DELETE /api/v1/categories/:id                   | Deletes a given category.
    GET    /api/v1/users                            | Gets the information regarding all the users.
    POST   /api/v1/users                            | Creates and stores a new user on the database.
    GET    /api/v1/users/:id                        | Gets the information regarding a single user.
    PUT    /api/v1/users/:id                        | Updates a given user.
    DELETE /api/v1/users/:id                        | Deletes a given user.
    POST   /api/v1/auth/login                       | Allows to login the user by checking if the user’s password and email are correct.
    GET    /api/v1/auth/logout                      | Allows to logout the user.
    GET    /api/v1/auth/me                          | Gets currently logged in user.
    GET    /api/v1/products                         | Gets the information regarding all the products.
    POST   /api/v1/products                         | Creates and stores a new product on the database.
    GET    /api/v1/products/:id                     | Gets the information regarding a single product.
    PUT    /api/v1/products/:id                     | Updates a given product.
    DELETE /api/v1/products/:id                     | Deletes a given product.
    GET    /api/v1/products/:id/reviews             | Gets all the reviews of a given product.
    POST   /api/v1/products/:id/reviews             | Creates a new product review on the database.
    GET    /api/v1/products/:id/reviews/:reviewId   | Gets one specific review of a given product.
    PUT    /api/v1/products/:id/reviews/:reviewId   | Updates one specific product review.
    DELETE /api/v1/products/:id/reviews/:reviewId   | Deletes one specific product review.


### /api/v1/trips
### POST 
Creates and stores a new trip on the database.

The access is private and is only allowed to a logged in user with role "admin".

This endpoint does not require parameters but it requires to send a resquest body with the mandatory fields:
* "name" | Given name for the trip. 
* "description" | Description with content of the trip.
* "city" | The city where the trip took place.
* "country" | The country where the trip took place.
* "tripDate" | The date of when the trip occurred.

The body can also take the optional fields:
* "images" | An array of objects for the photos of the trip. If this field is included it has to include mandatorily:
    * "imgName" | The name of the image. 
    * "imgDescription" | The description of the image that can be used for image captions or to provide alternative information for an image if a user for some reason cannot view it.
* "createdAt" | By deafult it will assume the current date.

Responses:
* 201 Created | Returns the data of the created trip.
* 400 Bad Request | If the trip can't be created due to a validation error of the database such as a missing required field or a duplicated field that must be unique.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/trips  
### GET
Gets the information regarding all the trips.

It is publicly accessible.

This endpoint doesn’t require parameters or a payload to be accessed. It is possible, however, to select, sort and manage pagination according to the query request:
* /api/v1/trips?select=name | allows to get only the field(s) selected aditionally to the field "_id"; in this example, it will return only the "_id" and "name" of all trips. 
* /api/v1/trips?sort=city | allows to sort the results by the chosen field, in this example by the city name. 
* /api/v1/trips?page=2 | selects the intended page; in this example 2.
* /api/v1/trips?limit=10 | defines the number of results that should be shown per page; in this example set to 10.

Responses:
* 200 OK | Returns the data of all the trips according to the request query if any was applied. It also provides information regarding pagination (previous page if it's not the first and next page if it's not the last one as well as the limit) and the number of results on the page. 
* 500 Internal Server Error | If there has been a server error.


### /api/v1/trips/:id
### GET
Gets the information regarding a single trip.

It is publicly accessible.

This route requires a parameter: the id of the intended trip.

Responses:
* 200 OK | Returns the data of the required trip.
* 404 Not Found | If no trip is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 

  
### /api/v1/trips/:id   
### PUT 
Updates a given trip.

The access is private and is only allowed to a logged in user with role "admin".

This route requires a parameter: the id of the trip intended to be updated. 

It also requires a body with the field or fields to be updated and the respective values.

Responses:
* 200 OK | Returns the data of the trip with the updated values.
* 400 Bad Request | If the trip can't be updated due to a validation error of the database such as value longer then the maxlength or a duplicated field that must be unique.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 404 Not Found | If no trip is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/trips/:id     
### DELETE 
Deletes a given trip.

The access is private and is only allowed to a logged in user with role "admin".

This route requires a parameter: the id of the trip intended to be deleted.

Responses:
* 200 OK | Returns the data of the trip that was deleted.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 404 Not Found | If no trip is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/gastronomy
### POST 
Creates and stores a new gastronomic experience on the database.

The access is private and is only allowed to a logged in user with role "admin".

This endpoint does not require parameters but it requires to send a resquest body with the mandatory fields:
* "name" | Given name for the gastronomic experience. 
* "description" | Description with content of the gastronomic experience.
* "city" | The city where the gastronomic experience took place.
* "country" | The country where the gastronomic experience took place.
* "tripDate" | The date of when the gastronomic experience occurred.
* "menuImage" | The image to be aplied on the gastronomic experience preview card.

The body can also take the optional fields:
* "images" | An array of objects for the photos of the gastronomic experience. If this field is included it has to include mandatorily:
    * "imgName" | The name of the image. 
    * "imgDescription" | The description of the image that can be used for image captions or to provide alternative information for an image if a user for some reason cannot view it.
* "createdAt" | By deafult it will assume the current date.

Responses:
* 201 Created | Returns the data of the created gastronomic experience.
* 400 Bad Request | If the gastronomic experience can't be created due to a validation error of the database such as a missing required field or a duplicated field that must be unique.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/gastronomy  
### GET
Gets the information regarding all the gastronomic experiences.

It is publicly accessible.

This endpoint doesn’t require parameters or a payload to be accessed. It is possible, however, to select, sort and manage pagination according to the request query:
* /api/v1/gastronomy?select=name | allows to get only the field(s) selected aditionally to the field "_id"; in this example, it will return only the "_id" and "name" of all gastronomic experiences. 
* /api/v1/gastronomy?sort=city | allows to sort the results by the chosen field, in this example by the city name. 
* /api/v1/gastronomy?page=2 | selects the intended page; in this example 2.
* /api/v1/gastronomy?limit=10 | defines the number of results that should be shown per page; in this example set to 10.

Responses:
* 200 OK | Returns the data of all the gastronomic experiences according to the request query if any was applied. It also provides information regarding pagination (previous page if it's not the first and next page if it's not the last one as well as the limit) and the number of results on the page. 
* 500 Internal Server Error | If there has been a server error.


### /api/v1/gastronomy/:id
### GET
Gets the information regarding a single gastronomic experience.

It is publicly accessible.

This route requires a parameter: the id of the intended gastronomic experience.

Responses:
* 200 OK | Returns the data of the required gastronomic experience.
* 404 Not Found | If no gastronomic experience is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/gastronomy/:id   
### PUT 
Updates a given gastronomic experience.

The access is private and is only allowed to a logged in user with role "admin".

This route requires a parameter: the id of the gastronomic experience intended to be updated.

It also requires a body with the field or fields to be updated and the respective values.

Responses:
* 200 OK | Returns the data of the gastronomic experience with the updated values.
* 400 Bad Request | If the gastronomic experience can't be updated due to a validation error of the database such as value longer then the maxlength or a duplicated field that must be unique.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 404 Not Found | If no gastronomic experience is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/gastronomy/:id     
### DELETE 
Deletes a given gastronomic experience.

The access is private and is only allowed to a logged in user with role "admin".

This route requires a parameter: the id of the gastronomic experience intended to be deleted.

Responses:
* 200 OK | Returns the data of the gastronomic experience that was deleted.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 404 Not Found | If no gastronomic experience is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/motorcycles
### POST 
Creates and stores a new motorcycle on the database.

The access is private and is only allowed to a logged in user with role "admin".

This endpoint does not require parameters but it requires to send a resquest body with the mandatory fields:
* "brand" | The brand the motorcycle. 
* "model" | The model the motorcycle. 
* "info" | Description with content of the motorcycle.

The body can also take the optional fields:
* "images" | An array of objects for the photos of the motorcycle. If this field is included it has to include mandatorily:
    * "imgName" | The name of the image. 
    * "imgDescription" | The description of the image that can be used for image captions or to provide alternative information for an image if a user for some reason cannot view it.
* "createdAt" | By deafult it will assume the current date.

Responses:
* 201 Created | Returns the data of the created motorcycle.
* 400 Bad Request | If the motorcycle can't be created due to a validation error of the database such as a missing required field or a duplicated field that must be unique.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/motorcycles  
### GET
Gets the information regarding all the motorcycles.

It is publicly accessible.

This endpoint doesn’t require parameters or a payload to be accessed. It is possible, however, to select, sort and manage pagination according to the request query:
* /api/v1/motorcycles?select=model | allows to get only the field(s) selected aditionally to the field "_id"; in this example, it will return only the "_id" and "model" of all motorcycles. 
* /api/v1/motorcycles?sort=model | allows to sort the results by the chosen field, in this example by the model name. 
* /api/v1/motorcycles?page=2 | selects the intended page; in this example 2.
* /api/v1/motorcycles?limit=10 | defines the number of results that should be shown per page; in this example set to 10.

Responses:
* 200 OK | Returns the data of all the motorcycles according to the request query if any was applied. It also provides information regarding pagination (previous page if it's not the first and next page if it's not the last one as well as the limit) and the number of results on the page.
* 500 Internal Server Error | If there has been a server error.


### /api/v1/motorcycles/:id
### GET
Gets the information regarding a single motorcycle.

It is publicly accessible.

This route requires a parameter: the id of the intended motorcycle.

Responses:
* 200 OK | Returns the data of the required motorcycle.
* 404 Not Found | If no motorcycle is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/motorcycles/:id   
### PUT 
Updates a given motorcycle.

The access is private and is only allowed to a logged in user with role "admin".

This route requires a parameter: the id of the motorcycle intended to be updated.

It also requires a body with the field or fields to be updated and the respective values.

Responses:
* 200 OK | Returns the data of the motorcycle with the updated values.
* 400 Bad Request | If the motorcycle can't be updated due to a validation error of the database such as value longer then the maxlength or a duplicated field that must be unique.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 404 Not Found | If no motorcycle is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/motorcycles/:id     
### DELETE 
Deletes a given motorcycle.

The access is private and is only allowed to a logged in user with role "admin".

This route requires a parameter: the id of the motorcycle intended to be deleted.

Responses:
* 200 OK | Returns the data of the motorcycle that was deleted.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 404 Not Found | If no motorcycle is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/categories
### POST  
Creates and stores a new category on the database.

The access is private and is only allowed to a logged in user with role "admin".

This endpoint does not require parameters but it requires to send a resquest body with the mandatory fields:
* "name" | Given name for the category. 

The body can also take the optional field:
* "createdAt" | By deafult it will assume the current date.

Responses:
* 201 Created | Returns the data of the created category.
* 400 Bad Request | If the category can't be created due to a validation error of the database such as a missing required field or a duplicated field that must be unique.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/categories  
### GET
Gets the information regarding all the categories.

It is publicly accessible.

This endpoint doesn’t require parameters or a payload to be accessed. It is possible, however, to select, sort and manage pagination according to the request query:
* /api/v1/categories?select=name | allows to get only the field(s) selected aditionally to the field "_id"; in this example, it will return only the "_id" and "name" of all categories. 
* /api/v1/categories?sort=createdAt | allows to sort the results by the chosen field, in this example by the created date. 
* /api/v1/categories?page=2 | selects the intended page; in this example 2.
* /api/v1/categories?limit=10 | defines the number of results that should be shown per page; in this example set to 10.

Responses:
* 200 OK | Returns the data of all the categories according to the request query if any was applied. It also provides information regarding pagination (previous page if it's not the first and next page if it's not the last one as well as the limit) and the number of results on the page.
* 500 Internal Server Error | If there has been a server error.


### /api/v1/categories/:id
### GET
Gets the information regarding a single category.

It is publicly accessible.

This route requires a parameter: the id of the intended category.

Responses:
* 200 OK | Returns the data of the required category.
* 404 Not Found | If no category is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/categories/:id   
### PUT 
Updates a given category.

The access is private and is only allowed to a logged in user with role "admin".

This route requires a parameter: the id of the category intended to be updated.

It also requires a body with the field or fields to be updated and the respective values.

Responses:
* 200 OK | Returns the data of the category with the updated values.
* 400 Bad Request | If the category can't be updated due to a validation error of the database such as value longer then the maxlength or a duplicated field that must be unique.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 404 Not Found | If no category is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/categories/:id     
### DELETE 
Deletes a given category.

The access is private and is only allowed to a logged in user with role "admin".

This route requires a parameter: the id of the category intended to be deleted.

Responses:
* 200 OK | Returns the data of the category that was deleted.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 404 Not Found | If no category is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/users 
### POST  
Creates and stores a new user on the database.

It is publicly accessible.

This endpoint does not require parameters but it requires to send a resquest body with the mandatory fields:
* "name" | Given name for the user. 
* "email" | The email addresss of the user.
* "address" | The addresss of the user.
* "zipCode" | The zipcode of the addresss of the user.
* "city" | The city of the user.
* "country" | The country of the user.
* "password" | The password for the account.

The body can also take the optional fields:
* "phoneNumber" | The phone number of the user.
* "profilePhoto" | The profile photo of the user.
* "aniversaryDate" | The anniversary date of the user.
* "createdAt" | By deafult it will assume the current date.
* "role" | Must be specified in case it's an admin user.

Responses:
* 201 Created | Returns the data of the created user.
* 400 Bad Request | If the user can't be created due to a validation error of the database such as a missing required field or a duplicated field that must be unique.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/users  
### GET
Gets the information regarding all the users.

The access is private and is only allowed to a logged in user with role "admin".

This endpoint doesn’t require parameters or a payload to be accessed. It is possible, however, to select, sort and manage pagination according to the query request:
* /api/v1/users?select=name | allows to get only the field(s) selected aditionally to the field "_id"; in this example, it will return only the "_id" and "name" of all users. 
* /api/v1/users?sort=createdAt | allows to sort the results by the chosen field, in this example by the created date. 
* /api/v1/users?page=2 | selects the intended page; in this example 2.
* /api/v1/users?limit=10 | defines the number of results that should be shown per page; in this example set to 10.

Responses:
* 200 OK | Returns the data of all the users according to the request query if any was applied. It also provides information regarding pagination (previous page if it's not the first and next page if it's not the last one as well as the limit) and the number of results on the page.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 500 Internal Server Error | If there has been a server error.


### /api/v1/users/:id
### GET
Gets the information regarding a single user.

The access is private and is only allowed to a logged in user with role "admin".

This route requires a parameter: the id of the intended user.

Responses:
* 200 OK | Returns the data of the required user.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 404 Not Found | If no user is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/users/:id   
### PUT 
Updates a given user.

The access is private and is only allowed to a logged in user with role "admin".

This route requires a parameter: the id of the user intended to be updated.

It also requires a body with the field or fields to be updated and the respective values.

Responses:
* 200 OK | Returns the data of the user with the updated values.
* 400 Bad Request | If the user can't be updated due to a validation error of the database such as value longer then the maxlength or a duplicated field that must be unique.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 404 Not Found | If no user is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/users/:id     
### DELETE 
Deletes a given user.

The access is private and is only allowed to a logged in user with role "admin".

This route requires a parameter: the id of the user intended to be deleted.

Responses:
* 200 OK | Returns the data of the user that was deleted.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 404 Not Found | If no user is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/auth/login   
### POST 
Allows to login the user by checking if the user’s password and email are correct.

It is publicly accessible.

This endpoint does not require parameters but it requires to send a resquest body with the mandatory fields:
* "email" | The email addresss of the user.
* "password" | The password for the account.

Responses:
* 200 OK | Returns the token.
* 400 Bad Request | If the user can't be logged in due to lack of the required fields on the resquest body.
* 401 Unauthorized | If the user isn't found on the database or the credentials don't match.
* 500 Internal Server Error | If there has been a server error. 

    
### /api/v1/auth/logout
### GET 
Allows to logout the user.

The access is private and is only allowed to a logged in user (regardless of the role).

This endpoint doesn’t require parameters or a payload to be accessed.

Responses:
* 200 OK | Returns an empty data.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of login.
* 500 Internal Server Error | If there has been a server error. 

    
### /api/v1/auth/me
### GET 
Gets currently logged in user.

The access is private and is only allowed to a logged in user (regardless of the role).

This endpoint doesn’t require parameters or a payload to be accessed.

Responses:
* 200 OK | Returns the data of the user that is currently logged in.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of login.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/products 
### POST  
Creates and stores a new product on the database.

The access is private and is only allowed to a logged in user with role "admin".

This endpoint does not require parameters but it requires to send a resquest body with the mandatory fields:
* "name" | Given name for the product. 
* "description" | The description of the product.
* "category" | The category in which the product is included.
* "unit" | The base unit of the product.
* "unitPrice" | The unit price of the product.

The body can also take the optional fields:
* "discount" | If applicable a discount to the product.
* "size" | The size (S, M, L or XL) of the product.
* "dimensions" | The dimensions (height, width and/or depth) of the product.
* "images" | An array with the images for the product.
* "createdAt" | By deafult it will assume the current date.

Responses:
* 201 Created | Returns the data of the created product. 
* 400 Bad Request | If the product can't be created due to a validation error of the database such as a missing required field or a duplicated field that must be unique.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/products  
### GET
Gets the information regarding all the products.

It is publicly accessible.

This endpoint doesn’t require parameters or a payload to be accessed. It is possible, however, to select, sort and manage pagination according to the query request:
* /api/v1/products?select=name | allows to get only the field(s) selected aditionally to the field "_id" and "category"; in this example, it will return only the "_id", "category" and "name" of all products. 
* /api/v1/products?sort=createdAt | allows to sort the results by the chosen field, in this example by the created date.  
* /api/v1/products?page=2 | selects the intended page; in this example 2.
* /api/v1/products?limit=10 | defines the number of results that should be shown per page; in this example set to 10.

Responses:
* 200 OK | Returns the data of all the products according to the request query if any was applied. It also provides information regarding pagination (previous page if it's not the first and next page if it's not the last one as well as the limit) and the number of results on the page. 
* 500 Internal Server Error | If there has been a server error.


### /api/v1/products/:id
### GET
Gets the information regarding a single product.

It is publicly accessible.

This route requires a parameter: the id of the intended product.

Responses:
* 200 OK | Returns the data of the required product.
* 404 Not Found | If no product is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 

  
### /api/v1/products/:id   
### PUT 
Updates a given product.

The access is private and is only allowed to a logged in user with role "admin".

This route requires a parameter: the id of the product intended to be updated.

It also requires a body with the field or fields to be updated and the respective values. The field reviews must not be handled on this route, as reviews have their own routes to be inserted, changed and deleted.

Responses:
* 200 OK | Returns the data of the product with the updated values.
* 400 Bad Request | If the product can't be updated due to a validation error of the database such as value longer then the maxlength or a duplicated field that must be unique or if it includes the field reviews.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 404 Not Found | If no product is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/products/:id     
### DELETE 
Deletes a given product.

The access is private and is only allowed to a logged in user with role "admin".

This route requires a parameter: the id of the product intended to be deleted.

Responses:
* 200 OK | Returns the data of the product that was deleted.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route due to inappropriate role.
* 404 Not Found | If no product is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error.


### /api/v1/products/:id/reviews
### POST  
Creates a new product review on the database.

The access is private and is only allowed to a logged in user (regardless of the role).

This route requires a parameter: the id of the product for which the review is intended to. 

It also requires to send a resquest body with at least one of the fields:
* "review" | The review the user has for the product. 
* "rating" | The rating (1, 2, 3, 4 or 5) that the user gives to the product.

Responses:
* 201 Created | Returns the data of the product with all the reviews including the one that was created. 
* 400 Bad Request | If the product can't be created due to a validation error of the database such such as a value longer then the maxlength or a value different from the given options or if none of the fields on the resquest body are provided or provided but empty.
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 404 Not Found | If no product is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error. 


### /api/v1/products/:id/reviews/   
### GET 
Gets all the reviews of a given product.

It is publicly accessible.

This route requires a parameter: the id of the intended product.

Responses:
* 200 OK | Returns the data of all the reviews for the given product. 
* 404 Not Found | If no product is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error.


### /api/v1/products/:id/reviews/:reviewId   
### GET 
Gets one specific review of a given product.

It is publicly accessible.

This route requires two parameters: 
* :id | The id of the product the review belongs to.
* :reviewId | The id of the intended review.

Responses:
* 200 OK | Returns the data of the required product review. 
* 404 Not Found | If no product is found with the id indicated on the request parameter or if the indicated id isn't a valid one.
* 500 Internal Server Error | If there has been a server error such as an invalid review id despite a valid product id.

    
### /api/v1/products/:id/reviews/:reviewId
### PUT
Updates one specific product review.

The access is private and is only allowed to a logged in user that must be the same as the owner of the review.

This route requires two parameters: 
* :id | The id of the product the review belongs to.
* :reviewId | The id of the intended review.

It also requires a body with the field or fields to be updated and the respective values.

Responses:
* 200 OK | Returns the data of the product with all the reviews (including with the updated value(s)).
* 400 Bad Request | If the review can't be update due to a validation error of the database such such as a value longer then the maxlength or a value different from the given options or if none of the fields on the resquest body are provided or provided but empty. 
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route as it is not the owner of the review.
* 404 Not Found | If no product or review is found with the respective id indicated on the request parameter or if the indicated product id isn't a valid one.
* 500 Internal Server Error | If there has been a server error such as an invalid review id despite a valid product id.


### /api/v1/products/:id/reviews/:reviewId
### DELETE 
Deletes one specific product review.

The access is private and is only allowed to a logged in user that must be the same as the owner of the review.

This route requires two parameters: 
* :id | The id of the product the review belongs to.
* :reviewId | The id of the intended review.

Responses:
* 200 OK | Returns the data of the product with all the reviews (already without the one that was deleted). 
* 401 Unauthorized | If the user is not authorized to access the route due to lack of appropriated login.
* 403 Forbidden | If the user is not authorized to access the route as it is not the owner of the review.
* 404 Not Found | If no product or review is found with the respective id indicated on the request parameter or if the indicated product id isn't a valid one.
* 500 Internal Server Error | If there has been a server error such as an invalid review id despite a valid product id.
