//
// ABCKeychain+Internal.h
//
// Created by Paul P on 2016/02/09.
// Copyright (c) 2016 Airbitz. All rights reserved.
//

#define SEC_ATTR_SERVICE        @"co.airbitz.airbitz"


@interface AbcKeychain : NSObject 

+ (BOOL) setKeychainData:(NSData *)data key:(NSString *)key authenticated:(BOOL) authenticated;
+ (NSData *) getKeychainData:(NSString *)key error:(NSError **)error;
+ (BOOL) setKeychainString:(NSString *)s key:(NSString *)key authenticated:(BOOL) authenticated;
+ (BOOL) setKeychainInt:(int64_t) i key:(NSString *)key authenticated:(BOOL) authenticated;
+ (int64_t) getKeychainInt:(NSString *)key error:(NSError **)error;
+ (NSString *) getKeychainString:(NSString *)key error:(NSError **)error;
+ (NSString *) createKeyWithUsername:(NSString *)username key:(NSString *)key;
+ (BOOL) bHasSecureEnclave;
+ (void)authenticateTouchID:(NSString *)promptString fallbackString:(NSString *)fallbackString
                   complete:(void (^)(BOOL didAuthenticate)) completionHandler;
+ (void) disableRelogin:(NSString *)username;
+ (void) disableTouchID:(NSString *)username;
+ (BOOL) disableKeychain:(NSString *)username;
+ (void) clearKeychainInfo:(NSString *)username;
+ (void) updateLoginKeychainInfo:(NSString *)username
                        loginKey:(NSString *)key
                      useTouchID:(BOOL) bUseTouchID;
@end
