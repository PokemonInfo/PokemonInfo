import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCelularComponent } from './menu-celular.component';

describe('MenuCelularComponent', () => {
  let component: MenuCelularComponent;
  let fixture: ComponentFixture<MenuCelularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCelularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCelularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
