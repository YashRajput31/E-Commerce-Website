/**
 * ============================================
 * MainLayout — Application Layout Wrapper
 * ============================================
 * Features:
 *  - Fixed Navbar at the top
 *  - Main content area that grows to fill available space
 *  - Footer at the bottom
 */

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col flex-1 min-h-[100dvh] bg-dark w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-grow w-full flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
