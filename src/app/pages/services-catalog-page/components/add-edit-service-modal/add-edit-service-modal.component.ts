import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface AddEditServiceModal {
  mode: 'add' | 'edit'
  serviceName: string;
  saveFunction: (serviceName: string) => void;
}

@Component({
  templateUrl: './add-edit-service-modal.component.html',
  styleUrls: ['./add-edit-service-modal.component.scss']
})
export class AddEditServiceModalComponent {
  serviceName = new FormControl('', Validators.required);
  saveFunction: ((serviceName: string) => void) | undefined;
  mode = 'add'

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddEditServiceModal,
              private readonly dialogRef: MatDialogRef<AddEditServiceModalComponent>
  ) {
    this.serviceName.setValue(data.serviceName);
    this.saveFunction = data.saveFunction;
    this.mode = data.mode;
  }

  close(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    if (this.saveFunction && this.serviceName.value !== '') {
      this.saveFunction(this.serviceName.value);
      this.close();
    }
  }
}
