import { ParameterDto } from "./parameter.dto"
import {ServiceTypeEnum} from "./enums/service-type.enum";

export interface ServiceDto {
  id: number
  title: string
  prefix?: string
  type: ServiceTypeEnum
  parameters?: ParameterDto[]
}
