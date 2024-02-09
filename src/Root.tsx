import { Outlet } from "react-router-dom";
import Header from "./Components/Header";

function Root() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
