import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        isAuthed,
        setIsAuthed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const { isAuthed, setIsAuthed } = useContext(AuthContext);

  const setToken = useCallback((data) => {
    localStorage.setItem("token", JSON.stringify(data));
  }, []);

  const getToken = useCallback(() => {
    return JSON.parse(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (getToken()) {
      setIsAuthed(true);
    } else setIsAuthed(false);
  });

  return {
    isAuthed,
    setIsAuthed,
    setToken,
    getToken,
  };
}
