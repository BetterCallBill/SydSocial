import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
    return (
        <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
                <Routes>
                    <Route path="/" Component={HomePage} />
                    <Route path="/activities" Component={ActivityDashboard} />
                    <Route path="/activities/:id" Component={ActivityDetails} />
                    {['/createActivity', '/manage/:id'].map(path => (
                        <Route path={path} Component={ActivityForm} />
                    ))}
                </Routes>
            </Container>
        </>
    );
}

export default observer(App);
