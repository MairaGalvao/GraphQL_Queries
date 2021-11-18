// // import { useHistory } from "react-router-dom";

// import {useNavigate} from 'react-router-dom';

// function handleClick() {
   
//   const navigate = useNavigate();
// navigate('/home')
//   }

// export default function HomeButton() {
//   // let history = useHistory();



//   return (
//     <button type="button" onClick={handleClick}>
//       Go home
//     </button>
//   );
// }


import { Button } from "@mui/material";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";

const Component1 = () => {
  
  return <h1>Users who made the most commits in the Linux repository</h1>;
};

const Component2 = () => {
  return <h1>Users that have added the most lines of code to the Linux repository </h1>;
};

const Component3 = () => {
  return <h1>Users who removed most lines of code from the Linux repository</h1>;
};


const App = () => {
  
  let routes = useRoutes([
    { path: "/created-commits", element: <Component1 /> },
    { path: "/added-lines-code", element: <Component2 /> },
    { path: "/removed-lines-code", element: <Component3 /> },
    // ...
  ]);

  return routes;
};



const AppWrapper = () => {
  return (
    <>

<Link placeholder='Commits' onClick={useRoutes}>
Commits
    </Link> 
    <Router>


      <App />
    </Router>
    </>
  );
};

export default AppWrapper;