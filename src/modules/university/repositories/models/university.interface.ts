import { TCreateUniversity } from "../../models/create-university.type";
import { University } from "../../models/university.model";

export interface IUniversity {
  create(data: TCreateUniversity): Promise<void>;
  findByCountryStateName(country: string, state: string, name: string): Promise<University | undefined>;
}
