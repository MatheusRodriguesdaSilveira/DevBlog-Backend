"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const path_1 = __importDefault(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 }
}));
app.use(routes_1.router);
app.use('/user_profiles', express_1.default.static(path_1.default.resolve(__dirname, "..", "user_profiles")));
app.use((err, req, res, next) => {
    try {
        if (err instanceof Error) {
            return res.status(400).json({ error: err.message });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});
app.listen(process.env.PORT, () => console.log(`Server Online!!! Port: ${process.env.PORT}`));
