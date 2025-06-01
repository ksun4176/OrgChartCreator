import axios, { AxiosError } from "axios";
import { GetMembersObj, GetTeamsObj, Member, MemberRole, PostMembersObj, PostTeamMembersObj, PostTeamsObj, Team, TeamMember, TeamType } from "./types";

export type ApiResponse = {
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
 * Get team types
 * @returns List of team types
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
 * Get member roles
 * @returns List of member roles
 */
export const getMemberRoles = () => axios.get<MemberRole[]>(`${apiUrl}/member-roles`);

/**
 * Create a team
 * @param team Team to create
 * @returns Created team
 */
export const postTeam = (team: PostTeamsObj): Promise<ApiResponse> => axios.post<Team>(`${apiUrl}/teams`, {...team})
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
 * Assign a member to a team
 * @param teamId Team to assign to
 * @param assignment Member to assign to a role
 * @returns Success or failure
 */
export const assignMember = (teamId: number, assignment: PostTeamMembersObj): Promise<ApiResponse> => axios.post(`${apiUrl}/teams/${teamId}/members`, {...assignment})
  .then(() => {
    return {
      success: true,
      message: 'Assignment done.'
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
export const postMember = (member: PostMembersObj): Promise<ApiResponse> => axios.post<Team>(`${apiUrl}/members`, {...member})
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

/**
 * Update a team
 * @param team Team to update
 * @returns Success or failure
 */
export const updateTeam = (teamId: number, team: Partial<PostTeamsObj>): Promise<ApiResponse> => axios.patch(`${apiUrl}/teams/${teamId}`, {...team})
  .then(() => {
    return {
      success: true,
      message: 'Team updated.'
    }
  })
  .catch(() => {
    return {
      success: false,
    }
  });

/**
 * Update a member
 * @param memberId Member to update
 * @param member Properties to update
 * @returns Success or failure
 */
export const updateMember = (memberId: number, member: Partial<PostMembersObj>): Promise<ApiResponse> => axios.patch(`${apiUrl}/members/${memberId}`, {...member})
  .then(() => {
    return {
      success: true,
      message: 'Member updated.'
    }
  })
  .catch(() => {
    return {
      success: false,
    }
  });

/**
 * Update a member's role in a team
 * @param teamId team to update
 * @param memberId Member to update
 * @param roleId Role to update
 * @returns Success or failure
 */
export const updateAssignment = (teamId: number, memberId: number, roleId: number): Promise<ApiResponse> => axios.patch(`${apiUrl}/teams/${teamId}/members/${memberId}`,
  { role: roleId }
)
  .then(() => {
    return {
      success: true,
      message: 'Assignment updated.'
    }
  })
  .catch(() => {
    return {
      success: false,
    }
  });

/**
 * Remove a member to a team
 * @param assignment Assignment to remove
 * @returns Success or failure
 */
export const removeAssignment = (assignment: TeamMember): Promise<ApiResponse> => axios.delete(`${apiUrl}/teams/${assignment.team.id}/members/${assignment.member.id}`)
  .then(() => {
    return {
      success: true,
      message: 'Assignment removed.'
    }
  })
  .catch(() => {
    return {
      success: false,
    }
  });