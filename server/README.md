# Event Calendar Fullstack Server
REST-like API with Create, remove, update & delete -functionality.

Server has specific routes for event, user and login requests (see API below).

### API

#### Events
| Method | Route | Description |
| --- | --- | --- |
| GET | /api/events | Get all events |
| GET | /api/events/:id | Get a specific event |
| POST | /api/events | Add a new event |
| DELETE | /api/events/:id | Delete an event |

#### Users
| Method | Route | Description |
| --- | --- | --- |
| POST | /api/users/:id | Modify an user |

#### Login
| Method | Route | Description |
| --- | --- | --- |
| POST | /api/login | Get a login token |
| GET | /api/login | Check token validity |

#### Subscribe
| Method | Route | Description |
| --- | --- | --- |
| GET | /api/subscribe/events.ics | Get all events as .ics-file |

### Errors
Server sends custom errors to help with identifying errors in the client.
```
Error JSON:
{
  error: {
    code,
    message
  }
}

Error codes:
  0: Validation failed
  1: Invalid token
  2: Expired token
  3: Access denied
  4: Wrong password/username
  5: User inactive
 -1: Unknown error
```

### Envinronment variables
Copy .env.example and rename it to .env fill the envinronment variables:
```
PORT=...
DB_HOST=...
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
SECRET=...
CLEARDB=... (0 or 1)
TEST_USER=... (0 or 1)
```
