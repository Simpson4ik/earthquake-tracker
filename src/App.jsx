import { RouterProvider } from 'react-router/dom';
import { ThemeProvider } from './context/ThemeProvider';
import { FiltersProvider } from './context/FiltersProvider';
import { router } from './router';
import './App.css';

export default function App() {
  return (
    <ThemeProvider>
      <FiltersProvider>
        <RouterProvider router={router} />
      </FiltersProvider>
    </ThemeProvider>
  );
}
