import { useEffect, useState } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormTextInput from '../../../app/common/form/FormTextInput';
import FormTextArea from '../../../app/common/form/FormTextArea';
import FormSelectInput from '../../../app/common/form/FormSelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import FormDateInput from '../../../app/common/form/FormDateInput';

export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: '',
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required.'),
        description: Yup.string().required('The activity description is required.'),
        category: Yup.string().required('The activity category is required.'),
        date: Yup.string().required('The activity date is required.'),
        city: Yup.string().required('The activity city is required.'),
        venue: Yup.string().required('The activity venue is required.')
    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => {
                setActivity(activity!);
            });
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

    if (loadingInitial) {
        return <LoadingComponent content="Loading activity..." />;
    }

    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={values => console.log(values)}>
                {({ handleSubmit }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <FormTextInput placeholder='Title' name='title' />
                        <FormTextArea rows={3} placeholder="Description" name="description" />
                        <FormSelectInput placeholder="Category" name="category" options={categoryOptions} />
                        <FormDateInput 
                            placeholderText="Date" 
                            name="date"
                            showTimeSelect
                            timeCaption='time'
                            dateFormat={'MMMM d, yyyy h:mm aa'}
                        />
                        <FormTextInput placeholder="City" name="city" />
                        <FormTextInput placeholder="Venue" name="venue" />

                        <Button.Group widths={2}>
                            <Button loading={loading} positive type="submit" content="Save"></Button>
                            <Button as={Link} to="/activities" type="button" content="Cancel"></Button>
                        </Button.Group>
                    </Form>
                )}
            </Formik>
        </Segment>
    );
});
