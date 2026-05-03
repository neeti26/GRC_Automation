import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

window.addEventListener('error', (event) => {
  const div = document.createElement('div');
  div.style = "color: red; padding: 20px; font-family: monospace; position: absolute; z-index: 9999;";
  div.innerText = `Window Error: ${event.message}\n${event.error?.stack || ''}`;
  document.body.appendChild(div);
});

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <div style={{padding: 40, color: 'red'}}><h1>React Render Error</h1><pre>{this.state.error?.stack}</pre></div>;
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
