websokken-test
==============

Description
-----------

Websokken-test tests whether the infrastructure supports websockets.


Install and run
---------------

* First make sure you have node.js and NPM installed.
* In the websokken-test root directory run `npm install`.
* Then run `node .` to start the websocket server.
* Depending on the infrastructure, point the load-balancer or reverse-proxy towards the opened server port (default: 9999).
* Go to the associated URL in the web-browser. You should see 'Websokken Test'.
* Wait until "Final test result: SUCCESS" or "Final test result: FAILED" appears in the test output section. This usually takes a couple of seconds.

Optionally, to see what happens if the websokken-test fails:

* Make sure the websocket server is still running.
* If nginx is installed run `sudo nginx -c $(readlink -nf nginx.conf)` from the websokken-test root directory.
* Depending on the infrastructure, point the load-balancer or reverse-proxy towards the opened server port (default: 8080).
* Go to the associated URL in the web-browser. You should see 'Websokken Test'.
* If you're in doubt whether your page was served from nginx: Check the response headers of '/websokken.js' in the browser developer-tools, it should include "X-Nginx".
* Wait until "Final test result: FAILED" appears in the test output.

