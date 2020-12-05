import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  template: `<app-main></app-main>`,
})
export class AppComponent {
  constructor(
    private readonly swUpdate: SwUpdate,
  ) {
    this.setupUpdates();
  }

  setupUpdates() {
    this.swUpdate.available.subscribe(update => {
      this.swUpdate.activateUpdate().then(event => {
        console.log('Application has been updated. New version will be available after reloading the page.');
      });
    });

    this.swUpdate.checkForUpdate();
  }

}
