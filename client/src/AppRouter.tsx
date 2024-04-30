import { ReactElement } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Test from './pages/Test';

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
          <Route index element={<div>test</div>} />
          <Route path='test' element={<Test />} />
          {/* TODO: add error page */}
          {/* <Route path="*" element={<ErrorPage />} /> */}
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
      <nav></nav>
      {props.children}
      <footer></footer>
    </>
  );
}
