import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
    AppHistory,
    ApplicationHistory,
    ApprovalHistoryFilter,
    SubscriptionsHistory
} from '../../commons/models/reporing-data-models';
import {Router} from '@angular/router';
import {ReportingRemoteDataService} from "../../data-providers/reporting-remote-data.service";
import {AuthenticationService} from "../../commons/services/authentication.service";
import {Pipe, PipeTransform} from '@angular/core';


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

    @Input()
    private filter: ApprovalHistoryFilter;

    @Input()
    private subsFilter: ApprovalHistoryFilter;

    @Output()
    private applicationDetail: ApplicationHistory;

    @Output()
    private onFilterChange: EventEmitter<ApprovalHistoryFilter> = new EventEmitter();

    @Output()
    private onSubsFilterChange: EventEmitter<ApprovalHistoryFilter> = new EventEmitter();

    private operatorApprovals: ApplicationHistory[];
    private subscriptions: ApplicationHistory[];
    private depType : string = "internal_gateway_type2";
    private subscriptionDataSource : SubscriptionsHistory[];

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

        this.reportingService.getSubscriptionHistory().then((result)=>{
            this.subscriptionDataSource = result;
            console.log(this.subscriptionDataSource);
        }).catch((err)=> {
            console.log(err);
        });

        // this.loggedUser = this.authService.loginUserInfo.getValue();
        // this.subViewPermission = this.loggedUser.permissions.subscription.visible;

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

}

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    public transform(value, keys: string, term: string) {

        if (!term) return value;
        return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

    }
}
