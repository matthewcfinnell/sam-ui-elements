import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs/Subject';
import { AbstractControl }    from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable()
export class SamFormService {
    public formEvents = new Subject<Object>();
    public formEventsUpdated$: Observable<any> = this.formEvents.asObservable();

    public fireSubmit(rootAbstractControl: AbstractControl = undefined) {
        this.formEvents.next({root: rootAbstractControl, eventType: 'submit'});
    }
    public fireReset(rootAbstractControl: AbstractControl = undefined) {
        this.formEvents.next({root: rootAbstractControl, eventType: 'reset'});
    }
}
