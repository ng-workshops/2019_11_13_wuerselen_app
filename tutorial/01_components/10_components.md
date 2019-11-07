# 10 Dynamic Modal

> ng generate component shared/modal --module shared

> touch src/app/shared/modal/modal.model.ts

## src/app/shared/modal/modal.model.ts

```ts
type ModalTypes = 'basic' | 'warn' | 'primary';

export interface ModalData {
  title: string;
  message: string;
  type?: ModalTypes;
}
```

## src/app/shared/modal/modal.component.html

```html
<div class="closable backdrop" (click)="close.emit()"></div>

<div class="closable modal-dialog">
  <mat-card>
    <mat-card-title>{{ modal.title }}</mat-card-title>
    <mat-card-content>{{ modal.message }}</mat-card-content>
    <mat-card-content class="footer">
      <button (click)="cancel.emit()" mat-raised-button color="basic">
        no
      </button>
      <button (click)="close.emit()" mat-raised-button [color]="modal.type">
        yes
      </button>
    </mat-card-content>
  </mat-card>
</div>
```

## src/app/shared/modal/modal.component.ts

```ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalData } from './modal.model';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input()
  modal: ModalData;

  @Output()
  close = new EventEmitter();

  @Output()
  cancel = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
```

> ng generate service shared/modal/modal

## src/app/shared/modal/modal.service.ts

```ts
import {
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef
} from '@angular/core';

import { ModalComponent } from './modal.component';
import { ModalData } from './modal.model';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  open(data: ModalData, host: ViewContainerRef): ModalComponent {
    data.type = data.type || 'primary';
    return this.createModal(data, host);
  }

  private createModal(data: ModalData, host: ViewContainerRef): ModalComponent {
    host.clear();

    const modalFactory = this.componentFactoryResolver.resolveComponentFactory(
      ModalComponent
    );
    const modal = host.createComponent(modalFactory);

    modal.instance.modal = data;
    modal.instance.close.subscribe(() => modal.destroy());
    modal.instance.cancel.subscribe(() => modal.destroy());

    return modal.instance;
  }
}
```

## src/app/shared/module.ts

Add MatCardModule, MatButtonModule to imports

```ts
imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonModule
  ],
```

Add ModalComponent in entry components
`entryComponents: [ModalComponent]`

## src/app/home/home.component.html

```html
<button (click)="openModal()">Open modal</button>
```

## src/app/home/home.component.ts

```ts
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { InfoBoxComponent } from './info-box/info-box.component';
import { MessageService } from './message.service';
import { ModalService } from '../shared/modal/modal.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  message = 'INIT';
  name = 'START_';
  reply = '';

  @ViewChild('child', { static: false })
  private child: InfoBoxComponent;

  constructor(
    private messageService: MessageService,
    private hostElement: ViewContainerRef,
    private modal: ModalService
  ) {}

  changeChild() {
    this.message = new Date().toISOString();
    this.name += 'X';
  }

  processReply(event) {
    this.reply = event;
  }

  processReplyFromCode() {
    this.child.reply('Send from parent via CODE');
  }

  sendMessage() {
    this.messageService.sendMessage('Send from parent via service');
  }

  openModal() {
    const modal = this.modal.open(
      { message: this.name, title: 'My name is', type: 'primary' },
      this.hostElement
    );

    modal.close.subscribe(() => {
      console.log('MODAL closed');
    });

    modal.cancel.subscribe(() => {
      console.log('MODAL cancelled');
    });
  }
}
```
