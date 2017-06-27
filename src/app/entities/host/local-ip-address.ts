import {Identifiable} from '../../shared/rest/Identifiable';

export class LocalIpAddress implements Identifiable {
  _id: string;
  uuid: string;
  name: string;
  parentHostUuid: string;
  ipAddr: string;
  oca: string;
}
