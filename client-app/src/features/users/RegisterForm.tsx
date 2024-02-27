import { ErrorMessage, Form, Formik } from 'formik';
import FormTextInput from '../../app/common/form/FormTextInput';
import { Button, Header } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';

export default observer(function RegisterForm() {
    const { userStore } = useStore();

    return (
        // Formik: error (property), setErrors
        <Formik
            initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch(error => setErrors({ error }))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}>
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as="h2" content="Join us!" color="teal" textAlign="center" />
                    <FormTextInput placeholder={'Display Name'} name={'displayName'} />
                    <FormTextInput placeholder={'Username'} name={'username'} />
                    <FormTextInput placeholder={'Email'} name={'email'} />
                    <FormTextInput placeholder={'Password'} name={'password'} type="password" />
                    <ErrorMessage name="error" 
                        render={() => <ValidationErrors errors={errors.error} />} 
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content="Register" type="submit" fluid />
                </Form>
            )}
        </Formik>
    );
});
