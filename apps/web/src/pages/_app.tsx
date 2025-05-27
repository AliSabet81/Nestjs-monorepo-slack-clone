import "@web/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "../hooks/useAuth";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && pathname !== `/auth`) {
      router.push(`/auth`);
    }
    if (isAuthenticated && pathname === `/auth`) {
      router.push(`/`);
    }
  }, [pathname, router, isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Component {...pageProps} />;
};

export default function Root({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ``}
      >
        <App Component={Component} {...pageProps} />
      </GoogleOAuthProvider>
    </Provider>
  );
}
