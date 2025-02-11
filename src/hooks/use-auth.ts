import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Local storage'dan giriş durumunu kontrol et
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);

      // Eğer giriş yapılmamışsa login sayfasına yönlendir
      if (!isLoggedIn && window.location.pathname !== "/login") {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  const login = (email: string, password: string) => {
    // Demo amaçlı basit kontrol
    if (email === "admin@alessar.com" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      document.cookie = "isLoggedIn=true; path=/";
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(false);
    router.push("/login");
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
