import axios from "axios";
import { GetMembersObj, GetTeamsObj, Member, PostMembersObj, PostTeamsObj, Team, TeamType } from "./types";

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
export const postTeam = (team: PostTeamsObj) => axios.post<Team>(`${apiUrl}/teams`, {
  ...team
});

/**
 * Create a team
 * @param team Team to create
 * @returns Created team
 */
export const postMember = (member: PostMembersObj) => axios.post<Team>(`${apiUrl}/members`, {
  ...member
});