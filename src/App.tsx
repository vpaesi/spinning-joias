import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={2000} />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
