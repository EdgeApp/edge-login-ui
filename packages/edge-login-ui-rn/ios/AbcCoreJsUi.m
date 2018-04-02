
#import "AbcCoreJsUi.h"
#import "AbcKeychain.h"
#import <LocalAuthentication/LocalAuthentication.h>

@implementation AbcCoreJsUi

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(supportsTouchId, supportsTouchId:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    BOOL supports = [AbcKeychain bHasSecureEnclave];
    NSNumber *num = [NSNumber numberWithInteger:(NSInteger)supports];
    resolve(num);
}

RCT_REMAP_METHOD(getKeychainInt, getKeychainInt:(NSString *)key
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSInteger value = [AbcKeychain getKeychainInt:key error:nil];
    NSNumber *num = [NSNumber numberWithInteger:value];
    resolve(num);
}

RCT_REMAP_METHOD(getKeychainString, getKeychainString:(NSString *)key
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *value = [AbcKeychain getKeychainString:key error:nil];
    resolve(value);
}

RCT_REMAP_METHOD(setKeychainInt, setKeychainInt:(NSInteger) i
                 key:(NSString *)key
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    [AbcKeychain setKeychainInt:i key:key authenticated:YES];
    resolve(nil);
}

RCT_REMAP_METHOD(setKeychainString, setKeychainString:(NSString *) value
                 key:(NSString *)key
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    [AbcKeychain setKeychainString:value key:key authenticated:YES];
    resolve(nil);
}

RCT_REMAP_METHOD(clearKeychain, clearKeychain:(NSString *)key
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    [AbcKeychain setKeychainData:nil key:key authenticated:YES];
    resolve(nil);
}

RCT_REMAP_METHOD(authenticateTouchID, authenticateTouchID:(NSString *) promptString
                 fallbackString:(NSString *)fallbackString
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    [AbcKeychain authenticateTouchID:promptString
                      fallbackString:fallbackString
                            complete:^(BOOL didAuthenticate) {
                                NSNumber *num = [NSNumber numberWithInteger:(NSInteger)didAuthenticate];
                                resolve(num);
                            }];
}
@end
