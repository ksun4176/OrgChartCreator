"use client"

import { useEffect, useState } from "react";
import { getMember } from "../apis";
import { Member } from "../types";

/**
 * Fetch member
 */
export function useFetchMember(memberId: number) {
  const [member, setMember] = useState<Member | null>(null);
  const [memberError, setError] = useState();
  const [memberLoading, setLoading] = useState(true);
  useEffect(() => {
    async function startFetching() {
      const response = await getMember(memberId);
      const member = response.data;

      if (!ignore) {
        setMember(member);
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
  }, [memberId]);

  return { member, memberError, memberLoading };
}