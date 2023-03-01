import {Component, Input, Self} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl} from "@angular/forms";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements ControlValueAccessor{
  @Input() label = '';
  @Input() date: Date | undefined;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }
  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl
  }
}
