import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTimeLineComponent } from './profile-time-line.component';

describe('ProfileTimeLineComponent', () => {
  let component: ProfileTimeLineComponent;
  let fixture: ComponentFixture<ProfileTimeLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTimeLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
