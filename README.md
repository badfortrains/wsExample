# wsExample
Demo of Websockets in react native

Basic test of react-native websocket polyfill
https://github.com/badfortrains/react-native/tree/WebSocket

This is a very early demo, and the polyfill contains bug.  Specifically, it leaks memory and does not handle errors correctly.  Currently binary data is not supported.

Includes slightlty modified versions of Firebase-client and Socket.io-client.


##Firebase
Loads firebase posts examples, and appends results as Text elements into page.  Modeled after first example from https://www.firebase.com/docs/web/guide/retrieving-data.html.
  Data loaded from https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts.

Note: In order for firebase to work, had to slightly modify the firebase client (firebase-debug)
+  Forced to always use websockets (JSONP breaks since the dom is not supported)
+  Changed how global scope handling
````
var goog = goog || {};
goog.global = this;
````
to

````
var goog = {};
window.goog =goog;
````

##Socket-io
Simplified chat example.  Includes chat server from https://github.com/rauchg/chat-example.  
Start chat server with ````node chatServer````.Navigate to ````http://localhost:5000````
to open chat window, sent messages will be appended as text views in the react-native app.

Note: 
+  JSONP polling will cause a crash since dom is not supported, need to pass ````{jsonp: false}```` on connect. 
+  Socket.io expects window.navigator to be a string, 
  added 
````
window.navigator = {
  userAgent: "react-native"
  }
````
to head of socket.io-client to make it work.
