import { Form, Formik } from "formik";
import FormTextInput from "../../app/common/form/FormTextInput";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() {
    const {userStore} = useStore();
    
    return (
        <Formik 
            initialValues={{email: '', password: ''}} 
            onSubmit={values => console.log(values)}
        >
            {({handleSubmit, isSubmitting}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
                    <FormTextInput placeholder={"Email"} name={"email"} />
                    <FormTextInput placeholder={"Password"} name={"password"} type="password" />
                    <Button loading={isSubmitting} positive content="Login" type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
    
})