import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import AuthContext from "./store/authContext";

function App() {
  const authCntx = useContext(AuthContext);
  const loggedIn = authCntx.isLoggedIn;
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!loggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        {loggedIn && (
          <Route path="/profile">
            <UserProfile />
          </Route>
        )}

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
