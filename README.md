# OrgChartCreator
Manage an organization's hierarchy structure

## How to Use
**`/`**

You can:
1. View all teams in the system
  - Teams can be seen in a hierarchical tree format
  - Teams are also in a table format to get overview
2. View all members in the system
3. Add a new team to system
4. Add a new member to system
5. Navigate to existing teams/members by clicking a row in the tables

**`/teams/:teamId`**

You can:
1. View all information about a team
   - Team members
   - Subteams
   - Team performance reports
2. Edit team info
3. Add/remove members from team (Members must already exist in system)
4. Remove subteams

**`/members/:memberId`**

You can:
1. View all information about a member
  - Teams they belong to
  - Performance reports by team
2. Edit member info
3. Remove from team

## Set Up
We did not set up a `.env` file so some things are hardcoded in.
1. Check that port 3000 and 9000 are free.
   - Port 3000 for front-end.
   - Port 9000 for back-end.
2. Run `docker-compose up -d`
3. Should now be running on `http://localhost:3000`

## Other things to add
1. Security
2. Accounts/Login/Permissions
3. Table filtering/sorting/etc.
4. Actual performance reports.
5. Shrink size of final docker image/container.

## Technical Details
Database is in PostgreSQL.

Back-end is in Node.js framework NestJS

Front-end is in React framework Next.js