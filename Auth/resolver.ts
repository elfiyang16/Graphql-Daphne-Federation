export const resolvers = {
  Mutation: {
    login: async (root, args, context) => {
      const accessToken = process.env.ACCESS_TOKEN;
      const cookieName = process.env.COOKIE_NAME;
      const cookieToken = process.env.COOKIE_TOKEN;
      const cookieExpiration = new Date(new Date().getTime() + 10 * 60000);

      context.res.cookie(cookieName, cookieToken, {
        domain: "localhost",
        secure: false,
        httpOnly: false,
        expires: cookieExpiration,
        maxAge: cookieExpiration.getTime(),
      });

      return { accessToken };
    },
  },
};
