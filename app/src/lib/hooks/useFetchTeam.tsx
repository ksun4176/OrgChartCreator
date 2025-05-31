"use client"

import { useEffect, useState } from "react";
import { getTeam } from "../apis";
import { Team } from "../types";

/**
 * Fetch a team
 * @param teamId ID of team
 * @returns Team
 */
export function useFetchTeam(teamId: number) {
  const [team, setTeam] = useState<Team>();
  const [teamError, setError] = useState();
  const [teamLoading, setLoading] = useState(true);
  useEffect(() => {
    async function startFetching() {
      const response = await getTeam(teamId);
      const team = response.data;

      if (!ignore) {
        setTeam(team);
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
  }, [teamId]);

  return { team, teamError, teamLoading };
}