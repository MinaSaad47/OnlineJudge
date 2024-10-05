import "./global.css";

import { Toaster } from "@/components/ui/toaster.tsx";
import { apolloClient } from "@/lib/apollo-client.ts";
import { ApolloProvider } from "@apollo/client";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <main className='dark text-foreground bg-background'>
        <App />
        <Toaster />
      </main>
    </BrowserRouter>
  </ApolloProvider>
);
