import { BrowserRouter, Route, Routes } from "react-router";

import Homepage from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="about" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
