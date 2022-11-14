import {Injectable} from '@angular/core';
import {ParameterDto} from "../models/parameter.dto";

@Injectable()
export class ParametersService {
  getParameterValue(key: string, parameters: ParameterDto[]): any {
    try {
      const param = parameters.find(p => p.key === key)
      return param ? JSON.parse(param.value) : undefined
    } catch {
      return undefined
    }
  }
}
