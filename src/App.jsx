import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MultiStepForm from './components/MultiStepForm';
import DataTable from './components/DataTable';


function App() {
  // const [count, setCount] = useState(0)
  const [formData, setFormData] = useState([]);

  const handleFormSubmit = (data) => {
    setFormData([...formData, data]);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MultiStepForm onSubmit={handleFormSubmit} />} />
          <Route path="/result" element={<DataTable data={formData} />} />
    
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
