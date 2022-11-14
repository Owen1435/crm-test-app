import {Injectable} from '@angular/core';
import {delay, EMPTY, map, Observable, of} from "rxjs";
import {ServiceDto} from "../models/service.dto";
import {ParameterCategoryEnum} from "../models/enums/parameter-category.enum";
import {ServiceTypeEnum} from "../models/enums/service-type.enum";
import {CreateServiceRequestDto} from "../models/create-service.request.dto";
import {EditServiceRequestDto} from "../models/edit-service.request.dto";
import {ParameterDto} from "../models/parameter.dto";

@Injectable()
export class ServiceCatalogService {
  private parameters: ParameterDto[] = [
    {id: 1,  key: '', value: '', title: 'Местоположение', description: 'укажите параметры удалённости доставки', category: ParameterCategoryEnum.CLIENT},
    {id: 2,  key: '', value: '', title: 'Расписание', description: 'укажите время когда услуга оказывается', category: ParameterCategoryEnum.CLIENT},
    {id: 3,  key: '', value: '', title: 'Автомобиль', description: 'выберите модель, год выпуска, вид топлива', category: ParameterCategoryEnum.CLIENT},
    {id: 4,  key: '', value: '', title: 'Пользователь', description: 'выберите настройки профиля пользователя', category: ParameterCategoryEnum.CLIENT},
    {id: 5,  key: '', value: '', title: 'Зона обслуживания', description: 'выберите зону обслуживания', category: ParameterCategoryEnum.CLIENT},
    {id: 6,  key: '', value: '', title: 'Контактный телефон', category: ParameterCategoryEnum.CLIENT},
    {id: 7,  key: '', value: '', title: 'Координаты автомобиля', category: ParameterCategoryEnum.CLIENT},
    {id: 8,  key: 'orderStatus', value: '{"value": "доставляется"}', title: 'Статус', category: ParameterCategoryEnum.CLIENT},
    {id: 9,  key: '', value: '', title: 'Рекламное сообщение', category: ParameterCategoryEnum.OTHER},
    {id: 10, key: 'fuel', value: '{"types":["дт","бензин"],"value": "дт"}', title: 'Тип топлива, бензин ДТ', category: ParameterCategoryEnum.PROVIDER},
    {id: 11, key: 'volume', value: '{"min": 1, "max": 100, "value": 50}', title: 'Обьём топлива, литр', category: ParameterCategoryEnum.PROVIDER},
    {id: 12, key: 'deliveringTime', value: '{"value": "1ч 30 мин"}', title: 'Время ожидания', category: ParameterCategoryEnum.PROVIDER},
    {id: 13, key: '', value: '', title: 'Координаты заправщика', category: ParameterCategoryEnum.PROVIDER},
    {id: 14, key: '', value: '', title: 'Заправки', category: ParameterCategoryEnum.PROVIDER},
    {id: 15, key: '', value: '', title: 'Закрытая территория', category: ParameterCategoryEnum.PROVIDER},
    {id: 16, key: '', value: '', title: 'Позвонить за 1 час', category: ParameterCategoryEnum.PROVIDER},
    {id: 17, key: 'executor', value: '{"name":"Андрей", "phone": "+7 (916) 123-45-67"}', title: 'Данные заправщика', category: ParameterCategoryEnum.PROVIDER},
    {id: 18, key: 'cost', value: '{"value": 1200}', title: 'Стоимость', category: ParameterCategoryEnum.PROVIDER},
  ]

  private parameterToService = [
    {serviceId: 1, parameterId: 1},
    {serviceId: 1, parameterId: 3},
    {serviceId: 1, parameterId: 4},
    {serviceId: 1, parameterId: 5},
    {serviceId: 1, parameterId: 7},
    {serviceId: 1, parameterId: 8},
    {serviceId: 1, parameterId: 10},
    {serviceId: 1, parameterId: 11},
    {serviceId: 1, parameterId: 12},
    {serviceId: 1, parameterId: 13},
    {serviceId: 1, parameterId: 17},
    {serviceId: 1, parameterId: 18},
  ]

  private services: ServiceDto[] = [
    {id: 1, title: 'бензин в Сочи', type: ServiceTypeEnum.DELIVERY, prefix: 'title1'},
    {id: 2, title: 'бензин в Москве', type: ServiceTypeEnum.DELIVERY, prefix: 'title2'},
    {id: 3, title: 'бензин в Перми',type: ServiceTypeEnum.DELIVERY,  prefix: 'title3'},
  ]

  getServicesList(): Observable<ServiceDto[]> {
    return of(this.services).pipe(delay(500));
  }

  getAvailableParameters(): Observable<ParameterDto[]> {
    return of([...this.parameters]).pipe(delay(500));
  }

  addParameterToService(serviceId: number, parameterId: number): Observable<any> {
    this.parameterToService = [...this.parameterToService, {serviceId, parameterId}]

    return of(EMPTY).pipe(delay(500));
  }

  deleteParameter(parameterId: number): Observable<any> {
    this.parameterToService = this.parameterToService.filter(parameter => parameter.parameterId !== parameterId)

    return of(EMPTY).pipe(delay(500));
  }

  editParameter(serviceId: number, parameter: ParameterDto): Observable<any> {
    this.parameters = this.parameters.filter(p => p.id !== parameter.id)
    this.parameters = [...this.parameters, parameter]

    return of(EMPTY).pipe(delay(500));
  }

  getServiceById(id: number): Observable<ServiceDto | null> {
    const service = this.services.find(service => service.id === id)
    const serviceParametersIds = this.parameterToService.filter(ps => ps.serviceId === service?.id).map(ps => ps.parameterId) ?? []
    const serviceParameters = this.parameters.filter(p => serviceParametersIds.includes(p.id))

    return service ? of({...service, parameters: serviceParameters}).pipe(delay(500)) : of(null);
  }

  createService(payload: CreateServiceRequestDto): Observable<ServiceDto | null> {
    const service = {id: Date.now(), type: ServiceTypeEnum.DELIVERY, prefix: 'title1', ...payload}
    this.services = [...this.services, service]

    return of(service).pipe(delay(500));
  }

  editService(payload: EditServiceRequestDto): Observable<ServiceDto | null> {
    const service = this.services.find(service => service.id === payload.id)
    const editedService = service ? {...service, ...payload} : null

    if (editedService) {
      this.services = this.services.filter(service => service.id !== payload.id)
      this.services = [...this.services, editedService]
    }

    return service ? of(editedService).pipe(delay(500)) : of(null);
  }

  searchServices(term: string): Observable<ServiceDto[]> {
    return of(this.services).pipe(
      delay(500),
      map(services => services.filter(service => service.title.toLowerCase().includes(term.toLowerCase())))
    );
  }
}
