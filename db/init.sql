-- Information about your organization
-- name: name of organization
CREATE TABLE organization (
  id SERIAL,
  name VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);

-- Team type used for grouping multiple teams
-- name: name of team type
CREATE TABLE team_type (
  id SERIAL,
  name VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);

-- A team in an organization
-- name: name of team
-- org_id: organization team is in
-- type_id: type of team
CREATE TABLE team (
    id SERIAL,
    name VARCHAR(255) NOT NULL,
    org_id INTEGER NOT NULL,
    type_id INTEGER NOT NULL,

    PRIMARY KEY (id)
);

-- A member of the organization
-- first_name: first name of member
-- last_name: last name of member
-- email: form of contact
CREATE TABLE member (
    id SERIAL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NULL,

    UNIQUE (email),
    PRIMARY KEY (id)
);

-- Roles that members can have
-- name: name of member role type
CREATE TABLE member_role (
  id SERIAL,
  name VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);
INSERT INTO member_role (id, name) VALUES
(1, 'Manager'),
(2, 'Member');

-- A member of the team
-- member_id: Member to link
-- team_id: Team to link
-- role_id: Role to link
CREATE TABLE team_member (
    id SERIAL,
    member_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,

    UNIQUE (member_id, team_id),
    PRIMARY KEY (id)
);

-- Foreign keys of team
ALTER TABLE team ADD CONSTRAINT team_org_fk FOREIGN KEY (org_id) REFERENCES organization(id) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE team ADD CONSTRAINT team_type_fk FOREIGN KEY (type_id) REFERENCES team_type(id) ON DELETE NO ACTION ON UPDATE CASCADE;

-- Foreign keys of team_member
ALTER TABLE team_member ADD CONSTRAINT team_member_member_fk FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE team_member ADD CONSTRAINT team_member_team_fk FOREIGN KEY (team_id) REFERENCES team(id) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE team_member ADD CONSTRAINT team_member_role_fk FOREIGN KEY (role_id) REFERENCES member_role(id) ON DELETE SET NULL ON UPDATE CASCADE;

-- Seed test data
INSERT INTO organization (id, name) VALUES
(1, 'Mathpix');

INSERT INTO team_type (id, name) VALUES
(1, 'Divisonal'),
(2, 'Functional');

INSERT INTO team (id, name, org_id, type_id) VALUES
(1, 'Mathpix D Team 1', 1, 1),
(2, 'Mathpix D Team 2', 1, 1),
(3, 'Mathpix F Team 1', 1, 2),
(4, 'Mathpix F Team 2', 1, 2);

INSERT INTO member (id, first_name, last_name, email) VALUES
(1, 'Anne', 'D1Manager', 'd1manager@mathpix.com'),
(2, 'Fred', 'D1Member1', 'd1member1@mathpix.com'),
(3, 'David', 'D1Member2', 'd1member2@mathpix.com');

INSERT INTO team_member (id, member_id, team_id, role_id) VALUES
(1, 1, 1, 1),
(2, 2, 1, 2),
(3, 3, 1, 2);