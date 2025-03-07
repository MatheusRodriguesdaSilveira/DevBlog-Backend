"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = __importDefault(require("fs"));
class handlebarsMailTemplate {
    async parse({ file, variables }) {
        const templateFileContent = await fs_1.default.promises.readFile(file, {
            encoding: 'utf-8',
        });
        const parseTemplate = handlebars_1.default.compile(templateFileContent);
        return parseTemplate(variables);
    }
}
exports.default = handlebarsMailTemplate;
