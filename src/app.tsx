import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { Toaster } from "solid-toast";
import { Meta, MetaProvider, Title } from "@solidjs/meta";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Solid Dashboard - Example</Title>
          <Meta
            name="description"
            content="Solid js and Solid Start Tutorial"
          />
          <Suspense>{props.children}</Suspense>
          <Toaster />
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
