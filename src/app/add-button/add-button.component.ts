import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent {
  @Output() addType =new EventEmitter<string>();

  sendLignes(){
    this.addType.emit("ligne");
  }

  sendSubGroup(){
    this.addType.emit("groupe");
  }




}
