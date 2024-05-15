import { FormProvider, useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';

import Button from '../button';
import TextInput from '../text-input';
import { useAppDispatch } from '../../redux/hooks';
import {
  addTodo,
  editTodo,
  listTodos,
  setIsNewNotActive,
} from '../../redux/slices/todoSlice';
import newTaskSchema from '../../utils/new-task.schema';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormValues {
  task: string;
}

interface IEditCardProps {
  todo?: {
    id: string;
    task: string;
  };
}

export default function EditCard({ todo }: IEditCardProps) {
  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(newTaskSchema),
    defaultValues: {
      task: todo?.task,
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isDirty },
  } = methods;

  const dispatch = useAppDispatch();

  const onSubmit = (data: FormValues) => {
    const { task } = data;

    if (todo) {
      // edit
      dispatch(editTodo({ id: todo.id, task }));
    } else {
      // crete new
      dispatch(addTodo(task));
      // refetch
      dispatch(listTodos());
    }
  };

  return (
    <div className="py-2 flex justify-between space-x-8 h-full">
      <div className="flex-1 h-full">
        <FormProvider {...methods}>
          <TextInput id="task" />
        </FormProvider>
      </div>
      <div className="flex items-center space-x-2 -mt-4">
        <Button
          variant="primary"
          onClick={handleSubmit(onSubmit)}
          isActive={isValid}
          disabled={!isDirty}
        >
          Save
        </Button>

        <IoMdClose
          className="text-4xl hover:cursor-pointer"
          onClick={() => dispatch(setIsNewNotActive())}
        />
      </div>
    </div>
  );
}
