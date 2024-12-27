# Ultimate Hello World

**Alternate version:** I also built another version of this template that takes advantage of create-react-app for front-end, but retains the same structure for node back-end. You can find it [here](https://github.com/andrewnessinjim/ultimate-hello-world-cra).

A hello world app that does what all hello word apps have been traditionally doing: display a static hello world. You can view the app deployed [here](https://ultimate-hello-world.herokuapp.com/) (not operational because Heroku doesn't have a free tier anymore). The page also shows the tools used in displaying just hello world:

* User interface written in **ReactJS** and **Sass**
* Server written with **Typescript** and executed in **NodeJS**
* Static web content served with **Express**
* Dynamic content served with **Apollo** server that is based on **GraphQL**
* Persistent data stored in **MongoDB**
* Unit test cases written using **Jest**
* End to end test cases written using **Cypress**
* Dependencies managed by **npm**
* CI/CI pipeline implemented in **CircleCI**
* Application deployed in **Heroku**
* **Pug** used minimally to bootstrap the app
* Source code maintained using **Git** and **GitHub**
* Application packaged in **Docker**
* **Gulp**, **Webpack** and **Babel** to automate development and build process.
* **Visual Studio Code** IDE (project includes configurations to make debugging in vscode easier)

The main goal of this project is to demonstrate all these tools working together that can be used as a template for apps based on the same tools.

## How To Use
1) Download ZIP version of this repo's `develop` branch to avoid copying over the git history.
2) Extract the contents into an empty directory. We'll refer to this directory's name as `PROJECT_NAME` and the full path as `PROJECT_ROOT`.
3) Run `docker-compose up` in the root of the project and visit http://localhost:3000 to verify "Hello World" output.
4) Exit the docker-compose process started in step 3.
5) Run `docker volume prune` to drop the volume created from step 3.

6) Make below modifications in `docker-compose.yml`:
* Replace `local-ultimate-hello-world` with `local-PROJECT_NAME`
* Replace `ultimate-hello-world-user` with `PROJECT_NAME-user`
* Replace `ultimate-hello-world-pass` with `PROJECT_NAME-pass`
* Replace `ultimateHelloWorld` db namespace with `PROJECT_NAME`

7) Make below modifications in `mongodb/init.js`:
* Replace `ultimate-hello-world-user` with `PROJECT_NAME-user`
* Replace `ultimate-hello-world-pass` with `PROJECT_NAME-pass`
* Replace `ultimateHelloWorld` db namespace with `PROJECT_NAME`

8) Perform steps 3,4 and 5 to verify if "Hello World" output is still working.

9) Make below modifications in `e2e/docker-compose.ci-dev-test.yml`:
* Replace `ultimate-hello-world-web` with `PROJECT_NAME-web`
* Replace `ultimate-hello-world-user` with `PROJECT_NAME-user`
* Replace `ultimate-hello-world-pass` with `PROJECT_NAME-pass`
* Replace `ultimateHelloWorld` db namespace with `PROJECT_NAME`

10) Make below modifications in `e2e/docker-compose.ci-staging-test.yml`:
* Replace `ultimate-hello-world-staging` with `PROJECT_NAME-staging`

11) Make below modifications in `.circleci/config.yml`:
* Replace `ultimate-hello-world-staging` with `PROJECT_NAME-staging`
* Replace `ultimate-hello-world` with `PROJECT_NAME`

12) Replace the contents in `README.md` to suit your project. Create a GitHub repo with name as `PROJECT_NAME` and push your `PROJECT_ROOT` to that repo's `develop` branch.

13) Login to CircleCI and click "Set Up Project" against your newly created repo, select develop branch and click "Let's Go". This should trigger a build in CircleCI and complete is successfully.

14) Create two apps in Heroku:
    1) `PROJECT_NAME`
    2) `PROJECT_NAME-staging`

15) Copy the API key from Heroku's Account Settings.

16) Open Project Settings for your new project in CircleCI, create a new environment variable as `HEROKU_API_KEY` and set its value to the key copied in step 15.

17) Create two new databases in MongoDB Atlas, each containing a collection called `pages`:
    1) `PROJECT_NAME`
    2) `PROJECT_NAME-staging`

18) Copy the JSON in `mongodb/init.js` at line 18 and insert it into both the `pages` collection created in step 17.

19) Navigate to Security > Database Access in Atlas. Create two new users:
    1) Production user
        * Username: `PROJECT_NAME`-user
        * Password: any strong password
        * Privileges: readWrite@`PROJECT_NAME`
    2) Staging user
        * Username: `PROJECT_NAME`-stagingUser
        * Password: any strong password
        * Privileges: readWrite@`PROJECT_NAME`-staging

21) Fetch your MongoDB srv record's host from Connect > Connect Your Application

20) Open project settings for `PROJECT_NAME` in Heroku and set following config vars:
    DB_NAMESPACE=`PROJECT_NAME`
    DB_URI=mongodb+srv://`PROJECT_NAME`-user:`productionPassword`@`srvHost`/`PROJECT_NAME`?retryWrites=true&w=majority

21) Open project settings for `PROJECT_NAME-staging` in Heroku and set following config vars:
    DB_NAMESPACE=`PROJECT_NAME-staging`
    DB_URI=mongodb+srv://`PROJECT_NAME`-staging-user:`stagingPassword`@`srvHost`/`PROJECT_NAME-staging`?retryWrites=true&w=majority

22) Push your code to your repo's `production` branch:

        git checkout -b production
        git push --set-upstream origin production

23) This should trigger a build in CircleCI that completes successfully.

24) You should be able to visit the hello world app in the following URLs depending on the apps you created in step 14:

    1) https://`PROJECT_NAME`.herokuapp.com
    2) https://`PROJECT_NAME-staging`.herokuapp.com

## How It Works
*To be added*

## Motivation
I put this together because I found the existing zero-config-solutions too abstract. I wanted more control over the tools without losing the benefits of end to end automation. After taking the courses listed below, I felt more comfortable configuring the tools separately and making them work together. (This is no longer true, because I have fallen in love with NextJs. I would never use this template over NextJs.)

## Courses That Helped Me Put This Together

* [3D Buzz Using Modern JavaScript Today](https://archive.org/download/3dbuzz-archive/modern-javascript--part-01/)
* [3D Buzz Production Ready ReactJS](https://archive.org/download/3dbuzz-archive/react-js-production-ready-apps-part-01/)
* [Bret Fisher's Docker Mastery](https://www.udemy.com/course/docker-mastery/)
* [MongoDB for JavaScript Developers](https://university.mongodb.com/courses/M220JS/about)
* And of course, the official documentation for all these tools
