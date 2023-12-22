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
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./utils/config");
mongoose_1.default.set('strictQuery', false);
if (typeof config_1.MONGODB_URI === 'string') {
    console.log('connecting to ', config_1.MONGODB_URI);
    mongoose_1.default
        .connect(config_1.MONGODB_URI)
        .then(() => {
        console.log('connected to MongoDb');
    })
        .catch(error => {
        console.log('error connecting to mongo', error.message);
    });
}
else {
    console.log('mongodb url not found');
}
app.use((0, cors_1.default)());
app.use(express_1.default.static('dist'));
app.use(express_1.default.json());
app.use((0, morgan_1.default)(':method :status '));
app.use('/api/diagnosis', diagnosis_1.default);
app.use('/api/patients', patients_1.default);
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
exports.default = app;
