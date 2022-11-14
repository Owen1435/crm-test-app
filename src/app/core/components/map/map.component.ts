import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Input()
  width: number = 100;
  @Input()
  height: number = 100;
}
