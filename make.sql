DROP DATABASE IF EXISTS tasks;
DROP USER IF EXISTS tasks_user@localhost;

CREATE DATABASE tasks CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER tasks_user@localhost IDENTIFIED BY '@@@@R3L0AD1NG@@@@!!!';
GRANT ALL PRIVILEGES ON tasks.* TO tasks_user@localhost;
