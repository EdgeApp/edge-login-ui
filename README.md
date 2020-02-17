# edge-login-ui

![Web Login UI](https://edge.app/wp-content/uploads/2018/06/Screen-Shot-2018-06-29-at-9.15.13-PM-e1530376379411.png)

![React Native Login UI](https://edge.app/wp-content/uploads/2018/06/IMG_4566-e1530377184509.png) 
![React Native Login UI](https://edge.app/wp-content/uploads/2018/06/IMG_4568-e1530377154374.png)
![React Native Login UI](https://edge.app/wp-content/uploads/2018/06/IMG_4569-e1530377138227.png)

This repo implements a UI layer on top of edge-core-js to provide web and React Native applications the interface required to do all the login and accounts management in just a small handful of Javascript API calls. For web based apps, all UI operates in an overlay iframe on top of the current HTML view. For React Native apps, all UI operates inside a single standalone React Native component which needs to be mounted in your app.

## Use

Each environment is implemented as a separate package

https://github.com/Airbitz/edge-login-ui/tree/master/packages/edge-login-ui-web

https://github.com/Airbitz/edge-login-ui/tree/master/packages/edge-login-ui-rn

See the readme in each of the repos above for installation and use in your app

## Development

To get started developing, just run `yarn`. This will install all the dependencies for both packages. Then just switch into whichever package directory you want to work with and begin developing.

You should run the following scripts from this top-level directory:

* yarn flow
* yarn format
* yarn lint
* yarn lint --fix

This project uses a git pre-commit hook to automatically run flow & lint before every commit.
