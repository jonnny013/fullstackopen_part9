"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosisService_1 = __importDefault(require("../services/diagnosisService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    res.send(diagnosisService_1.default.getDiagnosis());
});
router.post('/', (_req, res) => {
    res.send('posted!');
});
exports.default = router;
