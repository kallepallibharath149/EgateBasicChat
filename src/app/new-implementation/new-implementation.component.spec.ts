import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewImplementationComponent } from './new-implementation.component';

describe('NewImplementationComponent', () => {
  let component: NewImplementationComponent;
  let fixture: ComponentFixture<NewImplementationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewImplementationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
