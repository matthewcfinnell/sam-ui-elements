import {TestBed, async, ComponentFixtureAutoDetect, ComponentFixture} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

// Load the implementations that should be tested
import {SamAccordionComponent, SamAccordionSection} from "./accordion.component";

@Component({
  template: `
    <sam-accordion>
      <sam-accordion-section name="aria-friendly-name">Content Goes Here</sam-accordion-section>
      <sam-accordion-section name="a-different-aria-friendly-name">More Content Goes Here</sam-accordion-section>
    </sam-accordion>
`
})
class AccordionDefault { }

@Component({
  template: `
    <sam-accordion [bordered]="true">
      <sam-accordion-section name="aria-friendly-name">Content Goes Here</sam-accordion-section>
      <sam-accordion-section name="a-different-aria-friendly-name">More Content Goes Here</sam-accordion-section>
    </sam-accordion>
`
})
class AccordionBordered { }

@Component({
  template: `
    <sam-accordion [expandIndex]="0">
      <sam-accordion-section name="aria-friendly-name">Content Goes Here</sam-accordion-section>
      <sam-accordion-section name="a-different-aria-friendly-name">More Content Goes Here</sam-accordion-section>
    </sam-accordion>
`
})
class AccordionInitialized { }

function getComponent(fix: any) {
  return fix.debugElement.query(By.directive(SamAccordionComponent)).componentInstance;
}

describe('The Sam Accordion component', () => {
  let component:SamAccordionComponent;
  let fixture:any;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ],
      declarations: [AccordionDefault, AccordionBordered, AccordionInitialized, SamAccordionComponent, SamAccordionSection]
    }).compileComponents();
  }));

  it('should display an accordion with a border', () => {
    fixture = TestBed.createComponent(AccordionBordered);
    component = getComponent(fixture);
    component.ngOnInit();
    let el = fixture.debugElement.query(By.css('ul'));
    expect(el.nativeElement.classList.contains('usa-accordion')).toBeFalsy();
    expect(el.nativeElement.classList.contains('usa-accordion-bordered')).toBeTruthy();
  });


  it('should display sam accordions without border', function () {
    fixture = TestBed.createComponent(AccordionDefault);
    component = getComponent(fixture);
    component.ngOnInit();
    let el = fixture.debugElement.query(By.css('ul'));
    expect(el.nativeElement.classList.contains('usa-accordion')).toBeTruthy();
    expect(el.nativeElement.classList.contains('usa-accordion-bordered')).toBeFalsy();
  });

  it('should expand the first section', function () {
    fixture = TestBed.createComponent(AccordionDefault);
    component = getComponent(fixture);
    component.ngOnInit();
    expect(component.expandIndex).toEqual(-1);
    let el = fixture.debugElement.query(By.css('button'));
    el.nativeElement.click();
    expect(component.expandIndex).toEqual(0);
  });

  it('should close a section', function () {
    fixture = TestBed.createComponent(AccordionInitialized);
    component = getComponent(fixture);
    component.ngOnInit();
    let el = fixture.debugElement.query(By.css('button'));
    el.nativeElement.click();
    expect(component.expandIndex).toEqual(-1);
  });
});