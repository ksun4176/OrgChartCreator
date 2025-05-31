"use client"

import { useEffect, useState } from "react";
import { getTeams } from "../apis";
import { GetTeamsObj } from "../types";

/**
 * Fetch teams
 * @param numAdded Counter if teams have been added
 */
export function useFetchTeams(numAdded?: number) {
  const [teams, setTeams] = useState<GetTeamsObj[]>([]);
  const [teamsError, setError] = useState();
  const [teamsLoading, setLoading] = useState(true);
  useEffect(() => {
    async function startFetching() {
      const response = await getTeams();
      const teams = response.data;

      if (!ignore) {
        setTeams(teams);
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
  }, [numAdded]);

  return { teams, teamsError, teamsLoading };
}