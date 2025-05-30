# OrgChartCreator
Manage an organization's hierarchy structure

## API endpoints
### `/teams`
GET: Get all teams

POST: Create a team
- name
- type
- parent

### `teams/:id`
Params:
- id

GET: Get a single team

DELETE: Delete a team

PATCH: Update a team
- name
- type
- parent

### `/teams/:id/members`
Params:
- id: ID of team

POST: Assign a member to a team
- member
- role

### `teams/:id/members/:memberId`
Params:
- id: ID of team
- memberId: ID of member

DELETE: Delete a team assignment

PATCH: Update a team assignment
- role

### `/members`
GET: Get all members

POST: Create a member
- firstName
- lastName
- email

### `/members/:id`
GET: Get a single member

DELETE: Delete a member

PATCH: Update a member
- firstName
- lastName
- email
