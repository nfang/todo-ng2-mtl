import { provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app.component';
import {
  IN_MEMORY_TASK_SERVICE_PROVIDERS,
  LOCAL_STORAGE_TASK_SERVICE_PROVIDERS
} from './shared/services';
import { HistoryService } from './shared/history.service';

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  LOCAL_STORAGE_TASK_SERVICE_PROVIDERS,
  HistoryService
]);
