import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";

import { DarkModeProvider } from "./context/DarkModeContext";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";

import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import RootLayout from "./ui/RootLayout";
import AuthLayout from "./ui/AuthLayout";
import ErrorFallback from "./ui/ErrorFallback";
import GlobalStyles from "./styles/GlobalStyles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/")}
      >
        <RootLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
      {
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate replace to="/dashboard" />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/bookings",
            element: <Bookings />,
          },
          {
            path: "/bookings/:bookingId",
            element: <Booking />,
          },
          {
            path: "/checkin/:bookingId",
            element: <Checkin />,
          },
          {
            path: "/cabins",
            element: <Cabins />,
          },
          {
            path: "/users",
            element: <NewUsers />,
          },
          {
            path: "/account",
            element: <Account />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <ReactQueryDevtools initialIsOpen={false} />

        <GlobalStyles />
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
