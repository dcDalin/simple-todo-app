import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AppLogo from '../components/app-logo';
import TextInput from '../components/text-input';
import schema from '../utils/schema';

interface FormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FormValues) => {
    console.log('Data is: ', data);
  };

  return (
    <div>
      <AppLogo />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput label="Email" id="email" />
          <TextInput label="Password" id="password" />
          <button>Login</button>
        </form>
      </FormProvider>
    </div>
  );
}
