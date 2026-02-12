import { UserObjective } from '../value-objects/user-objective';
import { UserSex } from '../value-objects/user-sex';

export interface User {
  id: string;
  email: string;
  peso: number;
  altura: number;
  idade: number;
  sexo: UserSex;
  objetivo: UserObjective;
}
