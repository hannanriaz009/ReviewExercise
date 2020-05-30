React Typescript app with webpack
=============
This’s the update for the progress made so far



Have implemented an application structure to interact with third party data source i.e. REST APIs and perform CURD operations for different entities

The structure involves

React framework with one of the strongest state management mechanism for a front-end app 

Typescript and Webpack for implementation and build purposes

Webpack development engine to build changes automatically in development mode



In the application, the scoped covered so ar involves

Setup React typescript env
Created services to interact with Rest APIs to fetch, add, delete, and update 
Fetch and merge different APIs data randomly and show the assembled data in list view 
Implemented Delete functionality 
Setup UI modals for Add/Update flow *The API call services are completed but the invoking part is pending for this atm   




Note: The project env is flexible enough to change data source via just constants changes in src/config/constants.js, the current APIs start blocking requests often, also throw CORS exceptions which suspends the development.



Run project locally:



Readme has all the details needed for the project setup. Let’s have a quick overview for that as well

1. Run the following command in the root directory, this will install all the dependencies

````npm install````

2. Run the following command in the root directory to build a project with Webpack. 

````npx webpack````



Once you're done you can open index.html from root directory to test the application

OR 

You can run the following command to start development server and access it via http://localhost:8080 or incase the port is already taken, the process will run on a different one so use the URL shown in the console after running the command 

````npm start```