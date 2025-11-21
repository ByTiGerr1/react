import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const RouterContext = createContext({
  location: { pathname: "/" },
  navigate: () => {},
});

export function BrowserRouter({ children }) {
  const [location, setLocation] = useState({
    pathname: window.location.pathname,
  });

  useEffect(() => {
    const manejarPopState = () => {
      setLocation({ pathname: window.location.pathname });
    };

    window.addEventListener("popstate", manejarPopState);
    return () => window.removeEventListener("popstate", manejarPopState);
  }, []);

  const navigate = (to) => {
    if (to !== location.pathname) {
      window.history.pushState({}, "", to);
      setLocation({ pathname: to });
    }
  };

  const value = useMemo(() => ({ location, navigate }), [location]);

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export function Routes({ children }) {
  const { location } = useContext(RouterContext);
  const listaHijos = Children.toArray(children);

  const encontrado = listaHijos.find(
    (child) => child.props && child.props.path === location.pathname
  );

  if (encontrado) {
    return cloneElement(encontrado, { currentPath: location.pathname });
  }

  const comodin = listaHijos.find(
    (child) => child.props && child.props.path === "*"
  );
  return comodin
    ? cloneElement(comodin, { currentPath: location.pathname })
    : null;
}

export function Route({ element }) {
  return element;
}

export function Link({ to, children, ...props }) {
  const { navigate } = useContext(RouterContext);

  const manejarClick = (event) => {
    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={manejarClick} {...props}>
      {children}
    </a>
  );
}

export function useNavigate() {
  const { navigate } = useContext(RouterContext);
  return navigate;
}

export function useLocation() {
  const { location } = useContext(RouterContext);
  return location;
}

export function Navigate({ to }) {
  const { navigate } = useContext(RouterContext);

  useEffect(() => {
    navigate(to);
  }, [navigate, to]);

  return null;
}
