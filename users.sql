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
-- Fill Users table
-- ====================
INSERT INTO users 
VALUES 
    ( DEFAULT, 'user1', 'user1password', 21, false ),
    ( DEFAULT, 'user2', 'user2password', 22, false ),
    ( DEFAULT, 'user3', 'user3password', 23, false ),
    ( DEFAULT, 'user4', 'user4password', 24, false ),
    ( DEFAULT, 'user5', 'user5password', 25, false );