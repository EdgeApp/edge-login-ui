# Airbitz Javascript UI - Beta (Under Development)

Supposed to be the Airbitz-core-js UI implementation. Though still entirely not usuable at the moment. Needs more fixing and debugging. You can run and test it using the airbitz-core-js-sample for compatibility.

## Clone the repos
	```sh
	git clone https://github.com/Airbitz/airbitz-core-js-sample
	git clone https://github.com/Airbitz/airbitz-core-js-ui2
	```

## Setup the airbitz-core-js-ui
	go to airbitz-core-js-ui2 directory

	```sh
	run "npm install"
	run "npm link"
	```

## Setup the airbitz-core-js-ui-sample
	go to airbitz-core-js-sample directory

	```sh
	run "npm install"
	run "npm link airbitz-core-js-ui"
	```
	change a line in the "webpack.config.js" from "loader: 'babel'" to "loader: 'babel-loader'"
	change a line in the "webpack.config.js" from "loader: 'json'" to "loader: 'json-loader'"
	change a line in the "src/sample-app.js" from "_abcUi = abcui.makeABCUIContext({" to "_abcUi = abcui.abcui.makeABCUIContext({" (This is a compile bug in the airbitz-core-js-ui that needs to be fix later)
	
	```sh
	run "npm run build" (You should have rsync installed in your machine/terminal)
	```