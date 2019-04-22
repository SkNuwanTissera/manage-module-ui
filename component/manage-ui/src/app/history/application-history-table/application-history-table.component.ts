import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
    AppHistory,
    ApplicationHistory,
    ApprovalHistoryFilter, SubscriptionHistoryFilter,
    SubscriptionsHistory
} from '../../commons/models/reporing-data-models';
import {Router} from '@angular/router';
import {ReportingRemoteDataService} from "../../data-providers/reporting-remote-data.service";
import {AuthenticationService} from "../../commons/services/authentication.service";


@Component({
    selector: 'app-history-table',
    templateUrl: './application-history-table.component.html',
    styleUrls: ['./application-history-table.component.scss']
})
export class ApplicationHistoryTableComponent implements OnInit {

    @Input()
    private tableHeader: string;

    @Input()
    private dataSource: AppHistory[];

    @Input
    private subscriptionDataSource : SubscriptionsHistory[];

    @Input()
    private filter: ApprovalHistoryFilter;

    @Input()
    private subsFilter: SubscriptionHistoryFilter;

    @Output()
    private applicationDetail: ApplicationHistory;

    @Output()
    private onFilterChange: EventEmitter<ApprovalHistoryFilter> = new EventEmitter();

    @Output()
    private onSubsFilterChange: EventEmitter<SubscriptionHistoryFilter> = new EventEmitter();

    private operatorApprovals: ApplicationHistory[];
    private subscriptions: ApplicationHistory[];
    private depType : string = "internal_gateway_type2";

    private isFilterVisible: boolean;
    private isSubFilterVisible: boolean;
    private filterString: string;
    private filterSubString: string;
    private showApprovedOn: string;
    public name:string;
    private loggedUser:any;
    private subViewPermission: boolean;


    constructor(private router: Router,private reportingService: ReportingRemoteDataService, private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.subscriptionDataSource = [];
        this.subViewPermission = null;
        this.dataSource = [];
        this.applicationDetail = null;
        this.operatorApprovals = [];
        this.subscriptions = [];
        this.isFilterVisible = true;
        this.isSubFilterVisible = true;
        this.filterString = '';
        this.filterSubString = '';
        this.showApprovedOn = 'workFlowHistory:showApprovedOn';
        this.name = 'test';

        this.reportingService.getDeploymentType().then((result)=>{
            this.depType = result.depType;
        }).catch((err)=> {
            console.log(err);
        });

        // this.reportingService.getSubscriptionHistory().then((result)=>{
        //     this.subscriptionDataSource = result;
        //     console.log(this.subscriptionDataSource);
        // }).catch((err)=> {
        //     console.log(err);
        // });

        if (this.authService.hasPermissions('subscription:visible')){
            console.log(this.authService.hasPermissions('subscription:visible'));
            this.subViewPermission = true;
        }

    }

    onNavApplication(id: number) {
        this.router.navigateByUrl('/history/application/' + id+'/'+ this.name);
    }

    onFilterItemAdded() {
        let stringValue = this.filterString.replace(/\s/g, '');
        this.filter.filterString = stringValue;
        this.onFilterChange.emit(this.filter);
    }

    onClear() {
        this.filterString = '';
        this.filter.filterString = this.filterString;
        this.onFilterChange.emit(this.filter);
    }

    onSubFilterItemAdded() {
        let stringV = this.filterSubString.replace(/\s/g, '');
        this.subsFilter.filterString = stringV;
        this.onSubsFilterChange.emit(this.subsFilter);
    }

    onSubsClear() {
        this.filterSubString = '';
        this.subsFilter.filterString = this.filterString;
        this.onSubsFilterChange.emit(this.subsFilter);
    }
}
