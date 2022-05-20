import Layout from "./components/Layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import CreateForm from "./pages/CreateFood/CreateForm";
import FindFood from "./pages/FindFood/FindFood";
import EditForm from "./pages/EditForm/EditForm";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create-food" element={<CreateForm />}></Route>
        <Route path="/edit-food/:foodId" element={<EditForm />}></Route>
        <Route path="/find-food" element={<FindFood />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
