import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchPanelComponent} from './search-panel/search-panel.component';
import {SearchResultsComponent} from './search-results/search-results.component';
import {HistoryMainComponent} from './history-main/history-main.component';
import {HistoryRoutes} from "./history.routes";
import {HistoryFilterComponent} from './history-filter/history-filter.component';
import {SharedModule} from "../shared/shared.module";
import {ApplicationDetailComponent} from './application-detail/application-detail.component';
import {ApplicationHistoryTableComponent, SearchPipe} from  './application-history-table/application-history-table.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

@NgModule({
    imports: [
        CommonModule,
        HistoryRoutes,
        SharedModule,
        TooltipModule.forRoot()
    ],
    declarations: [SearchPanelComponent, SearchResultsComponent, HistoryMainComponent, ApplicationHistoryTableComponent, HistoryFilterComponent, ApplicationDetailComponent, SearchPipe]
})
export class HistoryModule {
}
