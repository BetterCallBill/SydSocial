import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';

export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const history = useHistory();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{id: string}>();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: '',
    });
    
    useEffect(() => {
      if (id) {
        loadActivity(id).then(activity => {
            setActivity(activity!);
        })
      } else {
        setActivity({
            id: '',
            title: '',
            date: '',
            description: '',
            category: '',
            city: '',
            venue: '',
        });
      }
    }, [id, loadActivity]);

    function handleSubmit() {
        if (activity.id.length === 0) {
            // create activity
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => {
                // v6: useHistory => useNavigate
                history.push(`/activities/${newActivity.id}`);
            })
        } else {
            updateActivity(activity).then(() => {
                history.push(`/activities/${activity.id}`);
            })
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { value, name } = event.target;
        setActivity({
            ...activity,
            [name]: value,
        });
    }
    
    if (loadingInitial) {
        return (<LoadingComponent content='Loading activity...' />)
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} type='date' />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />

                <Button.Group widths={2}>
                    <Button loading={loading} positive type='submit' content='Save'></Button>
                    <Button as={Link} to='/activities' type='button' content='Cancel'></Button>
                </Button.Group>
            </Form>
        </Segment>
    );
})