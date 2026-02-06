// project import

import MainLayout from "../layouts/main-layout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
 

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <NotFound/> 
    }
  ],
};

export default MainRoutes;
