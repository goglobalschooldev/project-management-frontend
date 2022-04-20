import { Navigate, useRoutes } from "react-router-dom";
//Components
import MainLayout from "./layout/MainLayout";
import Layout from "./layout/Layout";
//Page
import Login from "./Pages/login/Login";
import Users from "./Pages/users/Users";
import Dashboard from "./Pages/dashboard/Dashboard";
import Project from "./Pages/project/Project";
import Team from "./Pages/team/Team";
import Calendar from "./Pages/calendar/Calendar";
import Report from "./Pages/report/Report";

export default function Router() {
  const token = window.localStorage.getItem("token");
  let pageLogin = useRoutes([{ path: "*", element: <Login /> }]);
  let AppPage = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "project", element: <Project /> },
        { path: "calendar", element: <Calendar /> },
        { path: "team", element: <Team /> },
        { path: "user", element: <Users /> },
        { path: "report", element: <Report /> },
      ],
    },
    { path: "/login", element: <Login /> },
  ]);

  // useEffect(() => {
  //   if (isLogout) {
  //     navigate("/");
  //   }
  // }, [isLogout]);

  if (token) {
    return AppPage;
  } else {
    return pageLogin;
  }
}
