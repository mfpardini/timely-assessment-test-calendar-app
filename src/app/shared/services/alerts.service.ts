import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertsService {
  showError(message: string, options?: SweetAlertOptions) {
    Swal.fire({
      showConfirmButton: false,
      timer: 3000,
      icon: 'error',
      text: message,
      ...options,
    });
  }

  showErrorToast(message: string, options?: SweetAlertOptions) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      ...options,
    });
    Toast.fire({
      icon: 'error',
      title: message,
    });
  }

  showSuccess(message: string = 'Success', options?: SweetAlertOptions) {
    Swal.fire({
      showConfirmButton: false,
      timer: 3000,
      icon: 'success',
      text: message,
      ...options,
    });
  }
  showSuccessToast(message: string = 'Success', options?: SweetAlertOptions) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      ...options,
    });
    Toast.fire({
      icon: 'success',
      title: message,
    });
  }
}
