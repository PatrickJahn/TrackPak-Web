import "./App.css";
import AppProvider from "./providers/AppProvider";
import AppRouter from "./routes/AppRouter";
import AdminAppRouter from "./routes/AdminAppRouter";

const hostname = window.location.hostname;

// Check for admin environments (must contain "admin" and "brainhunt" or be localhost for local admin)
const isAdmin = hostname.includes("admin");

function App() {
  return (
    <AppProvider>{isAdmin ? <AdminAppRouter /> : <AppRouter />}</AppProvider>
  );
}

export default App;
