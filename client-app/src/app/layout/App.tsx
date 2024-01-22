import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';

function App() {
    const { activityStore } = useStore();
    
    // useState is a React Hook that let you add a state variable to your component.
    // const [state, setState] = useState<type>(initialState);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

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
        setSubmitting(true);
        
        if (activity.id) {
            agent.Activities.update(activity)
                .then(() => {
                    setActivities([...activities.filter(x => x.id !== activity.id), activity]);
                    setSelectedActivity(activity);
                    setEditMode(false);
                    setSubmitting(false);
                })
                .catch();
        } else {
            activity.id = uuid();
            agent.Activities.create(activity)
                .then(() => {
                    setActivities([...activities, activity]);
                    setSelectedActivity(activity);
                    setEditMode(false);
                    setSubmitting(false);
                })
                .catch();
        }
    }
    
    function handleDeleteActivity(id: string) {
        setSubmitting(true);
        
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]);
            setSubmitting(false);
        });
    }
    
    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app...' />
    
    return (
        <>
            <NavBar openForm={handleFormOpen}></NavBar>
            <Container style={{ marginTop: '7em' }}>                
                <ActivityDashboard 
                    activities={activityStore.activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancleSelectActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
                />
            </Container>
        </>
    );
}

export default App;
