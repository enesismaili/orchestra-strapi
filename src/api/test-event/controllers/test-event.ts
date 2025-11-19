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

        const result = await strapi.entityService.findMany(TEST_EVENT_UID, {
            filters: {
                date: {
                    $gte: `${year}-01-01`,
                    $lte: `${year}-12-31`,
                },
            },
            fields: ["date"],
            pagination: { pageSize: 500 },
        });

        const events = Array.isArray(result) ? result : [result];

        const months = [...new Set(
            events
                .filter(e => e?.date)
                .map(e => new Date(e.date).getMonth() + 1)
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