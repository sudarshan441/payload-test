import { Field } from 'payload/types';
import { CustomSelectComponent } from './component';

export const CustomSelectField: Field = {
  name: 'customSelectField',
  type: 'ui',
  admin: {
    components: {
      Field: CustomSelectComponent,
    },
  }
}
