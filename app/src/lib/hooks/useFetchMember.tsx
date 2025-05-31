"use client"

import { useEffect, useState } from "react";
import { Member } from "../types";
import { getMember } from "../apis";

/**
 * Fetch a member
 * @param memberId ID of member
 * @returns Member
 */
export function useFetchMember(memberId: number) {
  const [member, setMember] = useState<Member>();
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