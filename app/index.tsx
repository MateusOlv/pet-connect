import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulating auth check
  useEffect(() => {
    // Check authentication status here
    setIsAuthenticated(false);
  }, []);

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
