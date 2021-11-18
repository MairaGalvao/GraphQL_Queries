// React
import React from 'react';

// GraphQL
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Routers from './Routers'


<Routers/>

const GetRepositoryInfoQuery = gql`
query {
  repository(owner:"torvalds", name:"linux") {
    nameWithOwner
      object(expression: "master") {
      ... on Commit {
        history {
          totalCount
          nodes {
            ... on Commit {
              committedDate
              additions
              author {
                name
                email
              }
            }
          }
        }
      }
    }
  }
}
`;

const withInfo = graphql(GetRepositoryInfoQuery, {
  options: ({ login = "torvalds" , name = "linux" }) => {
    return {
      variables: {
        login,
        name
      }
    }
  },
  props: ({ data }) => {
    // loading state
    if (data.loading) {
      return { loading: true };
    }

    // error state
    if (data.error) {
      console.error(data.error);
    }

    // OK state
    return { data };
  },
});

// Repository
class Repository extends React.Component {
  constructor(props) {
    super(props);

    // states
    this.state = {
      login: props.login,
      name: props.name,
      stargazers: 0,
      watchers: 0,
 

 
    };
  }

  componentWillReceiveProps(newProps) {
    console.log('new Props', newProps)
    // DRY
    const repo = newProps.data.repositoryOwner.repository;
    console.log("repo",repo)
    console.log("data",newProps.data)


    // states
    this.setState({
      login: this.props.login,
      name: this.props.name,
      stargazers: repo.stargazers.totalCount,
      watchers: repo.watchers.totalCount,      


    });
  }

  render() {
    return (<div>
      <h2>{this.state.login}/{this.state.name}</h2>
      <ul>
        <li>stargazers: {this.state.stargazers.toLocaleString()}</li>
        <li>watchers: {this.state.watchers.toLocaleString()}</li>
      </ul>
    </div>)
  }
}

const RepositoryWithInfo = withInfo(Repository);
export default RepositoryWithInfo;
