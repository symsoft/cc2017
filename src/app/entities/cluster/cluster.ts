import {Identifiable} from '../../shared/rest/Identifiable';

export class Cluster implements Identifiable {
  _id: string;
  uuid: string;
  name: string;
  parentUuid: string;
  ident: number;
  defaultFilePrefix: string;
  oca: string;

}
