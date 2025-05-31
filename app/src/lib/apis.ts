import axios, { AxiosError } from "axios";
import { GetMembersObj, GetTeamsObj, Member, PostMembersObj, PostTeamsObj, Team, TeamType } from "./types";

export type PostApiResponse = {
  success: boolean
  message?: string
}

const apiUrl = 'http://localhost:9000';

/**
 * Get a list of teams
 * @returns A list of teams
 */
export const getTeams = () => axios.get<GetTeamsObj[]>(`${apiUrl}/teams`);
/**
 * Get a single team
 * @param teamId ID of team to get
 * @returns Team
 */
export const getTeam = (teamId: number) => axios.get<Team>(`${apiUrl}/teams/${teamId}`);
/**
 * Get a single team
 * @param teamId ID of team to get
 * @returns Team
 */
export const getTeamTypes = () => axios.get<TeamType[]>(`${apiUrl}/team-types`);
/**
 * Get a list of members
 * @returns A list of members
 */
export const getMembers = () => axios.get<GetMembersObj[]>(`${apiUrl}/members`);
/**
 * Get a single member
 * @param memberId ID of member to get
 * @returns Member
 */
export const getMember = (memberId: number) => axios.get<Member>(`${apiUrl}/members/${memberId}`);

/**
 * Create a team
 * @param team Team to create
 * @returns Created team
 */
export const postTeam = (team: PostTeamsObj): Promise<PostApiResponse> => axios.post<Team>(`${apiUrl}/teams`, {...team})
  .then(() => {
    return {
      success: true,
      message: 'Team created.'
    }
  })
  .catch(() => {
    return {
      success: false,
    }
  });

/**
 * Create a team
 * @param team Team to create
 * @returns Created team
 */
export const postMember = (member: PostMembersObj): Promise<PostApiResponse> => axios.post<Team>(`${apiUrl}/members`, {...member})
  .then(() => {
    return {
      success: true,
      message: 'Member created.'
    }
  })
  .catch((error: AxiosError<Error>) => {
    let errorMessage = undefined;
    if (error.status === 409 && error.response?.data.message) {
      errorMessage = error.response.data.message;
    }
    return {
      success: false,
      message: errorMessage
    }
  });