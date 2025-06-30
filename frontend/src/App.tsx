import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PageLayout } from "./components/Layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Lazy loading des pages
const HomePage = lazy(() =>
  import("./pages/Home").then((module) => ({ default: module.HomePage }))
);
const CountryDetailPage = lazy(() =>
  import("./pages/CountryDetail").then((module) => ({
    default: module.CountryDetailPage,
  }))
);

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
  credentials: "same-origin",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="text-lg">Chargement...</div>
            </div>
          }
        >
          <Routes>
            <Route Component={PageLayout}>
              <Route path="/" Component={HomePage} />
              <Route path="/country/:code" Component={CountryDetailPage} />
              <Route path="*" Component={() => <Navigate to="/" />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
