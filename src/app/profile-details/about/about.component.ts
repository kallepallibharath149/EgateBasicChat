import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit, OnDestroy {

  MANY_ITEMS = 'MANY_ITEMS';
  addWork: boolean = false;
  addUniversity: boolean = false;
  addSchool: boolean = false;
  addPlace: boolean = false;
  addBasicInfo: boolean = false;
  subs = new Subscription();

  aboutActionItems: Array<any> = [
    {
      "name": "Overview"
    },
    {
      "name": "Work and education"
    },
    {
      "name": "Places lived"
    },
    {
      "name": "basic info"
    }
  ];


  workAndEducation = {
    "work": [{
      "company": "software Solutions",
      "position": "",
      "city": ""
    }],
    "University": [],
    "HighSchool": [],
  }

  places = [];

  basicInfo: any = {
    "gender": "male",
    "dateOfBirth": null,
    "email": "abdc@gamil.com",
    "address": "ddgdgddddd"
  }

  basicInfoAddObj = {
    "gender": "male",
    "dateOfBirth": null,
    "email": "abdc@gamil.com",
    "address": "ddgdgddddd"
  }

  workAddObj = {
    "company": "",
    "position": "",
    "city": ""
  };

  universityAddObj = {
    "college": "",
    "University": "",
    "course": ""
  };
  schoolAddObj = {
    "school": '',
    "description": ""
  }

  placeAddObj = {
    "place": ""
  }

  currentActiveItem: any = {
    "name": null
  };

  constructor(private dragulaService: DragulaService) {

    dragulaService.createGroup(this.MANY_ITEMS, {
      revertOnSpill: true,
      accepts: (el:HTMLElement, target, source, sibling) => {
        // To avoid dragging from right to left container
        return el.innerText !== 'Overview';
      }
    });
    this.subs.add(this.dragulaService.dropModel(this.MANY_ITEMS)
      .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
        console.log('dropModel:');
        console.log(el);
        console.log(source);
        console.log(target);
        console.log(sourceModel);
        console.log(targetModel);
        console.log(item);
      })
    );
    this.subs.add(this.dragulaService.removeModel(this.MANY_ITEMS)
      .subscribe(({ el, source, item, sourceModel }) => {
        console.log('removeModel:');
        console.log(el);
        console.log(source);
        console.log(sourceModel);
        console.log(item);
      })
    );
  }

  ngOnInit(): void {
    this.currentActiveItem = this.aboutActionItems[0];
  }

  setCurrentActiveTab(item) {
    this.currentActiveItem = item;
    this.cancellAllEditMode();

  }
  saveForm(type, ngForm) {
    if (type == 'work') {
      let workObj = Object.assign({}, this.workAddObj);
      this.workAndEducation.work.unshift(workObj);
    } else if (type == 'addUniversity') {
      let workObj = Object.assign({}, this.universityAddObj);
      this.workAndEducation.University.unshift(workObj);
    } else if (type == 'high school') {
      let workObj = Object.assign({}, this.schoolAddObj);
      this.workAndEducation['HighSchool'].unshift(workObj);
    } else if (type == 'addPlace') {
      let workObj = Object.assign({}, this.placeAddObj);
      this.places.unshift(workObj);
    } else if (type == 'basicInfo') {
      this.basicInfo = Object.assign({}, this.placeAddObj);
    }
    this.resetForm(ngForm);
  }
  resetForm(form: NgForm) {
    form.reset();
  }

  cancellAllEditMode() {
    this.addWork = false;
    this.addUniversity = false;
    this.addSchool = false;
    this.addPlace = false;
    this.addBasicInfo = false;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
