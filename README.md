# Js Snippet Application
CT30A3203 Web Applications, course project
Author: Aatu Laitinen

## Application overview

This is a web application for posting and viewing javascript snippets.

The application allows you to view all the posted snippets, and what people have liked and commented about them.

You can create a user to post your own snippets, and to comment on yours and others snippets.

As a user you are also able to like helpfull snippets and comments, so other users have an easier time finding usefull snippets!

You can also post code other than javascript but keep in mind that the code syntax highlighting only applies to javascript!

## Installation

Node.js is required to run the application (v16.13.0 recommended).

To get the application running execute the following commands in root folder: 

`npm install`  to install all required dependencies

`npm run dev:server` to get the server up and running

`npm run dev:client` to get the client up and running

front-end will start in port 3000 and back-end will be run in port 5000.

## Technology choises

Express.js was chosen as back-end for quick setup and simple Api implementation. (Also used in the course material).

React was chosen for front-end becouse of its highly versatility. As a modern front-end framework (or library to be specific) it provides many usefull tools that are also utilized in this project. (Previous experience with react also a driving factor)

Material UI was used for UI components (for its simplicity and versatility) and React-query was chosen for handling the api requests. (for its many usefull features and react compability)

Snippet highlighting was done with React Syntax Highlighter. (also for react compability and ease of use)

Database management was done with MongoDb and Mongoose. (Because very simple and effortless to use). 

The source code doesn't include a lot of comments, becouse the code should be self-documenting (variables and functions are named, so that they describe themselves).

## Features implemented:

Basic features with well written documentation: 25
Users can edit their own comments/posts: 4
Utilization of a frontside framework, React: 5
Use some highlight library for the code snippets, React Syntax Highlighter: 2 
Vote posts and comments (only one vote per user): 3

Total points: 39

