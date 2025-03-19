import { createBrowserRouter } from "react-router-dom";
import HomeView from "./Views/Home";
import AddThreadView from "./Views/AddThread";
import ThreadDetail from "./Views/ThreadDetail";
import EditThread from "./Views/EditThread";

export const router = createBrowserRouter([
  { path: "/", element: <HomeView /> },
  { path: "/add-thread", element: <AddThreadView /> },
  { path: "/view-thread/:id", element: <ThreadDetail /> },
  { path: "/edit-thread/:id", element: <EditThread /> },
  { path: "*", element: <h1>404 - Page Not Found</h1> },
]);
