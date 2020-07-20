-- TABLE
CREATE TABLE bookmarks (
  id TEXT PRIMARY KEY,
  link TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  time_created INTEGER NOT NULL,
  time_updated INTEGER NOT NULL,
  publisher TEXT NOT NULL,
  tags TEXT
);
CREATE TABLE tags (
  id TEXT PRIMARY KEY,
  title text NOT NULL UNIQUE,
  time_created INTEGER NOT NULL,
  time_update INTEGER NOT NULL
);
 
-- INDEX
 
-- TRIGGER
 
-- VIEW
 
