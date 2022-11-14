import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { WidgetComponent } from './widget/widget.component';
import { MapComponent } from './map/map.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatTableModule} from "@angular/material/table";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {OrderStatusComponent} from "./order-status/order-status.component";

export const MATERIAL_MODULES = [
  MatIconModule,
  MatInputModule,
  MatDividerModule,
  MatButtonModule,
  MatExpansionModule,
  MatMenuModule,
  MatTableModule,
  MatButtonToggleModule,
  MatSliderModule,
];

const components = [
  WidgetComponent,
  MapComponent,
  SidebarComponent,
  OrderStatusComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...MATERIAL_MODULES,
    CommonModule,
  ],
  providers: [],
  exports: [
    components,
  ]
})
export class CoreModule { }
