import {Identifiable} from '../../shared/rest/Identifiable';

export class Host implements Identifiable {
  _id: string;
  uuid: string;
  name: string;
  oca: string;
}
