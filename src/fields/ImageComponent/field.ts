import { Field } from 'payload/types';
import { CustomImageComponent } from './component';

export const CustomImageField: Field = {
  name: 'customInputField',
  type: 'ui',
  admin: {
    components: {
      Field: CustomImageComponent,
    },
  }
}
