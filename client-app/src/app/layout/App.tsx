import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';

function App() {
    const location = useLocation();
    const { commonStore, userStore } = useStore();
    
    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore])
    
    // spinner
    if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />
    
    return (
        <>
            <ToastContainer position="bottom-right" hideProgressBar />

            {location.pathname === '/' ? (
                <HomePage />
            ) : (
                <>
                    <NavBar />
                    <Container style={{ marginTop: '7em' }}>
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route exact path="/activities" component={ActivityDashboard} />
                            <Route path="/activities/:id" component={ActivityDetails} />
                            <Route path={['/createActivity', '/manage/:id']} component={ActivityForm} key={location.key} />
                            <Route path="/errors" component={TestErrors} />
                            <Route path="/server-error" component={ServerError} />
                            <Route path="/login" component={LoginForm} />
                            <Route component={NotFound} />
                        </Switch>
                    </Container>
                </>
            )}
        </>
    );
}

export default observer(App);
