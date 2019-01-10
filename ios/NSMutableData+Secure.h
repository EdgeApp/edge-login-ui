//
//  NSMutableData+Secure.h
//  Airbitz
//
//  Created by Paul Puey on 2015-08-31.
//  Copyright (c) 2015 Airbitz. All rights reserved.
//


#import <Foundation/Foundation.h>

CF_IMPLICIT_BRIDGING_ENABLED
CFAllocatorRef SecureAllocator();
CF_IMPLICIT_BRIDGING_DISABLED

@interface NSMutableData (Secure)

+ (NSMutableData *)secureData;
+ (NSMutableData *)secureDataWithLength:(NSUInteger)length;
+ (NSMutableData *)secureDataWithCapacity:(NSUInteger)capacity;
+ (NSMutableData *)secureDataWithData:(NSData *)data;
@end
