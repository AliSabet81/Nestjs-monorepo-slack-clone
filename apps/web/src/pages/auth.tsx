import { useDispatch } from "react-redux";
import { login } from "../store/auth";

export default function Auth() {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(login({ user: { id: 1, email: `tom@example.com`, name: `Tom` } }));
  };

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid max-w-none grid-cols-1 lg:grid-cols-2 px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          Slack Clone
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This is a Slack clone, built in the NestJS course by Tom
              Ray!&rdquo;
            </p>
            <footer className="text-sm">James Bond</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Authentication
            </h1>
            <p
              className="text-sm text-muted-foreground hover:cursor-pointer"
              onClick={handleLogin}
            >
              Continue to your account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
