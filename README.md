# Bookmark API
This is a simple Bookmark API which can store **bookmarks** and their **tags**.
Built with Express and SQLite, it's very easy to setup and use. I have used SQLite to avoid the DB setup process but it can be customized to use any local or cloud DB solution e.g. MySQL, DynamoDB, CloudSQL, etc.

## Installation

    git clone https://github.com/idealadarsh/BookmarkAPI.git
    cd BookmarkAPI
    npm install
    npm start
Access the API at: [http://127.0.0.1:8080](http://127.0.0.1:8080) 

## Endpoints and Paramters

| Endpoint | Type | Parameters | Description |
|--|--|--|--|
| [/addBookmark](http://127.0.0.1:8080/addBookmark) | POST | `{"title": "Title", "link": "URL", "publisher": "Author", "tags": "TAG_ID"}` | Adds a new bookmark |
| [/getBookmarks](http://127.0.0.1:8080/getBookmarks) | GET |  | Returns all bookmarks |
| [/addTag](http://127.0.0.1:8080/addTag) | POST | `{"title": "TAG_NAME"}` | Adds a new tag |
| [/getTags](http://127.0.0.1:8080/getTags) | GET |  | Returns all tags |
| [/updateBookmarkTag](http://127.0.0.1:8080/updateBookmarkTag) | POST | `{"id": "BOOKMARK_ID", "tags": "TAG1_ID, TAG2_ID, ..."}` | Update tags of a bookmark |
| [/deleteBookmark](http://127.0.0.1:8080/deleteBookmark) | POST | `{"id": "BOOKMARK_ID"}` | Deletes a bookmark |
| [/deleteTag](http://127.0.0.1:8080/deleteTag) | POST | `{"id": "TAG_ID"}` | Deletes a tag |

> Created By: Adarsh Kumar
> License: MIT

