import MainNavBar from './mainNavBar';
import MainSideBar from './sidebar';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="sticky top-0 z-50">
        <MainNavBar />
      </header>
      <div className="h-full grid grid-rows-[1fr,auto] no-scrollbar">
        <section className="bg-alabaster h-[85vh] rounded-[1.75rem] grid grid-cols-[350px,auto,1fr] gap-x-8 p-4 relative">
          <MainSideBar />
          <span className="border-r border-r-smoky-black" />
          <div className="overflow-auto pr-4 no-scrollbar">{children}</div>
        </section>
        <footer className="h-12"></footer>
      </div>
    </>
  );
};

export default MainLayout;
