"use client"

import { useEffect, useState } from "react";
import { getMemberRoles } from "../apis";
import { MemberRole } from "../types";

/**
 * Fetch teams
 */
export function useFetchMemberRoles() {
  const [memberRoles, setMemberRoles] = useState<MemberRole[]>([]);
  const [memberRolesError, setError] = useState();
  const [memberRolesLoading, setLoading] = useState(true);
  useEffect(() => {
    async function startFetching() {
      const response = await getMemberRoles();
      const memberRoles = response.data;

      if (!ignore) {
        setMemberRoles(memberRoles);
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

  return { memberRoles, memberRolesError, memberRolesLoading };
}