import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminclientComponent } from './adminclient.component';

describe('AdminclientComponent', () => {
  let component: AdminclientComponent;
  let fixture: ComponentFixture<AdminclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
