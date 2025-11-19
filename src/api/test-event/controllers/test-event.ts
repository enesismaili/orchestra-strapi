import { factories } from "@strapi/strapi";
import type { UID } from "@strapi/types";

const TEST_EVENT_UID: UID.ContentType = "api::test-event.test-event";

export default factories.createCoreController(TEST_EVENT_UID, ({ strapi }) => ({

    async find(ctx) {
        return super.find(ctx);
    },

    async getYears(ctx) {
        const result = await strapi.entityService.findMany(TEST_EVENT_UID, {
            fields: ["date"],
            pagination: { pageSize: 2000 },
        });

        const events = Array.isArray(result) ? result : [result];

        const years = [...new Set(
            events
                .filter(e => e?.date)
                .map(e => new Date(e.date).getFullYear())
        )].sort((a, b) => a - b);

        ctx.body = { years };
    },

    async getMonths(ctx) {
        const { year } = ctx.params;
        if (!year) return (ctx.body = { months: [] });

        // get ALL events (limit 2000)
        const result = await strapi.entityService.findMany(TEST_EVENT_UID, {
            fields: ["date"],
            pagination: { pageSize: 2000 },
        });

        const events = Array.isArray(result) ? result : [result];

        // extract months by manually parsing event.date
        const months = [...new Set(
            events
                .filter(e => e?.date)
                .map(e => {
                    const d = new Date(e.date);
                    if (isNaN(d.getTime())) return null;

                    if (d.getFullYear() === Number(year)) {
                        return d.getMonth() + 1;
                    }
                    return null;
                })
                .filter(Boolean)
        )].sort((a, b) => a - b);

        ctx.body = { months };
    },

    async upcomingYears(ctx) {
        const now = new Date().toISOString();

        const result = await strapi.entityService.findMany(TEST_EVENT_UID, {
            filters: {
                date: { $gt: now },
            },
            fields: ["date"],
            pagination: { pageSize: 2000 },
        });

        const events = Array.isArray(result) ? result : [result];

        const years = [...new Set(
            events
                .filter(e => e?.date)
                .map(e => new Date(e.date).getFullYear())
        )].sort((a, b) => a - b);

        ctx.body = { years };
    },


}));