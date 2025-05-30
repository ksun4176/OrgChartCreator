export type Member = {
  id: number
  firstName: string
  lastName: string
  email: string
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