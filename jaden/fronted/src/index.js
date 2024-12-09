
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import dotenv from 'dotenv';

import 'core-js/features/array';
import 'core-js/features/map';
import 'core-js/features/set';
import 'regenerator-runtime/runtime';



const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
dotenv.config();