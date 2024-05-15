import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

import Button from '../button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { removeTodo, setIsEditActive } from '../../redux/slices/todoSlice';
import EditCard from '../edit-card';

interface IListCardProps {
  id: string;
  task: string;
}

export default function ListCard({ id, task }: IListCardProps) {
  const dispatch = useAppDispatch();

  const { editTodoId } = useAppSelector((state) => state.todo);

  const todo = {
    id,
    task,
  };

  return (
    <>
      {editTodoId === id ? (
        <div>
          <EditCard todo={todo} />
        </div>
      ) : (
        <div className="py-2 flex items-center p-2 rounded-lg justify-between">
          <h4>{task}</h4>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              onClick={() => dispatch(setIsEditActive(id))}
            >
              <MdEdit />
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                return dispatch(removeTodo(id));
              }}
            >
              <MdDelete />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
