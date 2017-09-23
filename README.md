# Issue Reporter
An issue reporting system, which filters out duplicate issues.

# Project Structure
The code is structured as follows.

# Routing
Front end routing is done via React Router (`react-router-dom`). The `Main` component contains the routes to all paths that are resolved at the front end.

# React Components
These are in the `components` folder.
* `Dashboard`: The dashboard showing all the issues after the organization admins have logged in.
* `Home`: This is the component (including the sidebar) that the user sees after logging in. It's a welcome page for the user after logging in. The user here is the organization admin.
* `Main`: An abstraction for the routes of the app.
* `Sidebar`: The sidebar shown after the admin has logged in.
* `IssueCard`: The element showing an issue on the dashboard.
* `Welcome`: The page shown after the user has logged in.
* `IssuePage`: The page with the `Sidebar` and the `Dashboard` components.

## NPM Scripts
The scripts are used as below:
* `server`: Starts the dev server. This runs `server.js`, which uses `webpack-dev-middleware` to transpile code and `Express` for the server. This also uses the `compression` package to gzip files before sending to the client. `babel-node` transpiles the code before the server is started.
* `lint:watch`: Runs `lint`, which lints the code, and watches for changes in code and re-runs `lint` each time.
* `start`: Uses `npm-run-all` to parallely run the above two scripts.
* `localtunnel`: Uses the `localtunnel` package to share work-in-progress.
* `share`: Similar to `start`, but also runs `localtunnel`.

## Configuration Files
* `.babelrc` is used for transpiling React and ES6/ES7 code to plain JS.
* `.editorconfig` enforces indenting and other configurations for editors and IDEs.
* `.eslintrc.json` is the ESLint config file.

# Database
mLab is used for hosting the MongoDB database. There are 3 collections:

## Issues
The format of a document in this collection is:
```
{
    _id: Auto generated id,
    uid: The _id of the user who opened the issue,
    title: A title given by the user,
    org: The organization the issue is submitted to (the _id),
    location: The area the issue is reported in,
    duplicates: An array with the IDs of other duplicate issues,
    date: The date the issue was opened,
    status: A string that the organization can set to update the status
}
```

## Organizations
Format is:
```
{
    _id: Auto generated id,
    name: The name of the organization,
    dp: The profile picture of the organization, in base64
}
```

## Users
Format is:
```
{
    _id: Auto generated id,
    name: User's name
    username: A username chosen by the user,
    pwd: The password, encrypted by bcrypt,
    issues: An array with the _id of all issues opened by the user
}
```
