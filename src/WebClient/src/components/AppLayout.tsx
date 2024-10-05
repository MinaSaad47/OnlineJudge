import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
