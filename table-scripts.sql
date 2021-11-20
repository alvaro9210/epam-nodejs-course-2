-- ====================
-- Users table creation
-- ====================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    login varchar(255),
    password varchar(255),
    age int,
    "isDeleted" boolean
);

-- ====================
-- Groups table creation
-- ====================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE groups (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v1(),
    name varchar(255),
    permissions varchar(255)[]
);

-- ====================
-- Fill Users table
-- ====================
INSERT INTO users 
VALUES 
    ( DEFAULT, 'user1', 'user1password', 21, false ),
    ( DEFAULT, 'user2', 'user2password', 22, false ),
    ( DEFAULT, 'user3', 'user3password', 23, false ),
    ( DEFAULT, 'user4', 'user4password', 24, false ),
    ( DEFAULT, 'user5', 'user5password', 25, false )
;

-- ====================
-- Fill Groups table
-- ====================
INSERT INTO groups 
VALUES 
    ( DEFAULT, 'admin', '{ "READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES" }' ),
    ( DEFAULT, 'developer', '{ "READ", "WRITE", "SHARE", "UPLOAD_FILES" }' ),
    ( DEFAULT, 'everyone', '{ "READ", "SHARE" }' )
;