"use client"

import { useEffect, useState } from "react";
import { getTeamTypes } from "../apis";
import { TeamType } from "../types";

/**
 * Fetch teams
 */
export function useFetchTeamTypes() {
  const [teamTypes, setTeamTypes] = useState<TeamType[]>([]);
  const [teamTypesError, setError] = useState();
  const [teamTypesLoading, setLoading] = useState(true);
  useEffect(() => {
    async function startFetching() {
      const response = await getTeamTypes();
      const teamTypes = response.data;

      if (!ignore) {
        setTeamTypes(teamTypes);
      }
    }
    let ignore = false;
    startFetching()
      .catch(error => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      })
      
    return () => {
      ignore = true;
    };
  }, []);

  return { teamTypes, teamTypesError, teamTypesLoading };
}