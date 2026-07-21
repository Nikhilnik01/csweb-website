// src/context/NavigationDataContext.jsx
//
// Header.jsx and Footer.jsx both used to call getCSCSCards / getCITBTests /
// getAllCourses independently in their own useEffect. Since Header and Footer
// are mounted on every single page, every page load fired each API TWICE.
//
// This context fetches the three endpoints exactly once (on app mount) and
// shares the raw Promise.allSettled results with any component that needs
// them via the useNavigationData() hook.

import { createContext, useContext, useEffect, useState } from "react";
import { getCSCSCards, getCITBTests, getAllCourses } from "../services/api";

const NavigationDataContext = createContext({
  cscsCardsResponse: null,
  citbTestsResponse: null,
  coursesResponse: null,
  loading: true,
});

export const NavigationDataProvider = ({ children }) => {
  const [state, setState] = useState({
    cscsCardsResponse: null,
    citbTestsResponse: null,
    coursesResponse: null,
    loading: true,
  });

  useEffect(() => {
    let active = true;

    const fetchNavigationData = async () => {
      const [cscsCardsResponse, citbTestsResponse, coursesResponse] =
        await Promise.allSettled([
          getCSCSCards(null),
          getCITBTests(),
          getAllCourses(null),
        ]);

      if (!active) return;

      setState({
        cscsCardsResponse,
        citbTestsResponse,
        coursesResponse,
        loading: false,
      });
    };

    fetchNavigationData();

    return () => {
      active = false;
    };
  }, []);

  return (
    <NavigationDataContext.Provider value={state}>
      {children}
    </NavigationDataContext.Provider>
  );
};

export const useNavigationData = () => useContext(NavigationDataContext);
