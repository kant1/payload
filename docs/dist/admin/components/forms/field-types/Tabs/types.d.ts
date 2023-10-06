import { TabsField } from '../../../../../fields/config/types';
import { FieldTypes } from '..';
import { FieldPermissions } from '../../../../../auth/types';
export type Props = Omit<TabsField, 'type'> & {
    path?: string;
    fieldTypes: FieldTypes;
    permissions: FieldPermissions;
    indexPath: string;
};
