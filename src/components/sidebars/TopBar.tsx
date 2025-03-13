import Breadcrumbs from "../breadcrumbs/Breadcrubms";

const Topbar = () => {
  return (
    <div className="w-full h-14 backdrop-blur bg-white dark:bg-dark-paper p-2 px-4 flex items-center align-middle  ">
      <div className="">
        <Breadcrumbs />
      </div>
    </div>
  );
};

export default Topbar;
