import { FormProvider, useForm } from 'react-hook-form';
import Button from '../components/button';
import Container from '../layouts/container-layout';
import TextInput from '../components/text-input';
import { IoSearch } from 'react-icons/io5';
import ListCard from '../components/list-card';

interface FormValues {
  todo?: string;
}

export default function ListPage() {
  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  return (
    <section className="py-4">
      <nav className="flex justify-end">
        <Button size="sm" variant="secondary" className="w-20">
          Logout
        </Button>
      </nav>
      <Container>
        <h2 className="text-3xl font-bold text-center py-2">My To-Do List</h2>
        <div className="p-4 border border-gray-800 rounded-lg mt-10 bg-gray-900">
          <div className="flex space-x-8 mb-4">
            <div className="w-full">
              <FormProvider {...methods}>
                <TextInput id="email" icon={<IoSearch />} />
              </FormProvider>
            </div>
            <Button size="sm" className="w-20 my-2">
              New
            </Button>
          </div>
          <div>
            <ListCard />
            <ListCard />
          </div>
        </div>
      </Container>
    </section>
  );
}
