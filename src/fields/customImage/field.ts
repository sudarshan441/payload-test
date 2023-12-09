import { Field } from 'payload/types';
import { CustomInputComponent } from './component';

export const CustomInputField: Field = {
  name: 'customInputField',
  type: 'ui',
  admin: {
    components: {
      Field: CustomInputComponent,
    },
  }
}
