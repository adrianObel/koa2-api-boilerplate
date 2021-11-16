var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import passport from "koa-passport";
import User from "../src/models/users";
import { Strategy } from "passport-local";
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.findById(id, "-password")];
            case 1:
                user = _a.sent();
                done(null, user);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                done(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
passport.use("local", new Strategy({
    usernameField: "username",
    passwordField: "password",
}, function (username, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user, isMatch, err_2, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, User.findOne({ username: username })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, done(null, false)];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, user.validatePassword(password)];
            case 3:
                isMatch = _a.sent();
                if (!isMatch) {
                    return [2 /*return*/, done(null, false)];
                }
                done(null, user);
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                done(err_2);
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_3 = _a.sent();
                return [2 /*return*/, done(err_3)];
            case 7: return [2 /*return*/];
        }
    });
}); }));
