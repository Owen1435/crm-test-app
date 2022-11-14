import {ParameterCategoryEnum} from "./enums/parameter-category.enum";

export interface ParameterDto {
  id: number
  key: string
  value: string
  title: string
  description?: string
  category: ParameterCategoryEnum
}
