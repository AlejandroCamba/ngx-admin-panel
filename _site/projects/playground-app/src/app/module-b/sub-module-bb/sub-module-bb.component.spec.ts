import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubModuleBbComponent } from './sub-module-bb.component';

describe('SubModuleBbComponent', () => {
  let component: SubModuleBbComponent;
  let fixture: ComponentFixture<SubModuleBbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubModuleBbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubModuleBbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
