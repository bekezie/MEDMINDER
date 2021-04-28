# Pill Organizer

Repository for project Pill Organizer and Reminder

## Overview

Our goal is to create a web-based pill organizer. In the interest of promoting public health and wellness, this program will help users organize & keep track of their medications and supplements.

## App URL

https://medminderio.herokuapp.com/

## Github Pages URL

https://pages.github.ccs.neu.edu/2021SPCS5500SB/project-pill_organizer/

## Getting Started

### Clone the Repo

Run

- `git clone https://github.ccs.neu.edu/2021SPCS5500SB/project-pill_organizer.git`
  to download the project

### Install the necessary packages in the frontend and backend directories

#### Run these lines from the root repository directory in your favorite CLI/Terminal/Bash

- `npm install`
- `cd frontend`
- `npm install`

Once all of the node packages are installed, create a ".env" file in root directory.
In this ".env" file, create variables called MONGO_URL and SESSION_SECRET and set them to your MongoDB URL and express session secret, respectively.
For more info on this, please checkout the dotenv package site. https://www.npmjs.com/package/dotenv

### Then open two bash terminals: one in the backend (repository root directory) and one in the frontend (/frontend)

- `npm test` in the backend directory
- `npm start` in the front end directory.

The app should load up in your default browser shortly after running these commands.

### Learn more about the tools used in this project

- https://getbootstrap.com/ - Bootstrap 5
- https://nodejs.org/en/ - Node JS
- https://expressjs.com/ - Express JS
- https://reactjs.org/ - React JS
- https://docs.atlas.mongodb.com/ - MongoDB Atlas
- https://devcenter.heroku.com/articles/git - Heroku Deployment

## Important Project Storage Locations

All react code and front end dev - "frontend" folder

Authentication Controllers - "auth" folder

Database Controllers - "db" folder

## Screenshots

![Landing Page](/docs/assets/landing.JPG)
![Register Page](/docs/assets/Register.JPG)
![Login Page](/docs/assets/login.JPG)
![Pillbox Page](/docs/assets/pillbox.JPG)
![Medications Page](/docs/assets/medications.JPG)
![Profile Page](/docs/assets/profile.JPG)

### Team Members & Khoury IDs

Jia Wei (Edmond) Liu - wayneleo818

Ciara Williams - cwil290831

Drayton Moody - draytonmoody

Nabil Arbouz - nabilarbouz

Yoselyn Cervantes - ycervantes

Bernard Ekezie - bekezie

Tiezhou Duan - datietuo

### Representatives

Drayton Moody - Primary

Jia Wei (Edmond) Liu - Secondary
