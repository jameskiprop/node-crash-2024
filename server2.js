import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Quincy Jones" },
  { id: 3, name: "Mary Jane" },
];
//Logger middlewear
const logger = (res, req, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

//JSON middlewear
const jsonMiddlewear = (res, req, next) => {
  res.setHeader("Content-type", "application/json");
  next();
};

//Route handler for GET /api/users
const getUserHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

//Route handler for GET /api/users/: id
const getUserByIdHandler = (req, res) => {
  const id = req.url.split("/")[3];
  const user = users.find((user) => user.id === parseInt(id));
  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "User not found" }));
  }
  res.end();
};

//Not Found Handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Route not Found" }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === "/api/users" && req.method === "GET") {
        getUsersHandler();
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        getUserByIdHandler();
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error(`Server failed to start: ${err.message}`);
  });
