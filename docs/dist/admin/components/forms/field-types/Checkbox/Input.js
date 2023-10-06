"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxInput = void 0;
const react_1 = __importDefault(require("react"));
const Check_1 = __importDefault(require("../../../icons/Check"));
const Label_1 = __importDefault(require("../../Label"));
const Line_1 = __importDefault(require("../../../icons/Line"));
require("./index.scss");
const baseClass = 'custom-checkbox';
const CheckboxInput = (props) => {
    const { onToggle, checked, partialChecked, inputRef, name, id, label, 'aria-label': ariaLabel, readOnly, required, } = props;
    return (react_1.default.createElement("div", { className: [
            baseClass,
            (checked || partialChecked) && `${baseClass}--checked`,
            readOnly && `${baseClass}--read-only`,
        ].filter(Boolean).join(' ') },
        react_1.default.createElement("div", { className: `${baseClass}__input` },
            react_1.default.createElement("input", { ref: inputRef, id: id, type: "checkbox", name: name, "aria-label": ariaLabel, defaultChecked: Boolean(checked), disabled: readOnly, onInput: onToggle }),
            react_1.default.createElement("span", { className: `${baseClass}__icon ${!partialChecked ? 'check' : 'partial'}` },
                !partialChecked && (react_1.default.createElement(Check_1.default, null)),
                partialChecked && (react_1.default.createElement(Line_1.default, null)))),
        label && (react_1.default.createElement(Label_1.default, { htmlFor: id, label: label, required: required }))));
};
exports.CheckboxInput = CheckboxInput;
//# sourceMappingURL=Input.js.map