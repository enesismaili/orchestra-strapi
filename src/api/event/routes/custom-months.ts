export default {
    routes: [
        {
            method: "GET",
            path: "/events/months",
            handler: "event.getMonths",
            config: { auth: false },
        },
    ],
};
