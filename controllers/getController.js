var db = require('../models');

// This is great!!! Thank you for taking the time to document your endpoints.
function getApi(req, res){
  res.json({
    message: "This is my project one API.",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all endpoints"},
      {method: "GET", path: "/api/users", description: "List of all users"},
      {method: "GET", path:"/api/users/:_id", description: "Find one user"},
      {method: "POST", path:"/api/users", description: "Create new user"},
      {method: "DELETE", path:"/api/users/:_id", description: "Remove a user"},
      {method: "GET", path:"/api/memories", description: "List of all memories"},
      {method: "GET", path:"/api/memories/:id", description: "Find one memory"},
      // The proper way to write this route would be to GET /api/users/:id/memories
      {method: "GET", path:"/api/memories/:userId", description: "Find all memories by one user"},
      {method: "POST", path:"/api/memories", description: "Create new memory"},
      {method: "PUT", path:"/api/memories/:_id", description: "Edit memory"},
      {method: "DELETE", path:"/api/memories/:_id", description: "Delete memory"},
    ]
  });
}

function getLogOut(req, res){
  req.logout();
  res.redirect('/');
}

module.exports = {
  getApi: getApi,
  getLogOut: getLogOut
};
