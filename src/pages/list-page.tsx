import { FormProvider, useForm } from 'react-hook-form';
import Button from '../components/button';
import Container from '../layouts/container-layout';
import TextInput from '../components/text-input';
import { IoSearch } from 'react-icons/io5';
import ListCard from '../components/list-card';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  listTodos,
  searchTodos,
  setIsNewActive,
} from '../redux/slices/todoSlice';
import EditCard from '../components/edit-card';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../redux/slices/authSlice';

interface FormValues {
  todo?: string;
}

export default function ListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const { isNewActive, todos } = useAppSelector((state) => state.todo);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  useEffect(() => {
    dispatch(listTodos());
  }, [dispatch]);

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, watch } = methods;

  const watchSearchInput = watch('todo');

  const onSubmit = useCallback(
    (data: FormValues) => {
      const { todo } = data;
      dispatch(listTodos());
      if (todo) {
        dispatch(searchTodos(todo));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit, watchSearchInput]);

  return (
    <section className="py-4">
      <nav className="flex justify-end w-full">
        <div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => dispatch(logOutUser())}
          >
            Logout
          </Button>
        </div>
      </nav>
      <Container>
        <h2 className="text-3xl font-bold text-center py-2">My To-Do List</h2>
        <div
          id="search"
          className="border border-gray-800 rounded-lg mt-10 bg-gray-900"
        >
          <div className=" bg-gray-800 p-4 rounded-lg">
            <div className="flex space-x-8 mb-4">
              <div className="w-full">
                <FormProvider {...methods}>
                  <TextInput id="todo" icon={<IoSearch />} />
                </FormProvider>
              </div>
              <div className="my-2">
                <Button size="md" onClick={() => dispatch(setIsNewActive())}>
                  New
                </Button>
              </div>
            </div>
            {isNewActive ? (
              <div className="w-full">
                <EditCard />
              </div>
            ) : null}
          </div>
          <div id="children" className="p-4 min-h-screen md:min-h-96">
            {todos && todos.length ? (
              todos.map(({ id, task }) => {
                return <ListCard key={id} id={id} task={task} />;
              })
            ) : (
              <p>No todos</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
