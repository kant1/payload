"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../../errors");
const getCookieExpiration_1 = __importDefault(require("../../utilities/getCookieExpiration"));
const getFieldsToSign_1 = require("./getFieldsToSign");
const authenticate_1 = require("../strategies/local/authenticate");
const generatePasswordSaltHash_1 = require("../strategies/local/generatePasswordSaltHash");
const sanitizeInternalFields_1 = __importDefault(require("../../utilities/sanitizeInternalFields"));
async function resetPassword(args) {
    if (!Object.prototype.hasOwnProperty.call(args.data, 'token')
        || !Object.prototype.hasOwnProperty.call(args.data, 'password')) {
        throw new errors_1.APIError('Missing required data.');
    }
    const { collection: { Model, config: collectionConfig, }, req: { payload: { config, secret, }, payload, }, overrideAccess, data, depth, } = args;
    // /////////////////////////////////////
    // Reset Password
    // /////////////////////////////////////
    let user = await Model.findOne({
        resetPasswordToken: data.token,
        resetPasswordExpiration: { $gt: Date.now() },
    }).lean();
    user = JSON.parse(JSON.stringify(user));
    user = user ? (0, sanitizeInternalFields_1.default)(user) : null;
    if (!user)
        throw new errors_1.APIError('Token is either invalid or has expired.');
    // TODO: replace this method
    const { salt, hash } = await (0, generatePasswordSaltHash_1.generatePasswordSaltHash)({ password: data.password });
    user.salt = salt;
    user.hash = hash;
    user.resetPasswordExpiration = Date.now();
    if (collectionConfig.auth.verify) {
        user._verified = true;
    }
    let doc = await Model.findByIdAndUpdate({ _id: user.id }, user, { new: true }).lean();
    doc = JSON.parse(JSON.stringify(doc));
    doc = (0, sanitizeInternalFields_1.default)(doc);
    await (0, authenticate_1.authenticateLocalStrategy)({ password: data.password, doc });
    const fieldsToSign = (0, getFieldsToSign_1.getFieldsToSign)({
        collectionConfig,
        user,
        email: user.email,
    });
    const token = jsonwebtoken_1.default.sign(fieldsToSign, secret, {
        expiresIn: collectionConfig.auth.tokenExpiration,
    });
    if (args.res) {
        const cookieOptions = {
            path: '/',
            httpOnly: true,
            expires: (0, getCookieExpiration_1.default)(collectionConfig.auth.tokenExpiration),
            secure: collectionConfig.auth.cookies.secure,
            sameSite: collectionConfig.auth.cookies.sameSite,
            domain: undefined,
        };
        if (collectionConfig.auth.cookies.domain)
            cookieOptions.domain = collectionConfig.auth.cookies.domain;
        args.res.cookie(`${config.cookiePrefix}-token`, token, cookieOptions);
    }
    const fullUser = await payload.findByID({ collection: collectionConfig.slug, id: user.id, overrideAccess, depth });
    return { token, user: fullUser };
}
exports.default = resetPassword;
//# sourceMappingURL=resetPassword.js.map