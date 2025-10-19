import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyles';
import Sidebar from './components/Sidebar';
import GroupsPage from './pages/GroupsPage';
import GroupPage from './pages/GroupPage';
import CreateGroupPage from './pages/CreateGroupPage';
import AddStudentPage from './pages/AddStudentPage';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<GroupsPage />} />
          <Route path="/group/:id" element={<GroupPage />} />
          <Route path="/create-group" element={<CreateGroupPage />} />
          <Route path="/add-student" element={<AddStudentPage />} />
          <Route path="/add-student/:groupId" element={<AddStudentPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
