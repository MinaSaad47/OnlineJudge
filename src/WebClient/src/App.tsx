import AppLayout from "@/components/AppLayout.tsx";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import HomePage from "@/pages/home/HomePage.tsx";
import ProblemPage from "@/pages/problems/ProblemPage";
import ProblemsPage from "@/pages/problems/ProblemsPage";
import { NextUIProvider } from "@nextui-org/react";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      <main className='dark text-foreground bg-background'>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route path='/' element={<AppLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/problems' element={<ProblemsPage />} />
            <Route path='/problems/:slug' element={<ProblemPage />} />
          </Route>
        </Routes>
      </main>
    </NextUIProvider>
  );
}

export default App;
