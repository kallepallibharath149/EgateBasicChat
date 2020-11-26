import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateBookmarksComponent } from './navigate-bookmarks.component';

describe('NavigateBookmarksComponent', () => {
  let component: NavigateBookmarksComponent;
  let fixture: ComponentFixture<NavigateBookmarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigateBookmarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigateBookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
