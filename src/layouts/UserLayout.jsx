import { Outlet } from "react-router-dom";
import NavbarUser from "./NavbarUser";
import Footer from "./Footer";
const UserLayout = () => {
  return (
    <div >
      <NavbarUser/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
