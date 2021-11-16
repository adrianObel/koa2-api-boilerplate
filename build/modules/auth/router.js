import * as auth from "./controller";
export var baseUrl = "/auth";
export default [
    {
        method: "POST",
        route: "/",
        handlers: [auth.authUser],
    },
];
