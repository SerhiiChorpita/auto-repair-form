import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.scss']
})
export class PostAJobComponent implements OnInit {
  public model!: NgbDateStruct;
  public today = this.calendar.getToday();
  public todayDate: Date = new Date();

  public stepTwoStatus: boolean = false;


  constructor(
    private calendar: NgbCalendar
  ) { }

  ngOnInit(): void {
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  formData(form: NgForm): void {
    console.log(form.valid);
    console.log(form);
  }

  setStatusStepTwo(form: NgForm): boolean {
    let checkForm = (inpName: string) => form.controls[`${inpName}`].valid;

    if (checkForm('mark') && checkForm('model') && checkForm('year') && checkForm('toBeRepaired')) {
      return this.stepTwoStatus = true;
    }
    return this.stepTwoStatus = false;
  }

}
