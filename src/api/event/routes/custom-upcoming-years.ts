export default {
    routes: [
        {
            method: "GET",
            path: "/events/upcoming-years",
            handler: "event.upcomingYears",
            config: {
                auth: false
            }
        }
    ]
};
