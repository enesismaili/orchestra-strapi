export default {
    routes: [
        {
            method: "GET",
            path: "/events/years",
            handler: "event.getYears",
            config: { auth: false },
        },
    ],
};
