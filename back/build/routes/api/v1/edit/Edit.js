"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SetsEditController_1 = __importDefault(require("../../../../controllers/Set/SetsEditController"));
const router = express_1.default.Router();
router.patch("/", SetsEditController_1.default.patch);
exports.default = router;
