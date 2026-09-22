import { BrowserRouter, Route, Routes } from "react-router-dom";
import SettingPage from "./pages/SettingPage";
import CoursePage from "./pages/CoursePage";
import StudentPage from "./pages/StudentPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      {/* Your app content */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App