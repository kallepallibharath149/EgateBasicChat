import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreategroupNewComponent } from './creategroup-new.component';

describe('CreategroupNewComponent', () => {
  let component: CreategroupNewComponent;
  let fixture: ComponentFixture<CreategroupNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreategroupNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreategroupNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
