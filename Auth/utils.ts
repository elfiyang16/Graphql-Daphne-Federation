const checkHeaderFromRequest = (req, header, value) =>
  req.headers[header] === value;

const checkAccessCookie = (req, name, value) => req.cookies[name] === value;

export const authCheck = () => {
  return (req, res, next) => {
    // TODO:Launch gateway
    if (
      checkHeaderFromRequest(
        req,
        process.env.INIT_HEADER_NAME,
        process.env.INIT_HEADER_VALUE
      )
    ) {
      next();
      return;
    }

    if (!req.headers["authorization"]){
      res.status(401).send("Auth token required");
      return;
    }

    if (
      checkHeaderFromRequest(
        req,
        "authorization",
        `Bearer ${process.env.SIGNED_ACCESS_TOKEN}`
      ) &&
      checkAccessCookie(
        req,
        process.env.SIGNED_COOKIE_NAME,
        process.env.SIGNED_COOKIE_TOKEN
      )
    ) {
      next();
      return;
    }
    /* default to unauthorised */
    res.status(401);
    res.json({});
    return;
  };
};
