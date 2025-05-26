import "@web/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "../store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  console.log(isAuthenticated);
  console.log(pathname);
  useEffect(() => {
    if (!isAuthenticated && pathname !== `/auth`) {
      router.push(`/auth`);
    }
    if (isAuthenticated && pathname === `/auth`) {
      router.push(`/`);
    }
  }, [isAuthenticated, pathname, router]);
  return <Component {...pageProps} />;
};

export default function Root({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <App Component={Component} {...pageProps} />
    </Provider>
  );
}
