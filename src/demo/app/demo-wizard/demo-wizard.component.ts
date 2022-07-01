import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { StepValidationArgs } from 'src/ng-wizard/lib/utils/interfaces';
import {
  NgWizardConfig,
  NgWizardService,
  StepChangedArgs,
  STEP_STATE,
  THEME
} from '../../../ng-wizard/public-api'; // 'ng-wizard'

@Component({
  selector: 'app-demo-wizard',
  templateUrl: './demo-wizard.component.html',
  styleUrls: ['./demo-wizard.component.css']
})
export class DemoWizardComponent implements OnInit {
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };

  config: NgWizardConfig = {
    selected: 0,
    //theme: THEME.arrows,
  
  };

  stepChangedArgs: StepChangedArgs;
  //selectedTheme: THEME;
 // themes = [THEME.default, THEME.arrows, THEME.circles, THEME.dots];
  selectedStepIndex: number;
 // stepIndexes = [0, 1, 2, 3, 4, 5, 6];

  constructor(private ngWizardService: NgWizardService) {
  }

  ngOnInit() {
   // this.selectedTheme = this.config.theme;
    this.selectedStepIndex = this.config.selected;

    this.ngWizardService.stepChanged()
      .subscribe({
        next: (args) => this.setStepChangedArgs(args)
      });
  }

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

 

  

  stepIndexSelected() {
    this.ngWizardService.show(this.selectedStepIndex);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);

    // this.setStepChangedArgs(args);
  }

  isValidTypeBoolean: boolean = true;

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }

  private setStepChangedArgs(args: StepChangedArgs) {
    args.step ? (<any>args.step).__ngContext__ = undefined : {};
    args.previousStep ? (<any>args.previousStep).__ngContext__ = undefined : {};

    setTimeout(() => {
      this.stepChangedArgs = args;
    }, 0);
  }
}
