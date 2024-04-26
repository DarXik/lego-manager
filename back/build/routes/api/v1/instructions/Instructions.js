"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InstructionsController_1 = __importDefault(require("../../../../controllers/InstructionsController"));
const router = express_1.default.Router();
router.get("/:filename", InstructionsController_1.default.get);
exports.default = router;
