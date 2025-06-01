export type Member = {
  id: number
  firstName: string
  lastName: string
  email: string
  teams: TeamMember[]
}

export type MemberRole = {
  id: number
  name: string
}

export type TeamType = {
  id: number
  name: string
}

export type TeamMember = {
  id: number
  member: Member
  team: Team
  role: MemberRole
}

export type Team = {
  id: number
  name: string
  type: TeamType
  parent?: Team
  children: Team[]
  members: TeamMember[]
}

export type GetTeamsObj = {
  id: number
  name: string
  type: TeamType
  parent?: Team
  children: number[]
  members: number[]
};

export type PostTeamsObj = {
  name: string
  type: number
  parent?: number | null
};

export type GetMembersObj = {
  id: number
  firstName: string
  lastName: string
  email: string
  teams: number[]
}

export type PostMembersObj = {
  firstName: string
  lastName: string
  email: string
};

export type PostTeamMembersObj = {
  member: number
  role: number
}