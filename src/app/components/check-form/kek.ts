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
  constructor(private fb: FormBuilder) {}
  @Input() title_c: string = '';
  @Input() subtitles: string[] = [];
  @Input() align_t?: boolean;
  @Input() align_c: number = 3;
  @Input() form: FormGroup = this.fb.group({});
  @Input() values: any = {};
  @Input() position: number = 0;
  @Input() multi_c: boolean = false;
  @Output() formChange = new EventEmitter<FormGroup>();
  checkedIndex: number | null = null;
  checkedIndexes: number[] = [];
  formControlNames: string[] = [];
  conditionsArray: any[] = [];


  ngOnInit(): void {
    this.formControlNames = this.subtitles.map((_, i) => `control${i}`);
    this.initializeForm();
    this.setupValueChanges();
  }

  isOnlyChildInRow(index: number): boolean {
    return this.subtitles.length % this.align_c === 1 && index === this.subtitles.length - 1;
  }

  initializeForm(): void {
    const controls = this.formControlNames.reduce((acc, name) => {
      acc[name] = new FormControl(false);
      return acc;
    }, {} as { [key: string]: FormControl });

    this.form = this.fb.group(controls);

    // Set initial values for checkboxes
    this.subtitles.forEach((subtitle, i) => {
      if (this.isSubtitleChecked(subtitle)) {
        this.form.get(this.formControlNames[i])?.setValue(true);
      }
    });
  }

  setupValueChanges(): void {
    this.form.valueChanges.subscribe(() => {
      this.updateValues();
      this.formChange.emit(this.form);
    });
  }

  isSubtitleChecked(subtitle: string): boolean {
    return this.values.value.six_month_condition.includes(subtitle);
  }

  onCheckboxChange(index: number): void {
    const control = this.form.get(this.formControlNames[index]);
    const isChecked = control?.value ?? false;

    if (!this.multi_c) {
      this.checkedIndex = isChecked ? index : null;
      this.updateValues();
    } else {
      if (isChecked) {
        this.checkedIndexes.push(index);
        this.conditionsArray.push(this.subtitles[index]);
      } else {
        this.checkedIndexes = this.checkedIndexes.filter(i => i !== index);
        this.conditionsArray = this.conditionsArray.filter(item => item !== this.subtitles[index]);
      }
      this.updateValues();
    }
  }

  updateValues(): void {
    const key = Object.keys(this.values.value)[this.position];
    this.values.patchValue({ [key]: this.multi_c ? this.conditionsArray : this.subtitles[this.checkedIndex ?? -1] });
  }

  onFormSubmit(): void {
    this.formChange.emit(this.form);
  }
}



// isSubtitleChecked(subtitle: string): boolean {
//   let position = Object.values(this.values.value);
//   let objecto = JSON.stringify(this.values.value);
//   let quest = this.values.value?.[Object.keys(this.values.value)[this.position]].toString();
//   if (!this.arr.includes(quest)) {
//     this.arr.push(this.values.value?.[Object.keys(this.values.value)[this.position]].toString());
//   }
//   // arr.push(this.values.value?.[Object.keys(this.values.value)[this.position]].toString())
//   // console.log([Object.keys(this.values.value)[this.position]], "JOYBOY");
//   // console.log([Object.keys(this.values.value)[this.position]].toString(), "JOYBOY");
//   // console.log(this.values.value?.[Object.keys(this.values.value)[this.position]].toString(), "JOYBOY");
//   // return this.values.value?.six_month_condition?.includes(subtitle);
//   return this.values.value?.six_month_condition?.includes(subtitle);
// }
