import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
    // useState is a React Hook that let you add a state variable to your component.
    // const [state, setState] = useState(initialState);
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
            setActivities(response.data);
        });
    }, []);

    return (
        <>
            <NavBar></NavBar>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard activities={activities} />
            </Container>
        </>
    );
}

export default App;
