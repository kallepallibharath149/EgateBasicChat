import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectTogroupsComponent } from './redirect-togroups.component';

describe('RedirectTogroupsComponent', () => {
  let component: RedirectTogroupsComponent;
  let fixture: ComponentFixture<RedirectTogroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectTogroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectTogroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
