type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="container mx-auto flex min-h-screen p-4 text-gray-900">
      {children}
    </div>
  );
};

export default Container;
