import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'; 
import './App.css';
import Launches from './components/Launches';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql/' 
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <h1 style={{ margin:'auto', width : 300, display : 'block' }}>SpaceX</h1>
          <Launches />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;