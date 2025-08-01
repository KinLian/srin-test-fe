import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./pages/main";
import { PhonePage, PhoneDetailPage, PhoneFormPage } from "./pages/phone";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="phone">
          <Route index element={<PhonePage />} />
          <Route path=":id">
            <Route index element={<PhoneDetailPage />} />
            <Route path="edit" element={<PhoneFormPage />} />
          </Route>
          <Route path="add" element={<PhoneFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
