import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import { useSelector } from "react-redux";
import TestWebSocket from "./pages/TestWebSocket";

function App() {
  const user = useSelector(state => state.auth.user);
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Main /> : <Navigate to='/login' />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
          <Route path="/test" element={<TestWebSocket />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;