export default {
    routes: [
        {
            method: "GET",
            path: "/events",
            handler: "event.find",
        },
        {
            method: "GET",
            path: "/events/:id",
            handler: "event.findOne",
        },
        {
            method: "POST",
            path: "/events",
            handler: "event.create",
        },
        {
            method: "PUT",
            path: "/events/:id",
            handler: "event.update",
        },
        {
            method: "DELETE",
            path: "/events/:id",
            handler: "event.delete",
        },
    ],
};
