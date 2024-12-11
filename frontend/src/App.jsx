import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ProductList from './components/Products/ProductList'
import ProductForm from './components/Products/ProductForm'
import EditProduct from './components/Products/EditProduct'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) return null
  
  return user ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Box>
      <Navbar />
      <Box p={4}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/products" 
            element={
              <PrivateRoute>
                <ProductList />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/products/new" 
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/products/edit/:id" 
            element={
              <PrivateRoute>
                <EditProduct />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/products" />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App 