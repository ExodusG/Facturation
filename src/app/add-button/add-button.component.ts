import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Groupe} from "../models/groupe.model";

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnChanges{
  @Output() addType =new EventEmitter<string>();
  @Input() showMe: boolean=false;
  show:boolean=false;
  sendLignes(){
    this.addType.emit("ligne");
  }

  sendSubGroup(){
    this.addType.emit("groupe");
  }

  ngOnChanges(): void {
    this.show=this.showMe;
    console.log(this.show);
  }


}
