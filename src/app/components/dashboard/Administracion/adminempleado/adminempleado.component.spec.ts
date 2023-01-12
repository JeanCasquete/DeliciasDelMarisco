import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminempleadoComponent } from './adminempleado.component';

describe('AdminempleadoComponent', () => {
  let component: AdminempleadoComponent;
  let fixture: ComponentFixture<AdminempleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminempleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
