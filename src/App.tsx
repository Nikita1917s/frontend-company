import '@/styles/index.scss';
import { Routes, Route, Navigate } from "react-router-dom";
import { UsersPage } from "./pages/users";
import { UserDetailsPage } from "./pages/userDetails";
import { NotFoundPage } from "./pages/404";

const App = () => {
  return (
    <main>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
