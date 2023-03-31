import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import { Counter, MyComponent } from './components/counter';

console.log('SUPERNAME',process.env.REACT_APP_NAME)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //Class base component

    <BrowserRouter>
        {/* <Counter /> */}
        <App />
    </BrowserRouter>

    // Function base component

    //   <React.StrictMode>
    //   <MyComponent title="Welcome to my app!" description="This is a simple React app." />
    //  </React.StrictMode>
);

reportWebVitals();
