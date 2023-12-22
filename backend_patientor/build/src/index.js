"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const morgan_1 = __importDefault(require("morgan"));
const diagnosis_1 = __importDefault(require("./routes/diagnosis"));
const patients_1 = __importDefault(require("./routes/patients"));
app.use(express_1.default.json());
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 3001;
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.use(express_1.default.static('dist'));
app.use((0, morgan_1.default)(':method :status '));
app.use('/api/diagnosis', diagnosis_1.default);
app.use('/api/patients', patients_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
