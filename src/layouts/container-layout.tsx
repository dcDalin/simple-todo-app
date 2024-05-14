import React from 'react';

interface IContainerLayoutProps {
  children: React.ReactNode;
}

export default function Container(props: IContainerLayoutProps) {
  const { children } = props;

  return (
    <section className="max-w-md mx-auto py-4 w-full px-4 md:px-0">
      {children}
    </section>
  );
}
