import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubModuleBaComponent } from './sub-module-ba.component';

describe('SubModuleBaComponent', () => {
  let component: SubModuleBaComponent;
  let fixture: ComponentFixture<SubModuleBaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubModuleBaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubModuleBaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
