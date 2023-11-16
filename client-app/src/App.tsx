import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  // useState is a React Hook that lets you add a state variable to your component.
  // const [state, setState] = useState(initialState);
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])
  
  return (
    <div>
      <Header as='h2' icon='users' content='SydActivities' />
      
      <List>
        {
          activities.map((activity: any) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))
        }
      </List>
    </div>
  );
}

export default App;
