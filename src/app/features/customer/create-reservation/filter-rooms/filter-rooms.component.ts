import { Component,inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CITIES } from '../../../../core/master-data';
import { ICity } from '../../../../models/city.model';
import { IFilterRooms } from '../../../../models/filter-rooms';


@Component({
  selector: 'app-filter-rooms',
  templateUrl: './filter-rooms.component.html',
})
export class FilterRoomsComponent implements OnInit {

  @Output() filterChanged: EventEmitter<IFilterRooms> = new EventEmitter<IFilterRooms>();
  @Output() filterCleaned: EventEmitter<boolean> = new EventEmitter<boolean>();
  roomCities: ICity[] = [...CITIES];
  filterForm!: FormGroup;
  filterActive = false;
  minDate = new Date();
  private _formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this._createFilterForm();
  }

  onSubmit(): void {
    if (this.filterForm.invalid) {
      this.filterForm.markAllAsTouched();
      return;
    }
    const filterData: IFilterRooms = {...this.filterForm.value}
    this.filterChanged.emit(filterData);
  }

  clearFormFilter(): void {
    this._createFilterForm();
    this.filterCleaned.emit(true);
  }


  private _createFilterForm(): void {
    this.filterForm = this._formBuilder.group({
      dateStart: [null, Validators.required],
      dateEnd: [null, Validators.required],
      countGuest: [null, [Validators.required, Validators.min(1)]],
      ubicationIds: [[], Validators.required]
    });
  }

}