import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubModuleAbComponent } from './sub-module-ab.component';

describe('SubModuleAbComponent', () => {
  let component: SubModuleAbComponent;
  let fixture: ComponentFixture<SubModuleAbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubModuleAbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubModuleAbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
