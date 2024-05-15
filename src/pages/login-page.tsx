import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import AppLogo from '../components/app-logo';
import TextInput from '../components/text-input';
import schema from '../utils/schema';
import Container from '../layouts/container-layout';
import Button from '../components/button';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUser, loginUser } from '../redux/slices/authSlice';
import { useEffect } from 'react';

interface FormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { user, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/list');
    }
  }, [navigate, user]);

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  useEffect(() => {
    if (error) {
      toast.error(error, { id: 'login-error' });
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      navigate('/list');
    }
  }, [user]);

  const onSubmit = async (data: FormValues) => {
    try {
      const { email, password } = data;
      await dispatch(loginUser({ email, password }));
    } catch (err) {
      toast.error(error);
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
