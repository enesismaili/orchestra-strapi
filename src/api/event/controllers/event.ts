import { factories } from "@strapi/strapi";
import type { UID } from "@strapi/types";

const UID_EVENT: UID.ContentType = "api::event.event";

export default factories.createCoreController(UID_EVENT, ({ strapi }) => ({

    // ------------------------------------------------
    // GET YEARS  (translation aware)
    // ------------------------------------------------
    async getYears(ctx) {
        try {
            const locale = ctx.query.locale || "en";

            const events = await strapi.db.query(UID_EVENT).findMany({
                select: ["date"],
                where: { locale },
            });

            const years = Array.from(
                new Set(
                    events
                        .map(ev => ev.date)
                        .filter(Boolean)
                        .map(date => new Date(date).getFullYear())
                )
            ).sort((a, b) => a - b);

            ctx.body = { years };
        } catch (err) {
            console.error("❌ getYears ERROR:", err);
            ctx.throw(500, "Failed to load years");
        }
    },

    // ------------------------------------------------
    // GET MONTHS  (translation aware)
    // ------------------------------------------------
    async getMonths(ctx) {
        try {
            const year = Number(ctx.query.year);
            const locale = ctx.query.locale || "en";

            if (!year) return ctx.badRequest("Missing year");

            const start = `${year}-01-01T00:00:00.000Z`;
            const end = `${year}-12-31T23:59:59.999Z`;

            const events = await strapi.db.query(UID_EVENT).findMany({
                select: ["date"],
                where: {
                    locale,
                    date: { $gte: start, $lte: end },
                },
            });

            const months = Array.from(
                new Set(
                    events
                        .map(ev => ev.date)
                        .filter(Boolean)
                        .map(d => new Date(d).getUTCMonth() + 1)
                )
            ).sort((a, b) => a - b);

            ctx.body = { months };
        } catch (err) {
            console.error("❌ getMonths ERROR:", err);
            ctx.throw(500, "Failed to load months");
        }
    },

    // ------------------------------------------------
    // UPCOMING YEARS  (translation aware)
    // ------------------------------------------------
    async upcomingYears(ctx) {
        try {
            const locale = ctx.query.locale || "en";
            const nowIso = new Date().toISOString();

            const events = await strapi.db.query(UID_EVENT).findMany({
                select: ["date"],
                where: {
                    locale,
                    date: { $gte: nowIso },
                },
            });

            const years = Array.from(
                new Set(
                    events
                        .map(e => e.date)
                        .filter(Boolean)
                        .map(d => new Date(d).getFullYear())
                )
            ).sort((a, b) => a - b);

            ctx.body = { years };
        } catch (err) {
            console.error("❌ upcomingYears ERROR:", err);
            ctx.throw(500, "Failed to load upcoming years");
        }
    },

}));