import { Form, Formik } from "formik";
import FormTextInput from "../../app/common/form/FormTextInput";
import { Button } from "semantic-ui-react";

export default function LoginForm() {
    return (
        <Formik 
            initialValues={{email: '', password: ''}} 
            onSubmit={values => console.log(values)}
        >
            {({handleSubmit}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
                    <FormTextInput placeholder={"Email"} name={"email"} />
                    <FormTextInput placeholder={"Password"} name={"password"} type="password" />
                    <Button positive content="Login" type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
    
}