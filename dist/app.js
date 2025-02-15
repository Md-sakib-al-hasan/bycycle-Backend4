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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const node_cron_1 = __importDefault(require("node-cron"));
const user_service_1 = require("./app/modules/User/user.service");
const AppError_1 = __importDefault(require("./app/errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const saleDetails_service_1 = require("./app/modules/saleDetails/saleDetails.service");
const config_1 = __importDefault(require("./app/config"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: [`${config_1.default.domain_fontend}`], credentials: true }));
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send('SuccessFully run server');
});
//autoupdate useStatus
node_cron_1.default.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_service_1.UserServices.checkAndUpdateUserStatus(); // This should now work
        yield saleDetails_service_1.SalesDeatilsServerice.StoreSalesData(); // This should now work
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    }
    catch (err) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Error in cron job');
    }
}));
//Not Found
app.use(notFound_1.default);
//golbal Error Handeling
app.use(globalErrorhandler_1.default);
exports.default = app;
