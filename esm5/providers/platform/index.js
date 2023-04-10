import { ApplicationContext, createPlatformFactory, PlatformOptions } from '@fm/core/providers/platform';
import { PLATFORM } from '@fm/core/token';
import { Injector } from '@fm/di';
import { Platform } from './platform';
var isMicro = typeof microStore !== 'undefined';
var resource = typeof fetchCacheData !== 'undefined' ? fetchCacheData : [];
export var applicationContext = new ApplicationContext();
var _CORE_PLATFORM_PROVIDERS = [
    { provide: PlatformOptions, useValue: { isMicro: isMicro, resource: resource } },
    { provide: Platform, deps: [Injector, PlatformOptions] },
    { provide: PLATFORM, useExisting: Platform }
];
var DynamicPlatform = /** @class */ (function () {
    function DynamicPlatform(providers) {
        this.createPlatform = createPlatformFactory(null, _CORE_PLATFORM_PROVIDERS, providers);
    }
    DynamicPlatform.prototype.bootstrapRender = function (providers, render) {
        var _this = this;
        if (!isMicro) {
            return this.createPlatform(applicationContext).bootstrapRender(providers, render);
        }
        microStore.render = function (options) { return _this.createPlatform(applicationContext).bootstrapMicroRender(providers, render, options); };
    };
    return DynamicPlatform;
}());
export { PLATFORM_SCOPE } from '@fm/core/providers/platform';
export var dynamicPlatform = function (providers) {
    if (providers === void 0) { providers = []; }
    return new DynamicPlatform(providers);
};
applicationContext.registerStart(function () { return dynamicPlatform().bootstrapRender(applicationContext.providers); });
export var Application = applicationContext.makeApplicationDecorator();
export var Prov = applicationContext.makeProvDecorator('MethodDecorator');
export var Input = applicationContext.makePropInput('InputPropDecorator');
