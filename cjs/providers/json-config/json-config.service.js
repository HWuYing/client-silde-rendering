"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonConfigService = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var shared_1 = require("@fm/shared");
var lodash_1 = require("lodash");
var rxjs_1 = require("rxjs");
var json_intercept_1 = require("./json-intercept");
var JsonConfigService = /** @class */ (function (_super) {
    tslib_1.__extends(JsonConfigService, _super);
    function JsonConfigService(injector, http) {
        var _this = _super.call(this, injector) || this;
        _this.injector = injector;
        _this.http = http;
        _this.cache = new Map();
        return _this;
    }
    JsonConfigService.prototype.getJsonConfig = function (url) {
        url = /http|https/.test(url) ? url : url.replace(/\/+/g, '/');
        var subject = this.cache.get(url);
        if (!subject) {
            subject = this.http.get(url, { requestType: json_intercept_1.JSON_TYPE }).pipe((0, rxjs_1.shareReplay)(1), (0, rxjs_1.map)(lodash_1.cloneDeep));
            this.cache.set(url, subject);
        }
        return subject;
    };
    JsonConfigService = tslib_1.__decorate([
        (0, di_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [di_1.Injector, shared_1.HttpClient])
    ], JsonConfigService);
    return JsonConfigService;
}(shared_1.JsonConfigService));
exports.JsonConfigService = JsonConfigService;
