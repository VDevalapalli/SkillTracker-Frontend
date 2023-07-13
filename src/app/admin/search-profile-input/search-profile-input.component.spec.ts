import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProfileInputComponent } from './search-profile-input.component';

describe('SearchProfileInputComponent', () => {
  let component: SearchProfileInputComponent;
  let fixture: ComponentFixture<SearchProfileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProfileInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProfileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
