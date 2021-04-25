import AuthenticaedApp from "authenticaed-app";
import ErrorBoundary from "components/error-boundary";
import { FullPageErrorFallBack } from "components/lib";
import { useAuth } from "context/auth-context";
import React from "react";
import { UnauthenticatedApp } from "unauthenticated";
import "./App.css";
function App(): React.ReactElement<any> {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallBack}>
        {user ? <AuthenticaedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
