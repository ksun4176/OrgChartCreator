## Org Chart Creator
This is an app to create an organization's hierarchical chart.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

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
