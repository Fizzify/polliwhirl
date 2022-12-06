interface ISectionLayout {
  children: React.ReactNode;
}

const SectionLayout = ({ children }: ISectionLayout) => {
  return (
    <div className="container relative mx-auto flex h-[calc(100vh-7.22rem)] flex-col items-center justify-between text-white">
      {children}
    </div>
  );
};

export default SectionLayout;
