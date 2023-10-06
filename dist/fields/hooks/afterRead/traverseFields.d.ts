import { Field, TabAsField } from '../../config/types';
import { PayloadRequest, RequestContext } from '../../../express/types';
type Args = {
    currentDepth: number;
    depth: number;
    doc: Record<string, unknown>;
    fieldPromises: Promise<void>[];
    fields: (Field | TabAsField)[];
    findMany: boolean;
    flattenLocales: boolean;
    populationPromises: Promise<void>[];
    req: PayloadRequest;
    overrideAccess: boolean;
    siblingDoc: Record<string, unknown>;
    showHiddenFields: boolean;
    context: RequestContext;
};
export declare const traverseFields: ({ currentDepth, depth, doc, fieldPromises, fields, findMany, flattenLocales, overrideAccess, populationPromises, req, siblingDoc, showHiddenFields, context, }: Args) => void;
export {};
