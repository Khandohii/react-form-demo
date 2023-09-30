
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return(
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field} />
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
}

const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField({...props, type: 'checkbox'});

    return(
        <>
            <label className='checkbox'>
                <input type='checkbox' {...props} {...field} />
                {children}
            </label>

            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
}


const CustomForm = () => {
    
    return (
        <Formik 
            initialValues = {{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false,
            }}

            validationSchema = {Yup.object({
                name: Yup.string()
                        .min(2, "Minumum length - 2 symbols!")
                        .required('Required field'),
                email: Yup.string()
                        .email('Invalid emal!')
                        .required('Required field'),
                amount: Yup.number()
                        .min(5, 'Mininum 5')
                        .required('Required field'),
                currency: Yup.string()
                        .required('Choose currency'),
                text: Yup.string()
                        .min(5, 'Mininum 5 symbols'),
                terms: Yup.boolean()
                        .required('Confirmation is required')
                        .oneOf([true], 'Confirmation is required'),
    
            })}
            
            onSubmit = {values => {
                console.log(JSON.stringify(values, null, 2));
            }}
        >
            <Form className="form">
                <h2>Send donation</h2>
                <MyTextInput
                    label='Your name'
                    id="name"
                    name="name"
                    type="text"
                />
                <MyTextInput
                    label='Your email'
                    id="error"
                    name="error"
                    type="error"
                />
                <MyTextInput
                    label='Amount'
                    id="amount"
                    name="amount"
                    type="number"
                />
                <label htmlFor="currency">Currency</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select"
                    >
                        <option value="">Choose currency</option>
                        <option value="USD">USD</option>
                        <option value="UAH">DKK</option>
                        <option value="RUB">EUR</option>
                </Field>
                <ErrorMessage className='error' name='currency' component='div'/>
                <label htmlFor="text">Message</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className='error' name='text' component='div'/>
                <MyCheckbox
                    name="terms" 
                >Do you agree with the privacy policy?</MyCheckbox>
                <button type="submit">Send</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;