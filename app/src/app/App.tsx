// Router
import { Outlet } from "react-router";
import { NavLink } from "react-router";

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
    {/* The Band — an atmospheric sounding with the seeding window marked. */}
    <g className="ptr-mark__rule">
      <rect x="4" y="4" width="18" height="1.5" />
      <rect x="4" y="9" width="23" height="1.5" />
      <rect x="4" y="22" width="15" height="1.5" />
      <rect x="4" y="27" width="20" height="1.5" />
    </g>
    <rect className="ptr-mark__band" x="4" y="13.5" width="24" height="5" />
  </svg>
);

const routes = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
];

export const App = () => {
  return (
    <div className="drawer">
      <input id="drawer-id" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content ptr-shell">
        <header className="ptr-bar">
          <NavLink to="/" className="ptr-wordmark">
            <Mark />
            <span className="ptr-wordmark__type">Petrichor</span>
          </NavLink>

          <nav className="ptr-nav">
            {routes.map((route) => (
              <NavLink key={route.to} to={route.to} end className="ptr-nav__link">
                {route.label}
              </NavLink>
            ))}
            <a className="ptr-nav__link" href="mailto:hello@meteorology.sh">
              Contact
            </a>
          </nav>

          <label
            htmlFor="drawer-id"
            className="ptr-drawerbtn"
            aria-label="Open menu"
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
          </label>
        </header>

        <main className="ptr-main">
          <Outlet />
        </main>

        <footer className="ptr-foot">
          <div className="ptr-foot__inner">
            <p className="ptr-legal t-body-sm">
              Licensed weather modification operations — TDLR WM-0000. Conducted
              under FAA authorisation.
            </p>
            <p className="ptr-legal t-coord">AUSTIN, TEXAS · METEOROLOGY.SH</p>
          </div>
        </footer>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="drawer-id"
          aria-label="Close menu"
          className="drawer-overlay"
        ></label>
        <nav className="ptr-side">
          <NavLink to="/" className="ptr-wordmark">
            <Mark size={24} />
            <span className="ptr-wordmark__type">Petrichor</span>
          </NavLink>
          <div>
            {routes.map((route) => (
              <NavLink
                key={route.to}
                to={route.to}
                end
                className="ptr-side__link"
              >
                {route.label}
              </NavLink>
            ))}
            <a className="ptr-side__link" href="mailto:hello@meteorology.sh">
              Contact
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default App;
