import React from 'react'
import FornecedorForm from './pages/Fornecedor/FornecedorForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Inicial from './pages/Inicial'
import Menu from './components/Menu'
import FornecedorList from './pages/Fornecedor/FornecedorList'

const App = () => {
  return (
    <BrowserRouter>
    <Menu />
      <Routes>
        <Route path="/" element={< Inicial />} />
        <Route path="/cadastrar-fornecedor" element={< FornecedorForm />} />
        <Route path="/listar-fornecedores" element={<FornecedorList />} />
        <Route path="/editar-fornecedor/:id" element={< FornecedorForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App