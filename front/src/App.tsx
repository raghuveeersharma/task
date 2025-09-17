import Navbar from "./components/Navbar.js";
import { useThemeStore } from "./store/useThemeStore.js";
import { Outlet } from "react-router-dom";

const App = () => {
  const { theme } = useThemeStore();
  return (
    <div className="overflow-x-hidden text-soft" data-theme={theme}>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
