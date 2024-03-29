import { useEffect, useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormTextInput from '../../../app/common/form/FormTextInput';
import FormTextArea from '../../../app/common/form/FormTextArea';
import FormSelectInput from '../../../app/common/form/FormSelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import FormDateInput from '../../../app/common/form/FormDateInput';
import { ActivityFormValues } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';

export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const history = useHistory();
    const { createActivity, updateActivity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required.'),
        description: Yup.string().required('The activity description is required.'),
        category: Yup.string().required('The activity category is required.'),
        date: Yup.string().required('The activity date is required.').nullable(),
        city: Yup.string().required('The activity city is required.'),
        venue: Yup.string().required('The activity venue is required.'),
    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => {
                setActivity(new ActivityFormValues(activity));
            });
        }
    }, [id, loadActivity]);

    function handleFormSubmit(activity: ActivityFormValues) {
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid(),
            };

            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }

    if (loadingInitial) {
        return <LoadingComponent content="Loading activity..." />;
    }

    return (
        <Segment clearing>
            <Header content="Activity Details" sub color="teal" />
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isSubmitting, dirty, isValid }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <FormTextInput placeholder="Title" name="title" />
                        <FormTextArea rows={3} placeholder="Description" name="description" />
                        <FormSelectInput placeholder="Category" name="category" options={categoryOptions} />
                        <FormDateInput placeholderText="Date" name="date" showTimeSelect timeCaption="time" dateFormat={'MMMM d, yyyy h:mm aa'} />
                        <Header content="Location Details" sub color="teal" />
                        <FormTextInput placeholder="City" name="city" />
                        <FormTextInput placeholder="Venue" name="venue" />
                        <Button.Group widths={2}>
                            <Button
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={isSubmitting}
                                positive
                                type="submit"
                                content="Save"></Button>
                            <Button as={Link} to="/activities" type="button" content="Cancel"></Button>
                        </Button.Group>
                    </Form>
                )}
            </Formik>
        </Segment>
    );
});
