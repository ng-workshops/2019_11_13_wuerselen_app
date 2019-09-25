import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Settings } from './settings.model';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  styleUrls: ['./settings.component.scss'],
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  private initialData: Settings;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initialData = JSON.parse(
      JSON.stringify(this.route.snapshot.data.settings)
    );
    this.form = Settings.toFormGroup(this.route.snapshot.data.settings);
  }

  save() {
    this.settingsService.set(this.form.getRawValue()).subscribe(() =>
      this.snackBar.open('Settings save successfully.', '', {
        duration: 1000
      })
    );
  }

  addRight() {
    (<FormArray>this.form.get('rights')).push(new FormControl());
  }

  reset() {
    this.form = Settings.toFormGroup(this.initialData);
  }
}
