// React
import { useState } from "react";

// Router
import { Outlet, ScrollRestoration } from "react-router";
import { NavLink } from "react-router";

// Hooks
import { usePageMeta } from "@/lib/hooks/usePageMeta";

// Styles
import "./App.css";

const Mark = ({ size = 28 }: { size?: number }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    role="img"
    aria-label="Petrichor"
  >
    {/* Placeholder bolt. Iconography is still open. */}
    <path
      className="mark"
      d="M18.5 2 L6.5 18.5 H13.5 L12 30 L25.5 12.5 H18 Z"
    />
  </svg>
);

const routes = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/research", label: "Research" },
  { to: "/contact", label: "Contact" },
];

// The active tab carries a primary underline. daisyUI's menu has no such
// state, so the border is set here with utilities.
const tabClass = ({ isActive }: { isActive: boolean }) =>
  [
    "t-label rounded-none border-b-2",
    isActive ? "border-primary" : "border-transparent",
  ].join(" ");

export const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  usePageMeta();

  return (
    <div className="drawer">
      <ScrollRestoration />
      {/* daisyUI's drawer reads this checkbox for its open state. The buttons
          below drive it, so it stays out of the tab order and the
          accessibility tree. */}
      <input
        id="drawer-id"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        readOnly
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="drawer-content flex min-h-dvh flex-col">
        <header className="navbar border-b border-hairline px-4 sm:px-8">
          <div className="navbar-start">
            <NavLink to="/" className="flex items-center gap-3">
              <Mark />
              <span className="wordmark text-[17px]">Petrichor</span>
            </NavLink>
          </div>

          <div className="navbar-end">
            <nav className="hidden md:flex">
              <ul className="menu menu-horizontal gap-2">
                {routes.map((route) => (
                  <li key={route.to}>
                    <NavLink to={route.to} end className={tabClass}>
                      {route.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              className="btn btn-square btn-ghost md:hidden"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl grow px-4 py-12 sm:px-8 sm:py-16">
          <Outlet />
        </main>

        <footer className="footer border-t border-hairline px-4 py-8 sm:px-8">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="t-body-sm text-ink-faint">Petrichor</p>
            <p className="t-coord text-ink-faint">
              AUSTIN, TEXAS · METEOROLOGY.SH
            </p>
          </div>
        </footer>
      </div>

      <div className="drawer-side">
        <button
          type="button"
          aria-label="Close menu"
          className="drawer-overlay"
          onClick={() => setDrawerOpen(false)}
        ></button>
        <div className="min-h-full w-72 bg-base-200 p-6">
          <NavLink
            to="/"
            className="flex items-center gap-3"
            onClick={() => setDrawerOpen(false)}
          >
            <Mark size={24} />
            <span className="wordmark text-[15px]">Petrichor</span>
          </NavLink>
          <ul className="menu mt-6 w-full gap-1">
            {routes.map((route) => (
              <li key={route.to}>
                <NavLink
                  to={route.to}
                  end
                  className={tabClass}
                  onClick={() => setDrawerOpen(false)}
                >
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
