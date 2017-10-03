import { Component, Input, ViewChild, ElementRef, ChangeDetectorRef, Optional, forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { LabelWrapper } from '../../wrappers/label-wrapper';
import { AutocompleteService } from '../autocomplete/autocomplete.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';
import {SamFormService} from '../../form-service';

@Component({
  selector: 'sam-autocomplete-multiselect',
  templateUrl: 'autocomplete-multiselect.template.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SamAutocompleteMultiselectComponent), multi: true}
  ],
  animations: [
    trigger('dropdown', [
      transition('void => *', [
        animate('.15s ease-in-out', keyframes([
          style({filter:'blur(3px)', height: '0', opacity: '0.5',  offset: 0}),
          style({filter:'blur(0px)', height: '*', opacity: '1',  offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate('.1s ease-out', keyframes([
          style({height: '*', opacity: '1', offset: 0}),
          style({height: '0', opacity: '0', offset: 1.0})
        ]))
      ])
    ]),
    trigger('label', [
      transition('void => *', [
        animate('.15s ease-in-out', keyframes([
          style({transform: 'scale(0)', filter:'blur(3px)', opacity: '0.5',  offset: 0}),
          style({transform: 'scale(1)', filter:'blur(0px)', opacity: '1',  offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate('.1s ease-out', keyframes([
          style({filter:'blur(0px)', opacity: '1', offset: 0}),
          style({filter:'blur(3px)', opacity: '0', offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class SamAutocompleteMultiselectComponent implements ControlValueAccessor {
  /**
   * Gets DOM element for the textarea used for input
   */
  @ViewChild('textArea') textArea: ElementRef;
  @ViewChild('hiddenText') hiddenText: ElementRef;
  @ViewChild('resultsList') resultsList: ElementRef;
  @ViewChild(LabelWrapper) wrapper: LabelWrapper;

  /**
   * Options should be an array of objects that contain the key value pairs to be
   * used to select in the component.
   */
  @Input() options: Array<any> = [];
  /**
   * Key Value Config is an object that sets which property on the options objects
   * should be used to display the key, value, and subhead properties in the list.
   */
  @Input() keyValueConfig: KeyValueConfig = { keyProperty: 'key', valueProperty: 'value', parentCategoryProperty: 'category' };
  /**
   * Used when a service is used to get autocomplete options
   */
  @Input() serviceOptions: any;
  /**
   * Used by labelWrapper. Makes field required and displays required on label.
   * See labelWrapper for more detail.
   */
  @Input() required: boolean;
  /**
   * Used by labelWrapper. Displays a label above input.
   * See labelWrapper for more detail.
   */
  @Input() label: string;
  /**
   * Used by labelWrapper. Provides a hint on how to use field.
   * See labelWrapper for more detail.
   */
  @Input() hint: string;
  /**
   * Used by labelWrapper. Provides a name for input and label.
   * See labelWrapper for more detail.
   */
  @Input() name: string;
  /**
   * Used by labelWrapper. Passes in a Form Control to display error messages
   * See labelWrapper for more detail.
   */
  @Input() control: FormControl;
  /**
  * Toggles validations to display with SamFormService events
  */
  @Input() useFormService: boolean;
  /**
   * Provides an array of categories for selection
   * when also setting categoryIsSelectable property
   * to true.
   *
   * The array should be the object for the category
   * to be selected.
   */
  @Input() categories: Array<any> = [];
  /**
   * Provides the option to allow categories to be selected
   */
  @Input() categoryIsSelectable: boolean = false;
  /**
   * Allows any value typed in the input to be chosen
   */
  @Input() public allowAny: boolean = false;
  /**
   * Optional: Provides a default search string to use with service
   * in lieu of sending an empty string. If not provided, value
   * defaults to an empty string.
   *
   * WARNING: If your service overrides or manipulates the value
   * passed to the fetch method, providing a default search string
   * on the component may not produce the expected results.
   *
   * Example:
   * this.autocompleteService.fetch(this.defaultSearchString, pageEnd, options)
   */
  @Input() defaultSearchString: string = '';

  /** Red error message text **/
  @Input() errorMessage: string = '';

  public searchText: string = '';

  private innerValue: Array<any> = [];
  private isDisabled: boolean = false;
  private list: any = [];
  private cachingService: any;
  private inputTimer: any;

  private onChangeCallback: (_: any) => void = (_: any) => {};
  private onTouchedCallback: () => void = () => {};

  set value(val: any) {
    this.innerValue = val;
    this.onChangeCallback(this.innerValue);
  }

  get value() {
    return this.innerValue;
  }

  constructor(@Optional() private service: AutocompleteService,
    private ref: ChangeDetectorRef,
    private samFormService:SamFormService) {
    this.cachingService = this.CachingService();
  }

  ngOnInit() {
    if (this.list.length >0) this.list = this.sortByCategory(this.list);
    if(!this.control){
      return;
    }
    if(!this.useFormService){
      this.control.statusChanges.subscribe(()=>{
        this.wrapper.formatErrors(this.control);
      });
      this.wrapper.formatErrors(this.control);
    }
    else {
      this.samFormService.formEventsUpdated$.subscribe(evt=>{
        if((!evt['root']|| evt['root']==this.control.root) && evt['eventType'] && evt['eventType']=='submit'){
          this.wrapper.formatErrors(this.control);
        } else if((!evt['root']|| evt['root']==this.control.root) && evt['eventType'] && evt['eventType']=='reset'){
          this.wrapper.clearError();
        }
      });
    }
  }

  ngOnChanges(c){
    if(c['options']){
      this.updateMarked();
    }
  }

  CachingService(initialResults?: any, initialSearchString?: any) {
    let cachedResults = initialResults || [];
    let lastSearchedString = initialSearchString || '';
    let _scrollEnd: number;
    let _currentIndex: number;

    const results = () => { return cachedResults };
    const lastSearch = () => { return lastSearchedString; };
    const scrollEnd = () => { return _scrollEnd; };
    const currentIndex = () => { return _currentIndex; };

    const updateResults = function(results) {
      cachedResults = results;
    };

    const updateSearchString = function(newSearchString) {
      lastSearchedString = newSearchString;
    };

    const setScrollEnd = (num: number) => { return _scrollEnd = num; };

    const setCurrentIndex = (num: number) => { return _currentIndex = num; };

    const hasReachedScrollEnd = (): boolean => { return _scrollEnd === _currentIndex; }

    const shouldUseCachedResults = function (searchString) {
      if (cachedResults && searchString === lastSearchedString) {
        return true;
      } else {
        return false;
      }
    }

    return {
      results: results,
      updateResults: updateResults,
      lastSearch: lastSearch,
      updateSearchString: updateSearchString,
      shouldUseCachedResults: shouldUseCachedResults,
      hasReachedScrollEnd: hasReachedScrollEnd,
      scrollEnd: scrollEnd,
      currentIndex: currentIndex,
      setScrollEnd: setScrollEnd,
      setCurrentIndex: setCurrentIndex
    }
  }

  /***************************************************************
   * Handling key events                                         *
   ***************************************************************/

  /**
   * Checks if event code was `Backspace`. Procedure then removes
   * the last selected item if there is no user input in the text
   * area.
   */
  handleBackspaceEvent(event) {
    if (event.code === 'Backspace' || event.keyIdentified === 'Backspace') {
      if (event.target.value === "" && this.value.length > 0) {
        this.deselectItem(this.value[this.value.length - 1]);
      }
    }

    return event;
  }

  /**
   * Clears list when escape is pressed
   */
  handleEscapeEvent(event) {
    if (event.code === 'Escape' || event.keyIdentified === 'Escape') {
      this.clearSearch();
      this.blurTextArea();
    }

    return event;
  }
  /**
   * Checks if event key code was `Enter`. If so, prevents default
   * behavior.
   *
   * For this component, the point is to stop the browser from
   * inserting a return character into the text area.
   */
  handleEnterEvent(event) {
    if (event.code === 'Enter' || event.keyIdentified === 'Enter') {
      event.preventDefault();
    }

    return event;
  }

  /**
   * Checks if event key code was `Enter`. If so and text area has
   * a value, procedure calls filterOptions and selects the first
   * item that is returned.
   */
  selectOnEnter(event) {
    if (event.code === 'Enter' || event.keyIdentified === 'Enter') {
      let lookedUpItem = this.getItem();
      if(this.allowAny && lookedUpItem && lookedUpItem[this.keyValueConfig.keyProperty]==null && event.target.value !== ''){
        let obj = {};
        obj[this.keyValueConfig.keyProperty] = event.target.value;
        obj[this.keyValueConfig.valueProperty] = event.target.value;
        this.selectItem(obj);
        //this.options.push(obj);
      } else {
        this.selectItem(lookedUpItem);
      }
      this.clearSearch();
      //this.blurTextArea();

      this.list = [];
    }

    return event;
  }

  getItem(): any {
    const results = this.getResults();
    const selectedChildIndex = this.getSelectedChildIndex(results);

    const selectedResultIndex: number = selectedChildIndex === -1 ? 0 : selectedChildIndex;

    if (results[selectedResultIndex].classList.contains('category-name')) {
      return this.categories.filter((item) => {
        if (item[this.keyValueConfig.parentCategoryProperty] === results[selectedResultIndex].attributes['data-category'].value) {
          return item;
        }
      })[0];
    } else {
        const categoryIndex = parseInt(results[selectedResultIndex].attributes['data-category'].value);
        const itemIndex = parseInt(results[selectedResultIndex].attributes['data-index'].value);
        return this.getItemFromListByIndices(categoryIndex, itemIndex);
    }
  }

  getItemFromListByIndices(categoryIndex, itemIndex) {
    return this.list[categoryIndex][itemIndex];
  }

  handleDownArrow(event) {
    if ( event.code === 'ArrowDown' || event.keyIdentified === 'Down' ) {
      const results = this.getResults();
      const selectedIndex = this.setSelectedChild(this.getSelectedChildIndex(results),
                                'Down',
                                results);
      this.updateCachingServiceIndices(this.getSelectedChildIndex(results), results.length);


      this.resultsList.nativeElement.scrollTop = (results[selectedIndex].offsetParent.offsetParent.offsetTop + results[selectedIndex].offsetTop) - this.resultsList.nativeElement.clientTop;
    }

    return event;
  }

  handleUpArrow(event) {
    if ( event.code === 'ArrowUp' || event.keyIdentified === 'Up' ) {
      const results = this.getResults();
      const selectedIndex = this.setSelectedChild(this.getSelectedChildIndex(results),
                                 'Up',
                                 results);
      this.updateCachingServiceIndices(this.getSelectedChildIndex(results), results.length);

      this.resultsList.nativeElement.scrollTop = (results[selectedIndex].offsetParent.offsetParent.offsetTop + results[selectedIndex].offsetTop) - this.resultsList.nativeElement.clientTop;
    }

    return event;
  }

  updateCachingServiceIndices(selectedIndex, resultsLength) {
    this.cachingService.setCurrentIndex(selectedIndex);
    this.cachingService.setScrollEnd(resultsLength);
  }

  getResults() {
    if (this.categoryIsSelectable) {
      return this.resultsList.nativeElement.querySelectorAll('li.category-item, li.category-name');
    } else {
      return this.resultsList.nativeElement.querySelectorAll('li.category-item');
    }
  }

  getSelectedChildIndex(elements: any): number {
    let selectedIndex = -1;
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].classList.contains('selected')) {
        selectedIndex = i;
      }
    }

    return selectedIndex;
  }

  setSelectedChild(currentSelectedIndex: number, direction: string, elements: any): number {
    if (currentSelectedIndex !== -1) {
      elements[currentSelectedIndex].classList.remove('selected');
    }

    let indexToSelect;

    if (direction === 'Down') {
      if (currentSelectedIndex === -1 || currentSelectedIndex === elements.length - 1) {
        indexToSelect = 0;
      } else {
        indexToSelect = currentSelectedIndex + 1;
      }
    } else if (direction === 'Up') {
      if (currentSelectedIndex === -1 || currentSelectedIndex === 0) {
        indexToSelect = elements.length - 1;
      } else {
        indexToSelect = currentSelectedIndex - 1;
      }
    }
    this.addSelectedClass(elements, indexToSelect);
    return indexToSelect;
  }

  addSelectedClass(elements: any, index: number): void {
    elements[index].classList.add('selected');
  }

  /***************************************************************
   * Logic for calculating CSS widths for textarea               *
   ***************************************************************/

  /**
   * Procedure to set the text area width
   * as the content changes.
   */
  applyTextAreaWidth(event) {

    if ( event.code !== "ArrowDown" && event.code !== "ArrowUp" ) {
      this.filterOptions(this.searchText);
    }
    this.ref.detectChanges();

    event.target.style.width = this.calculateTextAreaWidth(event.target);

    return event;
  }

  /**
   * Takes the current content of the textarea, an HTMLElement,
   * and checks if the combined content of the textarea and the
   * spans (selected items) is wider than the content area of
   * the parent element.
   *
   * Returns 100% -- to push textarea to a new line -- if true and
   * initial -- to keep textarea on same line -- if false.
   */
  calculateTextAreaWidth(element: HTMLElement): string {
    // Width by default should be its `initial` value
    let widthValue = 'initial';
    let containerWidth = this.getParentContentWidth(element.parentElement);
    let elementsWidths = this.getSelectedContentWidth(element);
    let enteredTextWidth = this.getInternalElementWidth(this.hiddenText.nativeElement)
    let accumulatorRow = 0;
    let spaceLeft = containerWidth;

    elementsWidths.forEach(function(element){
      accumulatorRow += element;
      if(accumulatorRow > containerWidth){ accumulatorRow = element; }
      spaceLeft = ((containerWidth - accumulatorRow) - enteredTextWidth);
    });

    // If there is 40px left move to the next line
    widthValue = spaceLeft - 40 > 0 ? spaceLeft+'px' : '100%';

    return widthValue;
  }

  /**
   * Gets the width of the selected items displayed in
   * the content area of the sam-autocomplete-multiselect.
   * The width in this case includes the entire box model:
   * margin, border, padding, content.
   *
   * Returns a float of the width
   */
  getSelectedContentWidth(element: HTMLElement): Array<number> {
    const elementChildren = element.parentElement.children;

    let width = 0;
    let elementsWidths = [];
    // Cannot use forEach here since children is not a Javascript array
    // and its data structure does not provide forEach on its
    // prototype.
    for (let i = 0; i < elementChildren.length; i++) {
      if (elementChildren[i] !== element && !elementChildren[i].classList.contains('usa-sr-only')) {
        const childStyles = window.getComputedStyle(elementChildren[i]);
        let childWidth = parseFloat(childStyles.width);
        elementsWidths.push(( childWidth +
                   parseFloat(childStyles["margin-right"]) +
                   parseFloat(childStyles["margin-left"]) ))
      }
    }
    return elementsWidths;
  }

  /**
   * Takes an HTMLElement and returns the width of the content only.
   *
   * Returns the width as a float.
   */
  getParentContentWidth(element: HTMLElement): number {
    const styles = window.getComputedStyle(element);
    let width = parseFloat(styles.width);

    if (styles['box-sizing'] === 'border-box') {
      width -= ( parseFloat(styles['border-left-width']) +
                 parseFloat(styles['padding-left']) +
                 parseFloat(styles['padding-right']) +
                 parseFloat(styles['border-right-width']) );
    }

    return width;
  }

  /**
   * Takes an HTMLElement and calculates the internal width (content + padding)
   * Returns the width as a float
   */
  getInternalElementWidth(element: HTMLElement): number {
    const styles = window.getComputedStyle(element);
    let width = parseFloat(styles.width);

    /**
     * If the box-sizing is set to border-box, the width includes
     * everything in the box model except margins. This method
     * specifically needs to have the border removed from the
     * calculation.
     */
    if (styles['box-sizing'] === 'border-box') {
      width -= ( parseFloat(styles['border-left-width']) +
                 parseFloat(styles['border-right-width']) );
    }

    return width;
  }

  /***************************************************************
   * Logic for filtering options                                 *
   ***************************************************************/
  fetchFromService(searchString, options, context) {

    return context.service.fetch(searchString, context.cachingService.hasReachedScrollEnd(), options)
        .subscribe(
          (data) => {
            context.list = context.handleEmptyList(context.sortByCategory(data));
            context.cachingService.updateResults(context.list);
          },
          (err) => {
            const errorObject = {
              cannotBeSelected: true
            }
            errorObject[context.keyValueConfig.valueProperty] = 'An error occurred.';
            errorObject[context.keyValueConfig.subheadProperty] = 'Please try again.';
            context.list = context.handleEmptyList(context.sortByCategory([errorObject]));
            context.cachingService.updateResults([]);
            return [errorObject];
          }
        );
  }
  /**
   * Filters `options` by returning items in array that include the
   * search term as a substring of the objects key or value
   */
  filterOptions(searchString: string) {
    if(searchString=="" && this.innerValue.length>0){
      return;
    }
    const availableCategories = [];
    // Checks if searchString is empty
    // If so, use defaultSearchString
    // If value is unset, defaultSearchString
    // is initialized to empty string
    if (searchString === '') {
      searchString = this.defaultSearchString;
    }
    // Sets strig to lowercase for case-insensitive
    // matching in filter function.
    searchString = searchString ? searchString.toLowerCase() : '';

    let options = null;
    if (this.serviceOptions) {
      options = this.serviceOptions || null;
    }
    if (this.service && this.options.length === 0) {
      this.cachingService.updateSearchString(searchString);
      if (this.cachingService.shouldUseCachedResults()) {
        return;
      } else {
        window.clearTimeout(this.inputTimer);
        this.inputTimer = window.setTimeout(this.fetchFromService, 250, searchString, options, this);
        return;

      }
    } else {
      this.list = this.options.filter((option) => {
        if (this.categoryIsSelectable) {
          if (option[this.keyValueConfig.categoryProperty] &&
              option[this.keyValueConfig.categoryProperty].toLowerCase().includes(searchString) &&
              availableCategories.indexOf(option[this.keyValueConfig.categoryProperty]) === -1
              ) {
            availableCategories.push(option[this.keyValueConfig.categoryProperty]);
          }
        }
        if ( option[this.keyValueConfig.keyProperty].toLowerCase().includes(searchString) ||
              option[this.keyValueConfig.valueProperty].toLowerCase().includes(searchString) ) {
          return option;
        }
      });
      this.list = this.sortByCategory(this.list);
      if (this.categoryIsSelectable) {
        availableCategories.forEach((category) => {
          if (this.list.categories.indexOf(category) === -1) {
            this.list.categories.push(category);
          }
        });
      }
      this.list = this.handleEmptyList(this.list);
    }

    return this.list;
  }

  /**
   * Procedure to check this.list for categories
   * and sort data by category
   */
  sortByCategory(results: Array<any>): Array<any> {
    /**
     * Initializes a data structure to sort data by categories.
     * Object works like an associative array with additional
     * properties to support the ui layer and component logic.
     *
     * Each category is stored in the categories array property
     * and is given a corresponding property number to match
     * its position in the categories array.
     *
     * totalItems is a method that counts the total number of
     * items in each category in lieu of a length property
     * for the entire data structure.
     */
    const initialObject = {
      0: [],
      categories: ['uncategorized'],
      totalItems: function(this) {
        let totalItems = 0;
        this.categories.forEach((category, index) => {
          if (this[index]) {
            totalItems = totalItems + this[index].length;
          }
        }, this);
        return totalItems;
      }
    };

    return results.reduce((prev, curr) => {
      const category = this.keyValueConfig.categoryProperty;
      if (curr[category]) {
        const categoryIndex = prev.categories.indexOf(curr[category]);
        if (categoryIndex !== -1) {
          prev[categoryIndex].push(curr);
        } else {
          const newLength = prev.categories.push(curr[category]);
          prev[newLength - 1] = [curr];
          prev[newLength - 1].category = curr[category];
        }
      } else {
        prev[0].push(curr);
      }
      return prev;
    }, initialObject);

  }

  /**
   * Checks if array is empty. If so, returns an array with no key
   * and value 'No results found'.
   */
  handleEmptyList(object: any): any[] {
    if (object.categories.length === 1 && object[0].length === 0) {
      const noResultsObject = {
        cannotBeSelected: true
      };
      noResultsObject[this.keyValueConfig.keyProperty] = null;
      noResultsObject[this.keyValueConfig.valueProperty] = 'No results found';
      object[0].push(noResultsObject);
    };

    return object;
  }

  getFirstFilteredItem(array) {
    if (array.length > 0 && !array[0].cannotBeSelected) {
      return array[0];
    } else {
      return undefined;
    }
  }

  displayList(): boolean {
    if (this.list && this.list.categories) {
      if (this.list.categories.length > 1) {
        return true;
      } else if (this.list.categories.length === 1 && (this.list[0] && this.list[0].length > 0)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  displaySublist(category: string, categoryIndex: number) {
    if (this.categoryIsSelectable) {
      return true;
    } else {
      return this.list[categoryIndex].length > 0;
    }
  }

  /***************************************************************
   * Logic for selecting/deselecting options                     *
   ***************************************************************/

  /**
   * Procedure to add an item to list of selected items
   */
  selectItem(item): void {
    if (item && !item.cannotBeSelected) {
      const tmpArray = this.value.slice();
      const filteredItems = this.value.filter((selectedItem) => {
        if (selectedItem[this.keyValueConfig.keyProperty] === item[this.keyValueConfig.keyProperty]) {
          return item;
        }
      })
      if (filteredItems.length === 0) {
        tmpArray.push(item);
        this.value = tmpArray;
      }
    }
    this.list = [];
    this.focusTextArea();
    this.updateMarked();
  }

  selectItemByCategory(category: string): void {
    if (category && this.categoryIsSelectable) {
      const categoryObject = this.categories.filter((item) => {
        if (item[this.keyValueConfig.parentCategoryProperty] === category) {
          return item;
        }
      })[0];

      this.selectItem(categoryObject);
    }
    this.list = [];
  }

  /**
   * Procedure to remove an item from list of selected items
   */
  deselectItem(selectedItem): void {
    this.value = this.value.filter((item) => {
      if (item !== selectedItem) {
        return item;
      }
    });
    this.focusTextArea();
    this.updateMarked();
  }

  deselectItemOnEnter(event, selectedItem): void {
    if (event.code === 'Enter' || event.keyIdentified === 'Enter') {
      this.value = this.value.filter((item) => {
        if (item !== selectedItem) {
          return item;
        }
      });
      this.focusTextArea();
      this.updateMarked();
      event.preventDefault();
    }
  }

  /**
   * Procedure to remove all selected items
   */
  deselectAll() {
    this.value = [];
    this.updateMarked();
  }

  clearSearch() {
    this.searchText = "";
  }

  focusTextArea() {
    this.textArea.nativeElement.focus();
  }

  blurTextArea() {
    this.textArea.nativeElement.blur();
  }

  checkForFocus(event) {
    this.clearSearch();
    this.list=[];
  }

  updateMarked(){
    if(this.service){
      return;
    }
    for(let key in this.options){
      let x = this.value.find((obj)=>{
        return obj[this.keyValueConfig.keyProperty] == this.options[key][this.keyValueConfig.keyProperty];
      });
      if(x){
        this.options[key]._marked = true;
      } else {
        this.options[key]._marked = false;
      }
    }
  }

  /***************************************************************
   * Implementation of ControlValueAccessor Methods              *
   ***************************************************************/

  writeValue(value: any) {
    if(!value){
      value = [];
    }
    this.innerValue = value;
    this.updateMarked();
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

}

export interface KeyValueConfig {
  keyProperty: string;
  valueProperty: string;
  subheadProperty?: string;
  categoryProperty?: string;
  parentCategoryProperty?: string;
}
