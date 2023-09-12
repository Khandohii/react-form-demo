
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

// const validate = (values) => {
//     const errors = {}; 

//     if (!values.name) {
//         errors.name = 'Required field!';
//     } else if (values.name.length < 2) {
//         errors.name = 'Minimum length is 2 symbols';
//     }

//     if (!values.email) {
//         errors.email = 'Required field!';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//         errors.email = 'Invalid email!';
//     }

//     return errors;
// }


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
                        .required('Confirmation is needed')
                        .oneOf([true], 'Confirmation is needed'),
    
            })}
            
            onSubmit = {values => {
                console.log(JSON.stringify(values, null, 2));
            }}
        >
            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <MyTextInput
                    label='Ваше имя'
                    id="name"
                    name="name"
                    type="text"
                />
                <MyTextInput
                    label='Ваша почта'
                    id="error"
                    name="error"
                    type="error"
                />
                <MyTextInput
                    label='Количество'
                    id="amount"
                    name="amount"
                    type="number"
                />
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select"
                    >
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className='error' name='currency' component='div'/>
                <label htmlFor="text">Ваше сообщение</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className='error' name='text' component='div'/>
                <MyCheckbox
                    name="terms" 
                >Соглашаетесь с политикой конфиденциальности?</MyCheckbox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;