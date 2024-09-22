"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbUri = process.env.myDataBase;
    if (!dbUri) {
        throw new Error('MY_DATABASE_URL is not defined in .env file');
    }
    try {
        yield mongoose_1.default.connect(dbUri);
        console.log('Connected to the database successfully!');
    }
    catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
});
exports.default = connectToDatabase;
