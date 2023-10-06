"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const errors_1 = require("../../errors");
const utils_1 = require("../../collections/operations/utils");
async function forgotPassword(incomingArgs) {
    if (!Object.prototype.hasOwnProperty.call(incomingArgs.data, 'email')) {
        throw new errors_1.APIError('Missing email.', 400);
    }
    let args = incomingArgs;
    // /////////////////////////////////////
    // beforeOperation - Collection
    // /////////////////////////////////////
    await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook) => {
        await priorHook;
        args = (await hook({
            args,
            operation: 'forgotPassword',
            context: args.req.context,
        })) || args;
    }, Promise.resolve());
    const { collection: { Model, config: collectionConfig, }, data, disableEmail, expiration, req: { t, payload: { config, sendEmail: email, emailOptions, }, }, req, } = args;
    // /////////////////////////////////////
    // Forget password
    // /////////////////////////////////////
    let token = crypto_1.default.randomBytes(20);
    token = token.toString('hex');
    if (!data.email) {
        throw new errors_1.APIError('Missing email.');
    }
    const user = await Model.findOne({ email: data.email.toLowerCase() });
    if (!user)
        return null;
    user.resetPasswordToken = token;
    user.resetPasswordExpiration = expiration || Date.now() + 3600000; // 1 hour
    await user.save();
    const userJSON = user.toJSON({ virtuals: true });
    if (!disableEmail) {
        const serverURL = (config.serverURL !== null && config.serverURL !== '') ? config.serverURL : `${req.protocol}://${req.get('host')}`;
        let html = `${t('authentication:youAreReceivingResetPassword')}
    <a href="${serverURL}${config.routes.admin}/reset/${token}">
     ${serverURL}${config.routes.admin}/reset/${token}
    </a>
    ${t('authentication:youDidNotRequestPassword')}`;
        if (typeof collectionConfig.auth.forgotPassword.generateEmailHTML === 'function') {
            html = await collectionConfig.auth.forgotPassword.generateEmailHTML({
                req,
                token,
                user: userJSON,
            });
        }
        let subject = t('authentication:resetYourPassword');
        if (typeof collectionConfig.auth.forgotPassword.generateEmailSubject === 'function') {
            subject = await collectionConfig.auth.forgotPassword.generateEmailSubject({
                req,
                token,
                user: userJSON,
            });
        }
        email({
            from: `"${emailOptions.fromName}" <${emailOptions.fromAddress}>`,
            to: data.email,
            subject,
            html,
        });
    }
    // /////////////////////////////////////
    // afterForgotPassword - Collection
    // /////////////////////////////////////
    await collectionConfig.hooks.afterForgotPassword.reduce(async (priorHook, hook) => {
        await priorHook;
        await hook({ args, context: req.context });
    }, Promise.resolve());
    // /////////////////////////////////////
    // afterOperation - Collection
    // /////////////////////////////////////
    token = await (0, utils_1.buildAfterOperation)({
        operation: 'forgotPassword',
        args,
        result: token,
    });
    return token;
}
exports.default = forgotPassword;
//# sourceMappingURL=forgotPassword.js.map