import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';

function App() {
    // useState is a React Hook that let you add a state variable to your component.
    // const [state, setState] = useState<type>(initialState);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        agent.Activities.list().then(response => {
            setActivities(response);
        });
    }, []);

    function handleSelectActivity(id: string) {
        setSelectedActivity(activities.find(x => x.id === id));
    }

    function handleCancleSelectActivity() {
        setSelectedActivity(undefined);
    }

    function handleFormOpen(id?: string) {
        id ? handleSelectActivity(id) : handleCancleSelectActivity();
        setEditMode(true);
    }
    
    function handleFormClose(id?: string) {
        setEditMode(false);
    }
    
    function handleCreateOrEditActivity(activity: Activity) {
        activity.id 
        ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
        : setActivities([...activities, { ...activity, id: uuid() }]);
        setEditMode(false);
        setSelectedActivity(activity);
    }
    
    function handleDeleteActivity(id: string) {
        setActivities([...activities.filter(x => x.id !== id)]);
    }
    
    return (
        <>
            <NavBar openForm={handleFormOpen}></NavBar>
            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard 
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancleSelectActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                />
            </Container>
        </>
    );
}

export default App;
