import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./context/authcontext";

//import routes from react router
import { Routes, Route } from "react-router-dom";

//importing components
import SignInForm from "./components/auth/signin";
import SignUpForm from "./components/auth/signup";

//import context components
import RequireAuth from "./context/authRequired";
import Dashboard from "./components/dashboard/dashboard";
import OnlyAuthorized from "./context/onlyAuthorized";
function App() {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <OnlyAuthorized>
                  <SignUpForm />
                </OnlyAuthorized>
              }
            />
            <Route
              path="/signin"
              element={
                <OnlyAuthorized>
                  <SignInForm />
                </OnlyAuthorized>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  {" "}
                  <Dashboard />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
