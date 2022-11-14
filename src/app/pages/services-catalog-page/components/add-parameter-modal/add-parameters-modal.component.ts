import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ParameterDto} from "../../models/parameter.dto";
import {select, Store} from "@ngrx/store";
import {GET_AVAILABLE_PARAMETERS_REQUEST} from "../../state-management/service-catalog-page.actions";
import {availableParametersSelector} from "../../state-management/service-catalog-page.reducers";
import {map, Observable} from "rxjs";
import {ServiceDto} from "../../models/service.dto";
import {ParameterCategoryEnum} from "../../models/enums/parameter-category.enum";

export interface AddParametersModal {
  service: ServiceDto;
  category: ParameterCategoryEnum;
  saveFunction: (parameter: ParameterDto) => void;
}

@Component({
  templateUrl: './add-parameters-modal.component.html',
  styleUrls: ['./add-parameters-modal.component.scss']
})
export class AddParametersModalComponent implements OnInit{
  parameters$: Observable<ParameterDto[]>
  saveFunction: ((parameter: ParameterDto) => void) | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddParametersModal,
              private readonly dialogRef: MatDialogRef<AddParametersModalComponent>,
              private readonly store: Store
  ) {
    this.parameters$ = this.store.pipe(
      select(availableParametersSelector),
      map(parameters => parameters.filter(p => p.category === data.category)),
      map(parameters => parameters.filter(p => !data.service.parameters?.find(parameter => parameter.id === p.id)))
    );
    this.saveFunction = data.saveFunction;
  }

  close(): void {
    this.dialogRef.close();
  }

  saveChanges(parameter: ParameterDto): void {
    this.saveFunction && this.saveFunction(parameter);
    this.close();
  }

  ngOnInit(): void {
    this.store.dispatch(new GET_AVAILABLE_PARAMETERS_REQUEST())
  }
}
