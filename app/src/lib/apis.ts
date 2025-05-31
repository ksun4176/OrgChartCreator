import axios from "axios";
import { GetMembersObj, GetTeamsObj, Member, Team } from "./types";

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