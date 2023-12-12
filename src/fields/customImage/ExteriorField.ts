import { Field } from 'payload/types';
import ExteriorImagesCustom from '../../components/ExteriorImagesCustom';

export const CustomExteriorImages: Field = {
  name: 'customExteriorImages',
  type: 'ui',
  admin: {
    components: {
      Field: ExteriorImagesCustom,
    },
  }
}
