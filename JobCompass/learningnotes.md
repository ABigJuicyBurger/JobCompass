Mar 1

- Set up react + dependencies
  \_ create vite @ latest -- --template react
  \_ npm init y (redundant due to ^)
  \_ npm install axios cors dotenv express knex mysql2 react-router-dom sass

  - setup basic browser router, routes, route

- Help create DB

  - look at @joblistcreation.sql (connect to DB, create DB, then npx knex init)
    \_switch default file to export module with mysql2 connection and the payload (knexfile.js)

  - create migration file
    \_npx knex migrate:make create_job_postings

    - up: create ; down: delete
    - edit migration file (check migrations folder)
      \_ now contains relevant job info

  - create tables!
    \_ npx knex migrate:latest (like up)

    - to drop: npx knex migrate:rollback

  - seed data
    \_ npx knex seed:make jobs-data (makes seeds folder)
    \_ in seeds folder import the data and just use DB name
    \_ make folder name of seed-data and put the imported data in export default file

  Mar 03

  - execute seed files and add to DB
    \_ npx knex seed:run
    \_ lets script some of these codes:

    - "migrate": "knex migrate:latest",
    - "migrate:down": "knex migrate:down",
    - "migrate:rollback": "knex migrate:rollback",
    - "seed": "knex seed:run"
      \_ also install nodemon to watch for changes

  - DB stuff done! Now some basic routing and querying with Express
    \_ set up index.js file with .env, express and instantiate it with port
    \_ run it with node index.js
    - tomorrow set up a route and create it; initKnex config and fetch that data :0

March 04

- Route setting
  \_ imported initknex and configuration
  \_ make an instancee of knex with initknex(config)
  \_ setup route for jobs and link to jobsroutes
  \_ jobsroutes has router using express and gets a route and uses controller
  \_ the controller does stuff (like handle requests)

  March 05

- we got jobs: now let's start the front end
  \_ play around with google maps
  \_ Get api key from site (https://visgl.github.io/react-google-maps/docs/get-started)
  \_ Map is functional and shows on page centerd in calgary with a bit of space around it to showw the job card selected
  \*\*\*\* Need to show job markers eventually w/ basic tooltips (AI HELPED HERE)

  March 06
  \_ return data with axios request; now i need to form a job card (tomorrow me)

  march 08
  \_ start with a job card and see how it looks!
  \_ looks horrible! but all data is successfuly sent so just need to style ( :)

  March 10

  - do a little job card styling during learning studio
    \_ install date-fns and use it to format date from disgusting ISP 8601
    \_ little job card styling done! \*\*\*\ still need some logic like saving + apply, will look at once done job list
  - job list done! for last hour of day will incorporate a bit of TS
    \_ npm i -g typescript
    \_ create tsconfig file w/ tsc --init
    \_ create a type object for jobCard with its shape
    \_ use it where needed in the state "storage", mention what im returning JSX,
    mention what other status should return, mention what methods are returning,
    and adjust tsconfig to return JSX.
    - Will learn to type as i go
    - to prevent complications let me summarize:
      \_ created type definition modeling shape of job data
      \_ defined types for properties of this job
      \_ exported it
      \_ imported it to jobcard and added return type to component (JSX.Element)
      \_ type state hooks with generics (<JobCardType | null> and <Boolean>)
      \_ added promise return type to async fnxn (: Promise<void>)
      \_ : is annotate type and <> is generic type (definite type vs conditional type)
  - for now let's create a job list container which can link to particular job
    \_ practiced types in joblist too, had to import JSX + npm i types/react
    in order for TS to find namespace JSX
    \_ and made an interface for .env so TS understands Vite
  -

March 12

- got the okay for capstone + completed capstone proposal
- lost .env files when switching branches! made a new one and locally saved it this time
