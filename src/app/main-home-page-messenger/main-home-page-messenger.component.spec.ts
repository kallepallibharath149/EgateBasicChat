import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHomePageMessengerComponent } from './main-home-page-messenger.component';

describe('MainHomePageMessengerComponent', () => {
  let component: MainHomePageMessengerComponent;
  let fixture: ComponentFixture<MainHomePageMessengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHomePageMessengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHomePageMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
