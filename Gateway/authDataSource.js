import { RemoteGraphQLDataSource } from "@apollo/gateway";

export default class AuthDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    /* when gateway just starts */
    console.log("context", context);
    console.log("context.req", context.req);
    if (!context.req) {
      request.http.headers.set(
        process.env.GATEWAY_INIT_HEADER_NAME,
        process.env.GATEWAY_INIT_HEADER_VALUE
      );
      return;
    }

    if (!context.req.headers) {
      return;
    }

    const header = context.req.headers;

    Object.keys(header).forEach((key) =>
      request.http.headers.set(key, header[key])
    );
    console.log("request.http.headers", request.http.headers);
    console.log("context.req.headers", context.req.headers);
  }

  async didReceiveResponse({ response, request, context }) {
    console.log("context res", context.res);
    if (!context.res) {
      return response;
    }

    const cookie = response.http.headers.get("set-cookie");
    if (cookie) {
      context.res.set("set-cookie", cookie);
    }
    return response;
  }
}
