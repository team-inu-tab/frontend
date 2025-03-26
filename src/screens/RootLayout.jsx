import { Outlet } from "react-router-dom";
import MenuBar from "@components/menu/menuBar";
import { useMediaQuery } from "react-responsive";
import { useMenuStore } from "../store/useMenuStore";

const RootLayout = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  const isMobileMenuOpen = useMenuStore((state) => state.isMobileMenuOpen);

  return (
    <>
      {isMobile && isMobileMenuOpen && <MenuBar />}
      <Outlet />
    </>
  );
};

export default RootLayout;
