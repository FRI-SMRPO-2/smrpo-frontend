import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl) {
    return control.touched && !!control.errors;
  }
}
