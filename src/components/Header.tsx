import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { userInfo } = useAuth();

  return (
    <header className="w-full flex items-center justify-center bg-amber-950 text-white">
      <nav className="w-full max-w-screen-2xl flex justify-around bg-green-300 px-4 py-2">
        <NavLink to="/">LOGO</NavLink>

        <div>
          {userInfo ? (
            <button>Log out</button>
          ) : (
            <>
              <NavLink to="sign-up">Sign up</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}

          <button>Toggle </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
