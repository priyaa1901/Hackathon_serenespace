
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Journal from "./pages/Journal";
import SelfCare from "./pages/SelfCare";
import Games from "./pages/Games";
import Profile from "./pages/Profile";
import BreathingExercise from "./pages/BreathingExercise";
import NotFound from "./pages/NotFound";
import AuthRoute from "./components/AuthRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<AuthRoute><Dashboard /></AuthRoute>} />
          <Route path="/chat" element={<AuthRoute><Chat /></AuthRoute>} />
          <Route path="/journal" element={<AuthRoute><Journal /></AuthRoute>} />
          <Route path="/self-care" element={<AuthRoute><SelfCare /></AuthRoute>} />
          <Route path="/games" element={<AuthRoute><Games /></AuthRoute>} />
          <Route path="/profile" element={<AuthRoute><Profile /></AuthRoute>} />
          <Route path="/breathing" element={<AuthRoute><BreathingExercise /></AuthRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
