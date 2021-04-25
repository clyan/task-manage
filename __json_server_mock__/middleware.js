module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    console.log(req.path);
    if (req.body.username === "ywy" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          name: "ywy",
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "账号或密码错误" });
    }
  }
  next();
};
