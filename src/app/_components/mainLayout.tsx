import MainNavBar from './mainNavBar';
import MainSideBar from './mainSideBar';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="sticky top-0 z-50">
        <MainNavBar />
      </header>
      <div className="h-full grid grid-rows-[1fr,auto]">
        <section className="bg-alabaster max-h-[85.5dvh] overflow-hidden rounded-[1.75rem] grid grid-cols-[350px,auto,1fr] gap-x-6 p-4 relative">
          <MainSideBar />
          <span className="border-r border-r-smoky-black" />
          <div className="overflow-auto min-h-screen">{children}</div>
        </section>
        <footer className="h-12"></footer>
      </div>
    </>
  );
};

export default MainLayout;
