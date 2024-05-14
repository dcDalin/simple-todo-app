import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/, 'Invalid email'),
  password: yup.string().required('Password is required'),
});

export default schema;
