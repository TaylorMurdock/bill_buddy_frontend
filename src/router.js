import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import Index from "./pages/Index";
import Show from "./pages/Show";
import Auth from "./pages/Auth";
import { indexLoader, showLoader } from "./loaders";
import { createAction, deleteAction, updateAction } from "./actions";

// Create a BrowserRouter and define the routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        {/* Define routes and components */}
        <Route path="/auth/:action" element={<Auth />} />
        <Route path="/" element={<Index />} loader={indexLoader} />
        <Route path="post/:id" element={<Show />} loader={showLoader} />
        <Route path="create" action={createAction} />
        <Route path="update/:id" action={updateAction} />
        <Route path="/delete/:id" action={deleteAction} />
      </Route>
    </>
  )
);

export default router;
