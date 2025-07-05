import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="899634914696-jjc28ggactkue1lqd19sid9mtibrc6tq.apps.googleusercontent.com">.
    <App />
  </GoogleOAuthProvider>,
)
