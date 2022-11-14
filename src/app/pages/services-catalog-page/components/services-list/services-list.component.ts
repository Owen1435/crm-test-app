import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ServiceDto} from "../../models/service.dto";
import {
  CREATE_SERVICE_REQUEST,
  EDIT_SERVICE_REQUEST,
  SEARCH_SERVICES_REQUEST,
  SET_SELECTED_SERVICE
} from "../../state-management/service-catalog-page.actions";
import {Store} from "@ngrx/store";
import {BehaviorSubject, debounceTime, distinctUntilChanged, Subscription, tap} from 'rxjs';
import {Router} from "@angular/router";
import {MatDialog} from '@angular/material/dialog';
import {AddEditServiceModal, AddEditServiceModalComponent } from '../add-edit-service-modal/add-edit-service-modal.component';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit, OnDestroy {
  @Input()
  services: ServiceDto[] = [];

  @Input()
  selectedService: ServiceDto | undefined;

  private searchSubject = new BehaviorSubject<string>('');
  private searchSubscription?: Subscription;

  constructor(private readonly store: Store,
              private readonly router: Router,
              private readonly matDialog: MatDialog,
  ) {
  }

  public ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((term) => this.store.dispatch(new SEARCH_SERVICES_REQUEST({term})))
      )
      .subscribe();
  }

  selectService(service: ServiceDto) {
    this.store.dispatch(new SET_SELECTED_SERVICE({service}))
    this.router.navigate(['services', service.id])
  }

  openAddServiceModal() {
    const addService = (title: string) => {
      this.store.dispatch(new CREATE_SERVICE_REQUEST({title}))
    }

    this.matDialog.open(AddEditServiceModalComponent, {
      data: {mode: 'add', saveFunction: addService, serviceName: ''} as AddEditServiceModal,
      autoFocus: false
    });
  }

  openEditServiceModal(service: ServiceDto) {
    const editService = (title: string) => {
      this.selectedService && this.store.dispatch(new EDIT_SERVICE_REQUEST({id: service.id, title}))
    }

    this.matDialog.open(AddEditServiceModalComponent, {
      data: {mode: 'edit', saveFunction: editService, serviceName: service.title} as AddEditServiceModal,
      autoFocus: false
    });
  }

  onSearch(event: any) {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  public ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
  }
}
