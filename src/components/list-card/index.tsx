import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

import Button from '../button';

export default function ListCard() {
  return (
    <div className="py-2 flex items-center p-2 rounded-lg justify-between">
      <h4>Some item</h4>
      <div className="flex items-center space-x-2">
        <Button variant="secondary">
          <MdEdit />
        </Button>
        <Button variant="danger">
          <MdDelete />
        </Button>
      </div>
    </div>
  );
}
