import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner-full',
  template: `
    <div
      class="loader-overlay d-flex justify-content-center align-items-center"
    >
      <div
        class="spinner-border text-primary"
        role="status"
        style="width: 3rem; height: 3rem;"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
  styleUrls: ['./spinner-full.component.scss'],
})
export class SpinnerFullComponent {}
