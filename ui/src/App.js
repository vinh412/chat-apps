import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatBox from "./pages/ChatBox";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(state => state.auth.user);
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <ChatBox /> : <Navigate to='/login' />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;