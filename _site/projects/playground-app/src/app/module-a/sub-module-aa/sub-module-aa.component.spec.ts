import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubModuleAaComponent } from './sub-module-aa.component';

describe('SubModuleAaComponent', () => {
  let component: SubModuleAaComponent;
  let fixture: ComponentFixture<SubModuleAaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubModuleAaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubModuleAaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
