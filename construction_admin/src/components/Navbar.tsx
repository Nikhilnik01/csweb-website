import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Bell,
  Sun,
  Moon,
  LogOut,
  KeyRound,
  ChevronDown,
  X,
} from "lucide-react";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, type AuthUser } from "@/lib/axios";
import { useTheme } from "@/hooks/useTheme";
import { NAV_ITEMS } from "@/lib/navigation";

interface NavbarProps {
  onMenuClick: () => void;
  isSidebarCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    title: "Welcome to ConstructCert Admin",
    message:
      "Manage blogs, courses, certifications and pricing from one place.",
    time: "Just now",
    read: false,
  },
];

/**
 * Fixed top app bar with menu toggle, search, notifications, theme switch, and profile.
 */
export default function Navbar({
  onMenuClick,
  isSidebarCollapsed,
  onToggleCollapse,
}: NavbarProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS,
  );
  const [profileOpen, setProfileOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const storedUser = (() => {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  })();

  const displayName = storedUser?.userName ?? "Admin User";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    navigate("/login", { replace: true });
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV_ITEMS;
    return NAV_ITEMS.filter((item) => item.label.toLowerCase().includes(q));
  }, [query]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    } else {
      setQuery("");
    }
  }, [searchOpen]);

  function goToResult(path: string) {
    navigate(path);
    setSearchOpen(false);
    setQuery("");
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setSearchOpen(false);
    } else if (e.key === "Enter" && results.length > 0) {
      goToResult(results[0].path);
    }
  }

  function markAllRead() {
    setNotifications((items) => items.map((n) => ({ ...n, read: true })));
  }

  function markOneRead(id: number) {
    setNotifications((items) =>
      items.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  function clearAll() {
    setNotifications([]);
  }

  return (
    <header className="fixed top-0 z-[60] flex h-[var(--spacing-navbar-height)] w-full items-center justify-between border-b border-outline-variant bg-surface px-4 dark:border-outline dark:bg-inverse-surface md:px-[var(--spacing-container-padding)]">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-primary transition-colors hover:bg-surface-container-high dark:text-primary-fixed-dim md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Desktop collapse toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high md:inline-flex"
          aria-label={
            isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>

        <Link
          to="/admin/dashboard"
          className="flex items-center gap-2"
          aria-label="Go to dashboard"
        >
          <img
            src={
              theme === "dark" ? "/images/white-logo.png" : "/images/logo.png"
            }
            alt="ConstructCert logo"
            className="h-[3.25rem] w-[11rem] object-contain"
          />
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search */}
        <div ref={searchRef} className="relative">
          {searchOpen ? (
            <div className="absolute right-0 top-full z-50 -mt-6 w-64 sm:w-80">
              <div className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-3 py-2 shadow-lg dark:bg-inverse-surface">
                <Search className="h-4 w-4 shrink-0 text-on-surface-variant" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search pages… (Blogs, Courses, CSCS Cards…)"
                  className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="rounded-full p-1 text-on-surface-variant hover:bg-surface-container-high"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {results.length > 0 && (
                <ul className="mt-2 max-h-72 overflow-y-auto rounded-xl border border-outline-variant bg-surface shadow-lg dark:bg-inverse-surface">
                  {results.map((item) => (
                    <li key={item.path}>
                      <button
                        type="button"
                        onClick={() => goToResult(item.path)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-on-surface transition-colors hover:bg-surface-container-high"
                      >
                        <item.icon
                          className="h-4 w-4 shrink-0 text-on-surface-variant"
                          strokeWidth={1.5}
                        />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {results.length === 0 && (
                <div className="mt-2 rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm text-on-surface-variant shadow-lg dark:bg-inverse-surface">
                  No matching pages.
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            className="relative rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-surface bg-error" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-outline-variant bg-surface shadow-lg dark:bg-inverse-surface">
              <div className="flex items-center justify-between border-b border-outline-variant px-4 py-3">
                <p className="text-sm font-semibold text-on-surface">
                  Notifications
                </p>
                {notifications.length > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-on-surface-variant">
                  No new notifications.
                </p>
              ) : (
                <ul className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className="border-b border-outline-variant/60 px-4 py-3 last:border-0"
                    >
                      <button
                        type="button"
                        onClick={() => markOneRead(n.id)}
                        className="flex w-full items-start gap-2 text-left"
                      >
                        {!n.read && (
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        )}
                        <span className="flex-1">
                          <span className="block text-sm font-medium text-on-surface">
                            {n.title}
                          </span>
                          <span className="mt-0.5 block text-xs text-on-surface-variant">
                            {n.message}
                          </span>
                          <span className="mt-1 block text-[11px] text-on-surface-variant">
                            {n.time}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {notifications.length > 0 && (
                <div className="border-t border-outline-variant px-4 py-2">
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-xs font-medium text-on-surface-variant hover:text-error"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high"
          aria-label={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>

        <div
          ref={profileRef}
          className="relative ml-1 border-l border-outline-variant pl-3 md:pl-4"
        >
          <button
            type="button"
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-3 rounded-lg py-1 pr-1 transition-colors hover:bg-surface-container-high"
          >
            <div className="hidden text-right md:block">
              <p className="text-sm font-medium text-on-surface">
                {displayName}
              </p>
              <p className="text-[11px] text-on-surface-variant">Online</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-primary-container text-sm font-semibold text-on-primary">
              {initials}
            </div>
            <ChevronDown className="hidden h-4 w-4 text-on-surface-variant md:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-outline-variant bg-surface py-1 shadow-lg dark:bg-inverse-surface">
              <div className="border-b border-outline-variant px-4 py-3 md:hidden">
                <p className="text-sm font-medium text-on-surface">
                  {displayName}
                </p>
              </div>
              <Link
                to="/admin/change-password"
                onClick={() => setProfileOpen(false)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-on-surface transition-colors hover:bg-surface-container-high"
              >
                <KeyRound
                  className="h-4 w-4 text-on-surface-variant"
                  strokeWidth={1.5}
                />
                Change Password
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-error transition-colors hover:bg-error-container"
              >
                <LogOut className="h-4 w-4" strokeWidth={1.5} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
