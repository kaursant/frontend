
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactList from "./components/Contact_list/ContactList";
import ContactAdd from "./components/Contact_add/ContactAdd";
import ContactUpdate from "./components/Contact_update/ContactUpdate.jsx";

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/list" element={<ContactList />} />
      <Route path="/contact/add" element={<ContactAdd />} />
      <Route path="/contact/update/:id" element={<ContactUpdate />} />
    </Routes>
   </Router>
  );
}

export default App;
