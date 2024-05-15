import * as yup from 'yup';

const newTaskSchema = yup.object().shape({
  task: yup
    .string()
    .required('Task is required')
    .min(1, 'Task must be at least 1 character')
    .max(25, 'Task must not exceed 25 characters'),
});

export default newTaskSchema;
