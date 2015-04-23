/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;


//socket.io assumes navigator.userAgent is a string, supply a dummy one to make it happy
window.navigator.userAgent = "react-native";

var firebase = require("./firebase-debug")
var io = require("./node_modules/socket.io/node_modules/socket.io-client/socket.io");

var SocketIOExample = React.createClass({
  getInitialState:function(){
    return {messages: []}
  },
  componentDidMount: function(){
  //Must specifiy 'jsonp: false' since react native doesn't provide the dom
  //and thus wouldn't support creating an iframe/script tag
    this.socket = io('http://localhost:5000',{jsonp: false});
    this.socket.on('chat message', (msg) =>{
      this.state.messages.push(msg);
      this.forceUpdate();
    });
  },
  render: function(){
    return (
      <View>
        {
          this.state.messages.map(m => {
            return <Text>{m}</Text>
          })
        }
      </View>
    )
  }
})


var FirebaseExample = React.createClass({
  getInitialState: function(){
    return {}
  },
  componentDidMount: function(){
    var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");
    ref.on("value",function(snapshot){
      this.setState(snapshot.val())
    }.bind(this))
  },
  render: function(){
    return (
      <View>
        {
          Object.keys(this.state).map(k=>{
            return <Text>{this.state[k].title} - {this.state[k].author}</Text>
          })
        }
      </View>
    )
  }
})

var wsExample = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <FirebaseExample /> 
        <SocketIOExample />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('wsExample', () => wsExample);
