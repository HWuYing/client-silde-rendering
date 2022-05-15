import { Observable } from '@fm/import-rxjs';
import { JsonConfigService as SharedJsonConfigService } from '@fm/shared/providers/json-config';
import { AppContextService } from '../app-context';
export declare class JsonConfigService extends SharedJsonConfigService {
    appContext: AppContextService;
    private http;
    protected getServerFetchData(url: string): Observable<object>;
}
