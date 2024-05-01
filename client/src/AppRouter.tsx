import { ReactElement } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import PersonalNotes from './pages/PersonalNotes';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorPage from './pages/ErrorPage';

export default function AppRouter(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <PageTemplate>
              <Outlet />
            </PageTemplate>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute authenticated={false}>
                <Auth />
              </ProtectedRoute>
            }
          />
          <Route
            path='/notes'
            element={
              <ProtectedRoute authenticated={true}>
                <PersonalNotes />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

/**
 *
 * @param props
 * @returns
 */
function PageTemplate(props: { children: ReactElement }): ReactElement {
  return (
    <>
      <Navbar />
      {props.children}
      <footer></footer>
    </>
  );
}
