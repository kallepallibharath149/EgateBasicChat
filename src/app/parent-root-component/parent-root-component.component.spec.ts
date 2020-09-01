import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentRootComponentComponent } from './parent-root-component.component';

describe('ParentRootComponentComponent', () => {
  let component: ParentRootComponentComponent;
  let fixture: ComponentFixture<ParentRootComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentRootComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentRootComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
