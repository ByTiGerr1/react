import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const RouterContext = createContext();

const matchPath = (path, pathname) => {
  if (path === "*") return true;
  return path === pathname;
};

export function BrowserRouter({ children }) {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  const navigate = useCallback(
    (to) => {
      if (to !== pathname) {
        window.history.pushState({}, "", to);
        setPathname(to);
      }
    },
    [pathname]
  );

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const value = useMemo(() => ({ pathname, navigate }), [pathname, navigate]);

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export function Routes({ children }) {
  const { pathname } = useContext(RouterContext);
  const routes = Children.toArray(children);

  const match = routes.find((route) => matchPath(route.props.path, pathname));
  return match ? match.props.element : null;
}

export function Route() {
  return null;
}

export function Link({ to, children, ...props }) {
  const { navigate } = useContext(RouterContext);

  const handleClick = (event) => {
    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export function useNavigate() {
  const { navigate } = useContext(RouterContext);
  return navigate;
}

export function useLocation() {
  const { pathname } = useContext(RouterContext);
  return { pathname };
}
