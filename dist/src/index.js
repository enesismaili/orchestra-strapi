"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_server_1 = __importDefault(require("./plugins/upload/strapi-server"));
exports.default = {
    register({ strapi }) {
        const upload = strapi.plugin("upload");
        if (upload) {
            (0, strapi_server_1.default)(upload);
        }
    },
    bootstrap() { },
};
