import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '../../../../config/TranslocoTestingModule';
import { Impressum3Component } from './impressum3.component';

describe('Impressum3Component', () => {
  let component: Impressum3Component;
  let fixture: ComponentFixture<Impressum3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Impressum3Component],
      imports: [getTranslocoModule()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Impressum3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
