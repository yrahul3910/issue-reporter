# Issue Reporter
An issue reporting system, which filters out duplicate issues. LSA implementation inspired by [Chris McCormick's repository](https://github.com/chrisjmccormick/LSA_Classification).

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
* `Banner`: The navbar and banner of the main home page.
* `Login`: The page for organizations to log in
* `MainPage`: The main home page of the website.
* `Register`: The page for organizations to register.

## NPM Scripts
The scripts are used as below:
* `lint:watch`: Runs `lint`, which lints the code, and watches for changes in code and re-runs `lint` each time.
* `build`: Builds the `dist` files to be served by Flask.

## Configuration Files
* `.babelrc` is used for transpiling React and ES6/ES7 code to plain JS.
* `.editorconfig` enforces indenting and other configurations for editors and IDEs.
* `.eslintrc.json` is the ESLint config file.

## Other Files
`api.js` is a wrapper that sends the required request to the Dandelion NLP API.

# Database
mLab is used for hosting the MongoDB database. There are 2 collections:

## Issues
The format of a document in this collection is:
```
{
    _id: Auto generated id,
    username: The username of the user who opened the issue,
    title: A title given by the user,
    org: The organization the issue is submitted to (the username),
    location: The area the issue is reported in,
    date: The date the issue was opened,
    status: A string that the organization can set to update the status
}
```

## Users
This is used for both users and organizations. Format is:
```
{
    _id: Auto generated id,
    name: The name of the user/organization,
    username: Username chosen by the user/organization,
    pwd: The password, encrypted by bcrypt
}
```

# TODO
This is still a work in progress. As such, there's still a lot left to be done.
* Need to implement a dashboard for users--this should allow them to send new issues, and view the status of issues they opened. It need not show them duplicates.
* Need to implement the core algorithm, LSA. In this regard, [this repo](https://github.com/chrisjmccormick/LSA_Classification) and [this one](https://github.com/kernelmachine/pyLSA/blob/master/lsa.py) seem useful. The second seems to do better and implements it fully, while the first may be easier to understand. However, the second one relies on web scraping, and may not work in this particular use case.
* Need to finish working on the dashboard for the organization
