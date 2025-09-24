import { NavLink } from "react-router";
import { NAV_HOME, NAV_LOGIN, NAV_SIGNUP } from "../../components/constants";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { logoutUser } from "../../store/actions/authAuctions";

export default function Nav() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  
  return (
    <nav className="bg-gray-10 px-4 py-3 mb-6 shadow w-full">
      <ul className="flex space-x-6 justify-between">
        <div>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-active"
                : "nav-inactive"
            }
            end
          >
            {NAV_HOME}
          </NavLink>
        </li>
        </div>
               <div className="flex justify-between items-center">
          {!isAuthenticated && (
            <>
              <li className="mx-2">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "nav-active" : "nav-inactive"
                  }
                >
                  {NAV_LOGIN}
                </NavLink>
              </li>
              <li className="mx-2">
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? "nav-active" : "nav-inactive"
                  }
                >
                  {NAV_SIGNUP}
                </NavLink>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li className="mx-2">
              <button
                onClick={handleLogout}
                className="nav-inactive hover:nav-active cursor-pointer"
              >
                Logout
              </button>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
}