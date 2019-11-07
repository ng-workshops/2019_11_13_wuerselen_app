import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from '../../../../config/TranslateTestingModule';
import { Impressum2Component } from './impressum2.component';

xdescribe('Impressum2Component', () => {
  let component: Impressum2Component;
  let fixture: ComponentFixture<Impressum2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Impressum2Component],
      imports: [TranslateTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Impressum2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
