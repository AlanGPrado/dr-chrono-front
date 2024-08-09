import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-form',
  standalone: true,
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})

export class CheckFormComponent {
  constructor(private fb: FormBuilder) { }
  @Input() title_c: string = '';
  @Input() subtitles: string[] = [];
  @Input() align_t?: boolean;
  @Input() align_c: number = 3;
  @Input() form: FormGroup = this.fb.group({});
  @Input() values: any = {};
  @Input() position: number = 0;
  @Input() multi_c: boolean = false;
  @Input() submitted: any;
  @Output() formChange = new EventEmitter<FormGroup>();
  checkedIndex: number | null = null;
  checkedIndexes: number[] = [];
  formControlNames: string[] = [];
  conditionsArray: any[] = [];
  key: any;

  ngOnInit(): void {
    this.initializeForm();
    this.values.valueChanges.subscribe(() => {
      this.updateFormValues();
    });

    this.values.valueChanges.subscribe(() => {
      this.formChange.emit(this.values);
    });

    this.key = Object.keys(this.values.value);

    if (Array.isArray(this.values.value[Object.keys(this.values.value)[this.position]])) {
      const matchingIndexes = this.values.value[Object.keys(this.values.value)[this.position]]
        .map((value: any) => this.subtitles.indexOf(value))
        .filter((index: number) => index !== -1);
      this.checkedIndexes.push(...matchingIndexes);
    }
  }

  isOnlyChildInRow(index: number): boolean {
    return this.subtitles.length % this.align_c === 1 && index === this.subtitles.length - 1;
  }

  onCheckboxChange(index: number): void {
    if (!this.multi_c) {
      (this.checkedIndex === index) ? this.checkedIndex = null : this.checkedIndex = index;
      this.values.patchValue({ [Object.keys(this.values.value)[this.position]]: this.subtitles[index] });
      if (this.checkedIndex === null) {
        this.values.get([Object.keys(this.values.value)[this.position]]).reset('');
      }
    }
    else {
      if (this.values.value[Object.keys(this.values.value)[this.position]].length > 0) {
        let array = [...new Set(this.values.value[Object.keys(this.values.value)[this.position]])];
        const filteredArray = array.filter((obj: any) => Object.keys(obj).length !== 0);
        this.conditionsArray = filteredArray;
      }
      if (this.checkedIndexes.indexOf(index) === -1) {
        this.checkedIndexes.push(index);
        this.conditionsArray.push(this.subtitles[index]);
      } else {
        this.checkedIndexes.splice(this.checkedIndexes.indexOf(index), 1);
        this.conditionsArray.splice(this.conditionsArray.indexOf(this.subtitles[index]), 1);
      }
      this.values.patchValue({ [Object.keys(this.values.value)[this.position]]: this.conditionsArray });
    }
  }

  initializeForm(): void {
    this.formControlNames = Object.keys(this.values).map(value =>
      value.toLowerCase().replace(' ', '_')
    );

    this.form = this.fb.group(
      this.formControlNames.reduce((controls, name, index) => {
        controls[name] = new FormControl(this.checkedValues(this.subtitles[index]));
        return controls;
      }, {} as { [key: string]: FormControl })
    );
  }

  checkedValues(subtitle: string): boolean {
    const key = Object.keys(this.values.value)[this.position];
    return this.values.value[key].includes(subtitle);
  }

  updateFormValues(): void {
    this.formControlNames.forEach((name, index) => {
      const control = this.form.get(name);
      if (control) {
        control.setValue(this.checkedValues(this.subtitles[index]), { emitEvent: false });
      }
    });
    this.formChange.emit(this.form.value);
  }

  onFormSubmit(): void {
    this.formChange.emit(this.form);
  }
}
