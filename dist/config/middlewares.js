"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// config/middlewares.ts
exports.default = [
    'strapi::errors',
    'strapi::cors',
    {
        name: 'strapi::security',
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'connect-src': ["'self'", 'https:'],
                    'img-src': ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
                    'media-src': ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    'strapi::body',
    'strapi::favicon',
    'strapi::public',
];
