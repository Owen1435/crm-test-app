import { Component, Inject } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ParameterDto} from "../../models/parameter.dto";

export interface EditParameterModal {
  parameter: ParameterDto;
  saveFunction: (parameter: ParameterDto) => void;
}

@Component({
  templateUrl: './edit-parameter-modal.component.html',
  styleUrls: ['./edit-parameter-modal.component.scss']
})
export class EditParameterModalComponent {
  form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      value: new FormControl(''),
    }
  )
  parameter: ParameterDto;
  saveFunction: (parameter: ParameterDto) => void;

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditParameterModal,
              private readonly dialogRef: MatDialogRef<EditParameterModalComponent>
  ) {
    this.saveFunction = data.saveFunction;
    this.parameter = data.parameter;

    this.form.patchValue(this.parameter);
  }

  close(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    if (this.saveFunction) {
      this.saveFunction({...this.parameter, ...this.form.value});
      this.close();
    }
    this.close();
  }
}
