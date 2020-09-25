# Teekkarikalenteri server
REST-like API with Create, remove, update & delete -functionality.

Server has specific routes for event, user and login requests (see API below).

### API
| Method | Route | Description |
| --- | --- | --- |
| GET | /api/events | Get all events |
| GET | /api/events/:id | Get a specific event |
| POST | /api/events | Add a new event |
| DELETE | /api/events/:id | Delete an event |

| Method | Route | Description |
| --- | --- | --- |
| POST | /api/users | Add new user |
| POST | /api/users/:id | Modify an user |

| Method | Route | Description |
| --- | --- | --- |
| POST | /api/login | Get a login token |
| GET | /api/login | Check token validity |

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
 -1: Unknown error
```

