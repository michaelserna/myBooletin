# [myBooletin](http://mybooletin.herokuapp.com/)
Know what's going on in your neighborhood.
######[Visit the app](http://mybooletin.herokuapp.com/)

## Introduction
This web application allows the community to view and post upcoming events in a specific area. This project was picked up and adapted from a codebase in its early stages - [link to repo](https://github.com/mvchaos/mvchaos)

## Features Added
- Added the ability to save each event to your Google Calendar
- Display current and future events only, and give options to view past events
- Drag and drop image upload when adding events
- Fixed bug in adding an event to the database
- Added a social media integration to like and share via Facebook

## Getting Started
Npm is used to install dependencies, which are stored in node_modules. The Node/Express server connects to a remote Firebase database. Before running locally, be sure to run:
```
npm install
nodemon server/server.js
```

## Technologies Utilized
This application uses AngularJS for rendering the different views and Node.js, Express, and Firebase for the backend server and database.

## In Progress
- Find events nearby by your location
- Add a feature to get directions to each event
- View events by month

## Git Workflow
Please refer to the [CONTRIBUTING.md](documentation/CONTRIBUTING.md) file to see our git workflow.

## Style Guide
Please refer to the [STYLE-GUIDE.md](documentation/STYLE-GUIDE.md) file to see our style guide.

## Testing
```
npm uninstall karma -g

npm install karma-cli -g

npm install

grunt server

grunt test
```

## Resources
- [Angular](https://docs.angularjs.org/guide)
- [Zip Code API](https://www.zipcodeapi.com/)
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/)
- [Firebase](https://www.firebase.com/docs/)
- [ng-flow](https://github.com/flowjs/ng-flow)

## Authors

Collin Adams | [Github](https://github.com/collinadams)

Jessica Park | [Github](https://github.com/jeehaepark)

Michael Serna | [Github](https://github.com/michaelserna)

Alice Kao | [Github](https://github.com/alicekao)
