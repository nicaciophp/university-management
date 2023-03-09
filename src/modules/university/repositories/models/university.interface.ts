import { QueryDto } from "src/modules/shared/dtos/query.dto";
import { IPaginatedData } from "src/modules/shared/models/paginated-data.interface";
import { TCreateUniversity } from "../../models/create-university.type";
import { University } from "../../models/university.model";

export interface IUniversity {
  create(data: TCreateUniversity): Promise<void>;
  findByCountryStateName(country: string, state: string, name: string): Promise<University | undefined>;
  findAll(query: QueryDto): Promise<IPaginatedData<Pick<
  University, 
  'country' | 
  'name' | 
  'state-province' | 
  '_id'>>>;
}
