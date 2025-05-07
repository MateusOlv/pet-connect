import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  // Simulating auth and terms check
  useEffect(() => {
    // Check authentication status here
    setIsAuthenticated(true);
    // Check terms acceptance status here
    setHasAcceptedTerms(true);
  }, []);

  if (!hasAcceptedTerms) {
    return <Redirect href="/(auth)/terms" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
