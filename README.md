<h3>Pricescraper</h3>

This app fetches gas-station prices of a certain gas-station and alerts, when prices change with a sound and notification. The new prices are then displayed beside the old prices for easier comparison.

<h4>Prerequisites</h4>

This app was developed in the nodeJS ver. 8.10.0 environment.

<h4>Setup</h4>





1) Install nodeJS if you haven't done it yet.
https://nodejs.org/en/download/

2) Git-Clone the project
git clone https://github.com/idealistic91/priceDataScraper.git

3) Change into correct directory
cd priceDataScraper

4) Set environmental variables for the requestURL, the port and IP where to serve the app

export REQUESTURL=https://www.hoyer-tankstellen.de/tankstelle/hoyer_autohof_hansator-28217_bremen-hansator_7
	
	Only when run on a local machine:
	export PORT=3000
	
	export IP=127.0.0.1

5) Start the app

node app.js






Resources I've used:

https://scotch.io/tutorials/scraping-the-web-with-node-js
