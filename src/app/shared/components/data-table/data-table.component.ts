import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {CRUDOps} from "./crud-ops";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent<T> implements OnInit {
  @Input() headers: string[];
  @Input() keys: string[];
  @Input() items: Observable<T[]>;

  private selectedItem: T;

  @Output() selected: EventEmitter<T> = new EventEmitter();

  ngOnInit(): void {

  }

  onSelect(item: T) {
    this.selectedItem = item;
    this.selected.emit(item);
  }

  isSelected() {
    return this.selectedItem;
  }

}
