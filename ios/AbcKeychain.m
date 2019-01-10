//
//  AbcKeychain.m
//  Airbitz
//
//  Created by Paul Puey on 2015-08-31.
//  Copyright (c) 2015 Airbitz. All rights reserved.
//

#import "NSMutableData+Secure.h"
#import <LocalAuthentication/LocalAuthentication.h>
#import "AbcKeychain.h"

@interface AbcKeychain ()

@end

@implementation AbcKeychain
{
    
}

#if TARGET_OS_IPHONE

+ (BOOL) setKeychainData:(NSData *)data key:(NSString *)key authenticated:(BOOL) authenticated;
{
    if (! key) return NO;
    if (![AbcKeychain bHasSecureEnclave]) return NO;
    
    id accessible = (authenticated) ? (__bridge id)kSecAttrAccessibleWhenUnlockedThisDeviceOnly :
    (__bridge id)kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly;
    NSDictionary *query = @{(__bridge id)kSecClass:(__bridge id)kSecClassGenericPassword,
                            (__bridge id)kSecAttrService:SEC_ATTR_SERVICE,
                            (__bridge id)kSecAttrAccount:key};
    
    if (SecItemCopyMatching((__bridge CFDictionaryRef)query, NULL) == errSecItemNotFound) {
        if (! data) return YES;
        
        NSDictionary *item = @{(__bridge id)kSecClass:(__bridge id)kSecClassGenericPassword,
                               (__bridge id)kSecAttrService:SEC_ATTR_SERVICE,
                               (__bridge id)kSecAttrAccount:key,
                               (__bridge id)kSecAttrAccessible:accessible,
                               (__bridge id)kSecValueData:data};
        OSStatus status = SecItemAdd((__bridge CFDictionaryRef)item, NULL);
        
        if (status == noErr) return YES;
        NSLog(@"SecItemAdd error status %d", (int)status);
        return NO;
    }
    
    if (! data) {
        OSStatus status = SecItemDelete((__bridge CFDictionaryRef)query);
        
        if (status == noErr) return YES;
        NSLog(@"SecItemDelete error status %d", (int)status);
        return NO;
    }
    
    NSDictionary *update = @{(__bridge id)kSecAttrAccessible:accessible,
                             (__bridge id)kSecValueData:data};
    OSStatus status = SecItemUpdate((__bridge CFDictionaryRef)query, (__bridge CFDictionaryRef)update);
    
    if (status == noErr) return YES;
    NSLog(@"SecItemUpdate error status %d", (int)status);
    return NO;
}

+ (NSData *) getKeychainData:(NSString *)key error:(NSError **)error;
{
    NSDictionary *query = @{(__bridge id)kSecClass:(__bridge id)kSecClassGenericPassword,
                            (__bridge id)kSecAttrService:SEC_ATTR_SERVICE,
                            (__bridge id)kSecAttrAccount:key,
                            (__bridge id)kSecReturnData:@YES};
    CFDataRef result = nil;
    OSStatus status = SecItemCopyMatching((__bridge CFDictionaryRef)query, (CFTypeRef *)&result);
    
    if (status == errSecItemNotFound) return nil;
    if (status == noErr) return CFBridgingRelease(result);
    if (error) *error = [NSError errorWithDomain:@"Airbitz" code:status
                                         userInfo:@{NSLocalizedDescriptionKey:@"SecItemCopyMatching error"}];
    return nil;
}

+ (BOOL) bHasSecureEnclave;
{
    LAContext *context = [LAContext new];
    NSError *error = nil;
    
    if ([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error])
    {
        return YES;
    }
    
    return NO;
}

// Authenticate w/touchID
+ (void)authenticateTouchID:(NSString *)promptString fallbackString:(NSString *)fallbackString
                   complete:(void (^)(BOOL didAuthenticate)) completionHandler;

{
    LAContext *context = [LAContext new];
    NSError *error = nil;
    
    if ([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error])
    {
        context.localizedFallbackTitle = fallbackString;
        
        [context evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics
                localizedReason:promptString.length > 0 ? promptString : @" "
                          reply:^(BOOL success, NSError *error)
         {
             if (success) {
                 // User authenticated successfully, take appropriate action
                 dispatch_async(dispatch_get_main_queue(), ^{
                     // write all your code here
                     completionHandler(YES);
                 });
             } else {
                 // User did not authenticate successfully, look at error and take appropriate action
                 
                 switch (error.code) {
                     case LAErrorAuthenticationFailed:
                         NSLog(@"Authentication Failed");
                         NSLog(@"[LAContext canEvaluatePolicy:] %@", error.localizedDescription);
                         break;
                         
                     case LAErrorUserCancel:
                         NSLog(@"User pressed Cancel button");
                         NSLog(@"[LAContext canEvaluatePolicy:] %@", error.localizedDescription);
                         break;
                         
                     case LAErrorUserFallback:
                         NSLog(@"User pressed \"Enter Password\"");
                         NSLog(@"[LAContext canEvaluatePolicy:] %@", error.localizedDescription);
                         break;
                         
                     default:
                         NSLog(@"Touch ID is not configured");
                         NSLog(@"[LAContext canEvaluatePolicy:] %@", error.localizedDescription);
                         break;
                 }
                 
                 NSLog(@"Authentication Fails");
                 dispatch_async(dispatch_get_main_queue(), ^{
                     // write all your code here
                     completionHandler(NO);
                 });
             }
         }];
    }
    else
    {
        completionHandler(NO);
    }
}

#else
+ (BOOL) setKeychainData:(NSData *)data key:(NSString *)key authenticated:(BOOL) authenticated;
{ return NO; }
+ (NSData *) getKeychainData:(NSString *)key error:(NSError **)error;
{ return nil; }
+ (BOOL) bHasSecureEnclave;
{ return NO; }
+ (void)authenticateTouchID:(NSString *)promptString fallbackString:(NSString *)fallbackString;
{ return; }

#endif

+ (NSString *) createKeyWithUsername:(NSString *)username key:(NSString *)key;
{
    return [NSString stringWithFormat:@"%@___%@",username,key];
}

+ (BOOL) setKeychainString:(NSString *)s key:(NSString *)key authenticated:(BOOL) authenticated;
{
    @autoreleasepool {
        NSData *d = (s) ? CFBridgingRelease(CFStringCreateExternalRepresentation(SecureAllocator(), (CFStringRef)s,
                                                                                 kCFStringEncodingUTF8, 0)) : nil;
        
        return [AbcKeychain setKeychainData:d key:key authenticated:authenticated];
    }
}

+ (NSString *) getKeychainString:(NSString *)key error:(NSError **)error;
{
    @autoreleasepool {
        NSData *d = [AbcKeychain getKeychainData:key error:error];
        
        return (d) ? CFBridgingRelease(CFStringCreateFromExternalRepresentation(SecureAllocator(), (CFDataRef)d,
                                                                                kCFStringEncodingUTF8)) : nil;
    }
}

+ (BOOL) setKeychainInt:(int64_t) i key:(NSString *)key authenticated:(BOOL) authenticated;
{
    @autoreleasepool {
        NSMutableData *d = [NSMutableData secureDataWithLength:sizeof(int64_t)];
        
        *(int64_t *)d.mutableBytes = i;
        return [AbcKeychain setKeychainData:d key:key authenticated:authenticated];
    }
}

+ (int64_t) getKeychainInt:(NSString *)key error:(NSError **)error;
{
    @autoreleasepool {
        NSData *d = [AbcKeychain getKeychainData:key error:error];
        
        return (d.length == sizeof(int64_t)) ? *(int64_t *)d.bytes : 0;
    }
}


//+ (void) disableRelogin:(NSString *)username;
//{
//    [AbcKeychain setKeychainData:nil
//                      key:[AbcKeychain createKeyWithUsername:username key:RELOGIN_KEY]
//            authenticated:YES];
//}
//
//+ (void) disableTouchID:(NSString *)username;
//{
//    [AbcKeychain setKeychainData:nil
//                      key:[AbcKeychain createKeyWithUsername:username key:USE_TOUCHID_KEY]
//            authenticated:YES];
//}
//
//+ (void) clearKeychainInfo:(NSString *)username;
//{
//    [AbcKeychain setKeychainData:nil
//                      key:[AbcKeychain createKeyWithUsername:username key:PASSWORD_KEY]
//            authenticated:YES];
//    [AbcKeychain setKeychainData:nil
//                      key:[AbcKeychain createKeyWithUsername:username key:RELOGIN_KEY]
//            authenticated:YES];
//    [AbcKeychain setKeychainData:nil
//                      key:[AbcKeychain createKeyWithUsername:username key:USE_TOUCHID_KEY]
//            authenticated:YES];
//}
//
//+ (BOOL) disableKeychain:(NSString *)username;
//{
//    BOOL disableFingerprint = NO;
//    if (![AbcKeychain bHasSecureEnclave])
//        return YES;
//    
////    if ([self.localSettings.touchIDUsersDisabled indexOfObject:username] != NSNotFound)
//        disableFingerprint = YES;
//    
//    [AbcKeychain setKeychainInt:disableFingerprint ? 0 : 1
//                     key:[AbcKeychain createKeyWithUsername:username key:USE_TOUCHID_KEY]
//           authenticated:YES];
//    
//    if (disableFingerprint)
//    {
//        // If user has disabled TouchID, then do not use ABCKeychain at all for maximum security
//        [AbcKeychain clearKeychainInfo:username];
//        return YES;
//    }
//    
//    return NO;
//}

//+ (void) updateLoginKeychainInfo:(NSString *)username
//                        loginKey:(NSString *)loginKey
//                      useTouchID:(BOOL) bUseTouchID;
//{
//    dispatch_async(dispatch_get_main_queue(), ^(void) {
////        if ([AbcKeychain disableKeychainBasedOnSettings:username])
////            return;
//        
//        [AbcKeychain setKeychainInt:1
//                         key:[AbcKeychain createKeyWithUsername:username key:RELOGIN_KEY]
//               authenticated:YES];
//        [AbcKeychain setKeychainInt:bUseTouchID
//                         key:[AbcKeychain createKeyWithUsername:username key:USE_TOUCHID_KEY]
//               authenticated:YES];
//        if (loginKey != nil)
//        {
//            [AbcKeychain setKeychainString:loginKey
//                                key:[AbcKeychain createKeyWithUsername:username key:LOGINKEY_KEY]
//                      authenticated:YES];
//        }
//    });
//}

@end

