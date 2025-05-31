"use client"

import { useEffect, useState } from "react";
import { getTeams } from "../apis";
import { GetTeamsObj } from "../types";

/**
 * Fetch teams
 */
export function useFetchTeams() {
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
  }, []);

  return { teams, teamsError, teamsLoading };
}