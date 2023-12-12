import { Field } from 'payload/types';
import InteriorImagesCustom from '../../components/InteriorImagesCustom';

export const CustomInteriorImages: Field = {
  name: 'customInteriorImages',
  type: 'ui',
  admin: {
    components: {
      Field: InteriorImagesCustom,
    },
  }
}
