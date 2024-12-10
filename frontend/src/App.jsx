import { Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ProductList from './components/Products/ProductList'
import ProductForm from './components/Products/ProductForm'
import { Box } from '@chakra-ui/react'

function App() {
  return (
    <Box p={4}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/" element={<ProductList />} />
      </Routes>
    </Box>
  )
}

export default App 