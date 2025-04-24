import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const { userInfo, logoutUser } = useAuth();

  return (
    <header className="w-full flex items-center justify-center sticky bg-primary text-primary-txt z-999 top-0">
      <nav className="w-full max-w-screen-2xl flex items-center justify-between px-4 py-2">
        <NavLink to="/" className="text-3xl font-bold align-middle">
          LOGO
        </NavLink>

        <div className="flex items-center gap-4">
          <ThemeToggler />
          {userInfo ? (
            <button
              onClick={logoutUser}
              className="px-2 py-1 rounded-lg hover:bg-primary-hover transition text-text-primary"
            >
              Log out
            </button>
          ) : (
            <>
              <NavLink
                className="px-2 py-1 rounded-lg hover:bg-primary-hover transition"
                to="/sign-up"
              >
                Sign Up
              </NavLink>
              <NavLink
                className="px-2 py-1 rounded-lg hover:bg-primary-hover transition"
                to="/login"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
