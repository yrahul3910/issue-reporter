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
