import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, User, Lock } from "lucide-react";
import api, {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  extractToken,
  extractUser,
  type LoginRequest,
  type LoginResponse,
} from "@/lib/axios";

/**
 * Admin login page — POST /api/Account/AppUserLogin
 */
export default function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload: LoginRequest = { userName, password };
      const { data } = await api.post<LoginResponse>(
        "/api/Account/AppUserLogin",
        payload,
      );

      if (data.rs !== undefined && data.rs !== 1) {
        setError(data.rm ?? "Invalid username or password. Please try again.");
        return;
      }

      if (data.rc && data.rc.length > 0) {
        setError("Invalid username or password. Please try again.");
        return;
      }

      const token = extractToken(data);

      if (!token) {
        setError(
          "Login succeeded but no token was returned. Check API response format.",
        );
        return;
      }

      localStorage.setItem(AUTH_TOKEN_KEY, token);

      const user = extractUser(data);
      if (user) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      }
      navigate("/admin/dashboard", { replace: true });
    } catch {
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="industrial-pattern flex min-h-screen flex-col">
    //   <main className="flex flex-grow items-center justify-center p-6">
    //     <div className="w-full max-w-[440px]">
    //       {/* Branding */}
    //       <div className="mb-8 text-center">
    //         <img
    //           src="/images/logo.png"
    //           alt="ConstructCert logo"
    //           className="mx-auto mb-4 h-16 w-auto object-contain"
    //         />

    //         <h1 className="text-3xl font-bold tracking-tight text-primary">ConstructCert Admin</h1>
    //         <p className="mt-2 text-sm text-on-surface-variant">
    //           Secure access for certification managers
    //         </p>
    //       </div>

    //       {/* Login card */}
    //       <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
    //         <form className="space-y-6" onSubmit={handleSubmit}>
    //           <div className="space-y-1.5">
    //             <label
    //               htmlFor="username"
    //               className="flex items-center gap-2 text-sm font-medium text-on-surface"
    //             >
    //               <User className="h-4 w-4" />
    //               Username
    //             </label>
    //             <input
    //               id="username"
    //               name="username"
    //               type="text"
    //               autoComplete="username"
    //               required
    //               value={userName}
    //               onChange={(e) => setUserName(e.target.value)}
    //               placeholder="Enter admin username"
    //               className="h-11 w-full rounded-lg border border-outline-variant bg-surface-bright px-4 text-sm outline-none transition-all placeholder:text-outline/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
    //             />
    //           </div>

    //           <div className="space-y-1.5">
    //             <div className="flex items-center justify-between">
    //               <label
    //                 htmlFor="password"
    //                 className="flex items-center gap-2 text-sm font-medium text-on-surface"
    //               >
    //                 <Lock className="h-4 w-4" />
    //                 Password
    //               </label>
    //               <button type="button" className="text-xs font-semibold text-primary hover:underline">
    //                 Forgot password?
    //               </button>
    //             </div>
    //             <div className="relative">
    //               <input
    //                 id="password"
    //                 name="password"
    //                 type={showPassword ? 'text' : 'password'}
    //                 autoComplete="current-password"
    //                 required
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 placeholder="••••••••"
    //                 className="h-11 w-full rounded-lg border border-outline-variant bg-surface-bright px-4 pr-12 text-sm outline-none transition-all placeholder:text-outline/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
    //               />
    //               <button
    //                 type="button"
    //                 onClick={() => setShowPassword((prev) => !prev)}
    //                 className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors hover:text-primary"
    //                 aria-label={showPassword ? 'Hide password' : 'Show password'}
    //               >
    //                 {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
    //               </button>
    //             </div>
    //           </div>

    //           {error && (
    //             <p className="rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container">
    //               {error}
    //             </p>
    //           )}

    //           <button
    //             type="submit"
    //             disabled={loading}
    //             className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary-container text-sm font-semibold text-on-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    //           >
    //             {loading ? (
    //               <>
    //                 <Loader2 className="h-4 w-4 animate-spin" />
    //                 Signing in…
    //               </>
    //             ) : (
    //               'Sign In'
    //             )}
    //           </button>
    //         </form>
    //       </div>

    //       <p className="mt-6 text-center text-xs text-on-surface-variant">
    //         Construction Industry Training Board · Admin Portal
    //       </p>
    //     </div>
    //   </main>
    // </div>

    <div className="flex min-h-screen">
      {/* Left: background image panel */}
      <div className="relative hidden w-1/2 items-end overflow-hidden lg:flex">
        <img
          src="/images/bg.jpeg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/30 to-primary/20" />

        <div className="relative z-10 p-12 pb-16 text-white">
          <img
            src="/images/white-logo.png"
            alt="ConstructCert"
            className="mb-2 h-16 w-auto object-contain"
          />
          <h2 className="max-w-md text-4xl font-bold leading-tight tracking-tight">
            Certifying the people who build our industry
          </h2>
          <p className="mt-4 max-w-sm text-sm text-white/80">
            Manage assessments, issue certifications, and keep every training
            record in one place.
          </p>
        </div>
      </div>

      {/* Right: form panel */}
      <main className="flex w-full flex-1 items-center justify-center bg-surface-container-lowest p-6 lg:w-1/2">
        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <img
              src="/images/logo.png"
              alt="ConstructCert logo"
              className="mb-6 h-12 w-auto object-contain lg:hidden"
            />
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-on-surface-variant">
              Sign in to access your secure ConstructCert admin dashboard.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="flex items-center gap-2 text-sm font-medium text-on-surface"
              >
                <User className="h-4 w-4" />
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter admin username"
                className="h-12 w-full rounded-lg border border-outline-variant bg-surface-bright px-4 text-sm outline-none transition-all placeholder:text-outline/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="flex items-center gap-2 text-sm font-medium text-on-surface"
                >
                  <Lock className="h-4 w-4" />
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 w-full rounded-lg border border-outline-variant bg-surface-bright px-4 pr-12 text-sm outline-none transition-all placeholder:text-outline/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors hover:text-primary"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-container text-sm font-semibold text-on-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}