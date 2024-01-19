import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
    // useState is a React Hook that let you add a state variable to your component.
    // const [state, setState] = useState<type>(initialState);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
            setActivities(response.data);
        });
    }, []);

    function handleSelectActivity(id: string) {
        setSelectedActivity(activities.find(x => x.id == id));
    }

    function handleCancleSelectActivity() {
        setSelectedActivity(undefined);
    }

    return (
        <>
            <NavBar></NavBar>
            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard 
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancleSelectActivity}
                />
            </Container>
        </>
    );
}

export default App;
