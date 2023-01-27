import Aside from "./Aside/index";
import Header from "./Header/index";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <>
      <Header />
      <Aside />
      <Outlet />
    </>
  );
};
export default SharedLayout;
