import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <main className="container mx-auto">
      <Outlet />
    </main>
  );
}
