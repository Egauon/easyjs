# Getting Started

To begin using the EasyJS library, you must first create an account. After creating an account it is time to link your website.


## Authentication

While EasyJS prides itself on being a simple backend library, the authentication process can seem daunting (it's not too bad though trust me). The authentication process can be explained in a few steps:

- ### Navigate to "My Sites"
  * Under the account dropdown menu, there should be a button titled "My Sites". Click on it.

- ### Click the add new site button
  * In the My Sites page there should be a green button with a plus symbol that takes you to the authentication page. 

- ### Get your "parentest" of directories
	* Copy and paste your website's URL into the provided input field and generate token.

> **_NOTE:_**  EasyJS only needs to verify only one html document in order to verify the entire website. To make this possible, however, you must use the most parent directory you have access to that also contains an HTML file. 
> **For example:** If you are using a Github pages website, the URL you want to use is the landing page: https://example.github.io/repo/, rather than https://example.github.io/repo/account/login. 

  - ### Copy generated token into the main HTML file for the provided URL
	* The token can be inserted anywhere within the main HTML file for your site.

- ### Check Website
	* Wait for your website to publish file changes and then click the **Check Website** button. 

And you're done! Just like that!

You can now begin editing the backend by clicking on the **EDIT** button in the My Sites page. 

# Main Functions

EasyJS adds a minimal amount of new functions to Javascript in order to maintain simplicity. The entire library can be consolidated into six functions, **however** only two are ever required. Those two functions are as follows:

## Ask()
```
Ask(Context, Query)
``` 
The Ask function is used by the front end and can be thought of as a way of asking for permission to view/change/inform the backend. 

There are two parameters for the Ask function. 
 - Context 
	 - Tells the backend what type of information it is receiving. 
 - Query
	 - Represents the actual information. 

**Example:**  

```Ask("Login", {username: "bob", password: 12345})```





## Respond()
```
Respond(Context, Function(data))
``` 
The Respond function is used by the backend and can be thought of a method to answer the questions asked by the front end. 

Like the Ask function, there are two parameters for the Respond function. 
 - Context 
	 - Determines which questions the Respond function will answer.
 - Function
	 - Provides the process in which questions are answered. 
	 
**Example:**  
```
Respond("Login", function(data){
	if(data.username == "bob" && data.password == 12345){
		return true;
	}else{
		return false;
	}
})
```


# Extra Functions

Here are some extra functions that aren't required for functionality of the library but are useful when building a website that can store important data.


## Save()
```
Save(Name, Value)
``` 
The Save function belongs to the backend and is used to retain vital information across server starts/stops.  

There are two parameters for the Save function. 
 - Name
	 - A chosen name to give the value being saved.
 - Value
	 - The value in which the Save function will save. 



**Example:**  
```
var userArray = ["bob", "adrien", "josie"]

Save("users", userArray)
```


This creates a save called "users" that is able to be retrieved using the Get function. It is wise to call the Save function when any important data has been collected, such as a user being created or account settings being updated. 

> :warning: **This data is saved using localStorage**: It is very important to not clear the cache of EasyJS' website if there is important information being saved. 



## Get()
```
Get(Name, DefaultType)
``` 
The Get function belongs to the backend and is used to retain vital information across server starts/stops.  

There are two parameters for the Get function. 
 - Name
	 - A name that corresponds to a saved name.
 - DefaultType
	 - The value in which the Get function should return if no previous data was saved. 

**Example:**  

```var userArray = Get("users", [])```

This creates a variable called "userArray" that defaults to an empty array, however if previous data was saved under the name "users", it replaces the empty array with the previous data. 

**Used with the Save function it would look like this:**
```
var userArray = Get("users", []);

userArray.push("joey");

Save("users", userArray);
```

