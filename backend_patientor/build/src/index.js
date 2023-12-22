"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const app_1 = __importDefault(require("./app"));
const config_1 = require("./utils/config");
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app_1.default.listen(config_1.PORT, () => {
    console.log(`Server running on port ${config_1.PORT}`);
});
