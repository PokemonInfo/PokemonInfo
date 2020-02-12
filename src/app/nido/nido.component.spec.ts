import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NidoComponent } from './nido.component';

describe('NidoComponent', () => {
  let component: NidoComponent;
  let fixture: ComponentFixture<NidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
