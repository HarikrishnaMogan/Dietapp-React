import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import UserContextFunc from "./Context/UserContext";


ReactDOM.render(
    <UserContextFunc>
    <App />
    </UserContextFunc>,
  document.getElementById('root')
);

