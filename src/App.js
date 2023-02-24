import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layouts from "./page/Layouts";
import Store from "./page/Store";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Layouts defalutFloor={true}  />} />
        <Route path="/:floorNumber" index element={<Layouts defalutFloor={false} />} />
        <Route path="/store/:lang/:floor/:storeName" index element={<Store />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
