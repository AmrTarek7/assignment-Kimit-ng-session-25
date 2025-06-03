import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserBootstrapComponent } from './add-user-bootstrap.component';

describe('AddUserBootstrapComponent', () => {
  let component: AddUserBootstrapComponent;
  let fixture: ComponentFixture<AddUserBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserBootstrapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
