
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavbarUser from "./NavbarUser";
const MainLayout = () => (
  <>
   <div>
    <NavbarUser />
   </div>
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default MainLayout;
