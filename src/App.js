// React
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import {

  Routes,

  useRoutes,
} from "react-router-dom";



// Apollo
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client';
import { ApolloLink, concat } from '@apollo/client';
import { HttpLink  } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Routers from './Routers'


// App.Components
import Repository from './repository'


// ------ building the link to github graphql + headers that contain the token -----
const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: 'bearer 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',
    }
  }));

  return forward(operation);
})
// ----------------------------------------------------------------------------------

const client = new ApolloClient({
  
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});


// App





export default class App extends Component {
  
 
  constructor () {
    super()
  }


  routeForRepository (login, name) {


    return {
      title: `${login}/${name}`,
      component: Repository,
      login,
      name
    }
  }

  
  

  render () {

    
    return <ApolloProvider client={client}>
      <Routers/>
        <Repository {...this.routeForRepository('torvalds','linux')} />

      </ApolloProvider>

      
  }
}