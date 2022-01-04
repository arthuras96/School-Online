import { EventEmitter } from '@angular/core';

export class LoaderService {
    loading = new EventEmitter<boolean>();

    isLoading(load: boolean) {
        this.loading.emit(load);
    }
}
