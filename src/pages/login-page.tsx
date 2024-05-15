import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';

import AppLogo from '../components/app-logo';
import TextInput from '../components/text-input';
import schema from '../utils/schema';
import Container from '../layouts/container-layout';
import Button from '../components/button';
import { useAppDispatch } from '../redux/hooks';
import { loginUser } from '../redux/slices/authSlice';

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

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormValues) => {
    try {
      const { email, password } = data;
      const res = await dispatch(loginUser({ email, password }));

      // TODO: Handle response
      console.log('Res is **********: ', res);
    } catch (error) {
      console.log('Error is: ', error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      <AppLogo />
      <Container>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Email"
              id="email"
              icon={<FaUser />}
              placeholder="user@rapptrlabs.com"
            />
            <TextInput
              label="Password"
              id="password"
              icon={<FaLock />}
              type="password"
              placeholder="Must be at least 4 characters."
            />
            <Button className="mt-8" isActive={isValid}>
              Login
            </Button>
          </form>
        </FormProvider>
      </Container>
    </div>
  );
}
