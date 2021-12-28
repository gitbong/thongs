export default function (_, response, next) {
  response.header("Content-type", "application/json; charset=utf-8");
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
  );
  response.header(
    "Access-Control-Allow-Methods",
    "PUT, PATCH, POST, GET, DELETE, OPTIONS"
  );
  next();
}
