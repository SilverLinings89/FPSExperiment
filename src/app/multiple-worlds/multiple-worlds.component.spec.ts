import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleWorldsComponent } from './multiple-worlds.component';

describe('MultipleWorldsComponent', () => {
  let component: MultipleWorldsComponent;
  let fixture: ComponentFixture<MultipleWorldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleWorldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleWorldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
