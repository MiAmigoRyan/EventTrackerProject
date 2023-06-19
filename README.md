# EventTrackerProject

# Overview
This full-stack Java Spring project communicated with a MySql Database that implements Rest API.
# Project Description
This climbing trainer training app will allow users to login and choose a preformatted training program based on the duration of training program and their goals. Additionally coaches will be able to log in and create training programs for their clients. Further features will include private messaging between coaches and their users.

# Database

![databse entity relationship] (https://github.com/MiAmigoRyan/EventTrackerProject/blob/main/ClimbTrainerDBER.png)

# Technologies used:
* STS4
* MySql Workbench
* github
* restAPI
* postman
* javaScript
* Angular
* TypeScript
* VS Code

# Lessons learned:
* ------------THIRD BUILD--------------------------------------
* For this third round building of this exercise tracking application I used Angularrebuild this appliaction. I utilizing Angular I was able to create a frontend in a more sophsticated and dyamac manner.
* To ensure seamless integration with the existing infrastructure, I capitalized on the Java Backend REST API that I had developed for the initial version. By reusing this backend, I could maintain data consistency and compatibility, saving valuable time and effort. The REST API facilitated communication between the frontend and backend, enabling the application to efficiently handle data requests and responses.
* The use of TypeScript added an extra layer of reliability to the codebase. TS allowed me to develop more stable and maintainable code than the original build. TypeScript's support for modern ECMAScript features and its enhanced tooling capabilities further contributed to the overall development experience.
* Further enhancments will include adding a list of exercises to workouts, user functionality - including admin, 'trainer', and 'athlete' levels, a more robust datdabase, and a commenting on exercises. these future functions will be branched and tested before being pushed to the main branch.



* ------------SECONDARY BUILD----------------------------------
* Upon the second build I applied javaScript to dynamically build elements, as well as implement baisc CRUD logic.
* additionally I applied simple math to js, sum of reps total reps per exercise.
* I also learned to apply bootstrap modals for forms using bootstrap documentation, google, and stack overflow.
* dynamically building elements with js is a usefull tool. in this step I built some elements in HTML and others in js. My takeaway is that the general structure of hte page is best implemented through HTML while the details of particular div's can easily be added with js. using js increases readability of the js file. However, my opinion is that css implementation is simpler if div id's and classes are included in HTML.
* another step in this build was to add to the db a many to many relationship beween exercises and workout sessions. this step too more time than I expected, but I was able to implement CRUD operations on the back end (STS). A further step will be to implement CRUD on the front end for workouts as well as display logic between exercises and workouts.
* an additional function I began to implement is a dark/light mode toggle, this function when completed will allow a user to choose dark or light mode upon switch slide

* ------------INITIAL BUILD------------------------------------
* In this initial build I practiced building a DB, mapping entity relationships, and preforming basic crud operations with a Rest API. I also reviewed an practiced deploying a tomcat .war file to an EC2 server.
* Rest API is a powerful and handy api with a number of built in CRUD methods. 
* Postman is a helpful tool for testing connections between various classes and interfaces when they are built sent to the web. 
* MySql Workbench is used to build the database, it allows for a simple an user friendly gui that reduces the ammount of errors that may be encountered writing a DB 'by hand'. 
* gitHub allowed for tracking of changes and a simple way to engage in further collaboration. 
* STS4 is utilized for writing compiling and testing Java code.

