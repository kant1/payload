"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_i18next_1 = require("react-i18next");
const useField_1 = __importDefault(require("../../useField"));
const Label_1 = __importDefault(require("../../Label"));
const Error_1 = __importDefault(require("../../Error"));
const context_1 = require("../../Form/context");
require("./index.scss");
const ConfirmPassword = (props) => {
    const { disabled, } = props;
    const password = (0, context_1.useFormFields)(([fields]) => fields.password);
    const { t } = (0, react_i18next_1.useTranslation)('fields');
    const validate = (0, react_1.useCallback)((value) => {
        if (!value) {
            return t('validation:required');
        }
        if (value === (password === null || password === void 0 ? void 0 : password.value)) {
            return true;
        }
        return t('passwordsDoNotMatch');
    }, [password, t]);
    const { value, showError, setValue, errorMessage, } = (0, useField_1.default)({
        path: 'confirm-password',
        disableFormData: true,
        validate,
    });
    const classes = [
        'field-type',
        'confirm-password',
        showError && 'error',
    ].filter(Boolean).join(' ');
    return (react_1.default.createElement("div", { className: classes },
        react_1.default.createElement(Error_1.default, { showError: showError, message: errorMessage }),
        react_1.default.createElement(Label_1.default, { htmlFor: "field-confirm-password", label: t('authentication:confirmPassword'), required: true }),
        react_1.default.createElement("input", { value: value || '', onChange: setValue, type: "password", autoComplete: "off", id: "field-confirm-password", name: "confirm-password", disabled: !!disabled })));
};
exports.default = ConfirmPassword;
//# sourceMappingURL=index.js.map