import { Field } from 'payload/types';
import { CustomTextFieldComponent } from './component';

export const CustomTextField: Field = {
  name: 'customField',
  type: 'ui',
  admin: {
    components: {
      Field: CustomTextFieldComponent,
    },
  }
}
