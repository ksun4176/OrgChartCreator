-- Team type used for grouping multiple teams
-- name: name of team type
CREATE TABLE team_type (
  id SMALLSERIAL,
  name VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);
INSERT INTO team_type (id, name) VALUES
(1, 'Company'),
(2, 'Divisonal'),
(3, 'Functional');
SELECT setval('team_type_id_seq', 3);

-- A team in an organization
-- name: name of team
-- org_id: organization team is in
-- type_id: type of team
-- parent_team_id: The ID of the team that directly manage this one
CREATE TABLE team (
    id SERIAL,
    name VARCHAR(255) NOT NULL,
    type_id INTEGER NOT NULL,
    parent_team_id INTEGER NULL,

    PRIMARY KEY (id)
);

-- Roles that members can have
-- name: name of member role type
CREATE TABLE member_role (
  id SMALLSERIAL,
  name VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);
INSERT INTO member_role (id, name) VALUES
(1, 'Manager'),
(2, 'Member');
SELECT setval('member_role_id_seq', 2);

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
ALTER TABLE team ADD CONSTRAINT team_parent_fk FOREIGN KEY (parent_team_id) REFERENCES team(id) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE team ADD CONSTRAINT team_type_fk FOREIGN KEY (type_id) REFERENCES team_type(id) ON DELETE NO ACTION ON UPDATE CASCADE;

-- Foreign keys of team_member
ALTER TABLE team_member ADD CONSTRAINT team_member_member_fk FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE team_member ADD CONSTRAINT team_member_team_fk FOREIGN KEY (team_id) REFERENCES team(id) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE team_member ADD CONSTRAINT team_member_role_fk FOREIGN KEY (role_id) REFERENCES member_role(id) ON DELETE SET NULL ON UPDATE CASCADE;

-- Seed test data
INSERT INTO team (id, name, type_id, parent_team_id) VALUES
(1, 'Mathpix', 1, NULL),
(2, 'Mathpix D Team', 2, 1),
(3, 'Mathpix F Team', 3, 1);
SELECT setval('team_id_seq', 3);

INSERT INTO member (id, first_name, last_name, email) VALUES
(1, 'Top', 'Dawg', 'topdawg@mathpix.com'),
(2, 'Anne', 'Manager', 'anne.manager@mathpix.com'),
(3, 'Fred', 'Manager', 'fred.manager@mathpix.com'),
(4, 'Bianca', 'Member', 'bianca.member@mathpix.com'),
(5, 'David', 'Member', 'david.member@mathpix.com');
SELECT setval('member_id_seq', 5);

INSERT INTO team_member (id, member_id, team_id, role_id) VALUES
(1, 1, 1, 1),
(2, 2, 2, 1),
(3, 3, 3, 1),
(4, 4, 2, 2),
(5, 4, 3, 2),
(6, 5, 2, 2),
(7, 5, 3, 2);
SELECT setval('team_member_id_seq', 7);