"use client"

import { useEffect, useState } from "react";
import { getMembers } from "../apis";
import { GetMembersObj } from "../types";


/**
 * Fetch members
 */
export function useFetchMembers() {
  const [members, setMembers] = useState<GetMembersObj[]>([]);
  const [membersError, setError] = useState();
  const [membersLoading, setLoading] = useState(true);
  useEffect(() => {
    async function startFetching() {
      const response = await getMembers();
      const members = response.data;

      if (!ignore) {
        setMembers(members);
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

  return { members, membersError, membersLoading };
}