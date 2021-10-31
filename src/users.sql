-- ====================
-- Users table creation
-- ====================
CREATE TABLE users (
    id int,
    login varchar(255),
    password varchar(255),
    age int, 
    isDeleted boolean
);

-- ====================
-- Fill Users table
-- ====================
INSERT INTO users 
VALUES 
    ( 1, 'user1', 'user1password', 21, false ),
    ( 2, 'user2', 'user2password', 22, false ),
    ( 3, 'user3', 'user3password', 23, false ),
    ( 4, 'user4', 'user4password', 24, false ),
    ( 5, 'user5', 'user5password', 25, false );