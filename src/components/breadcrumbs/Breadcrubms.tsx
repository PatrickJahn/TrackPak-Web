import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  let pathAccumulator = "";

  return (
    <div>
      <nav className="text-sm">
        {paths.map((path, index) => {
          pathAccumulator += `/${path}`;

          const isLast = index === paths.length - 1;

          return (
            <span key={path}>
              {!isLast ? (
                <Link to={pathAccumulator} className="hover:underline">
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </Link>
              ) : (
                <span className="font-semibold text-dark-paper dark:text-white">
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </span>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumbs;
