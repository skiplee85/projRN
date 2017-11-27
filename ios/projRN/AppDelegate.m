/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  // jsCodeLocation=[self getBundle];
  // if (jsCodeLocation == nil) {
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  // }

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"projRN"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

-(NSURL *) getBundle
{
  // 服务端bundle版本号的地址
  NSString *serverVersion = [self httpGet:@"http://192.168.10.85:88/version-ios.txt"];
  NSString *serverBundle = [self httpGet:@"http://192.168.10.85:88/ios.bundle"];
  NSString *pathDocuments = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
  
  NSString *versionPath = [NSString stringWithFormat:@"%@/%@", pathDocuments, @"version.txt"]; // 版本地址
  NSString *bundlePath = [NSString stringWithFormat:@"%@/%@", pathDocuments, @"main.jsbundle"]; // 包地址
  Boolean needRefresh= false;

  NSFileManager *defaultManager;
  defaultManager = [NSFileManager defaultManager];
  NSURL *nsurl=nil;
  //判断文件是否已存在
  if ([[NSFileManager defaultManager] fileExistsAtPath:versionPath]) {
    NSString* fileContents = [NSString stringWithContentsOfFile:versionPath encoding:NSUTF8StringEncoding error:nil];
    int a = [serverVersion intValue];//服务端bundle版本号
    int b = [fileContents intValue];//客户端bundle版本信息
    //如果服务端的bundle版本比较新，就删除客户端的bundle，然后更新成服务端的
    if (a > b) {
      [defaultManager removeItemAtPath:versionPath error:NULL];
      [self storeFile:@"version.txt" content:serverVersion];
      needRefresh = true;
    }
  } else {
    [self storeFile:@"version.txt" content:serverVersion];
    needRefresh = true;
  }

  // bundle不存在
  if (![[NSFileManager defaultManager] fileExistsAtPath:bundlePath]) {
    needRefresh = true;
  }

  if (needRefresh) {
    if ([[NSFileManager defaultManager] fileExistsAtPath:bundlePath]) {
      [defaultManager removeItemAtPath:bundlePath error:NULL];
    }
    NSString *fileName=[self storeFile:@"main.jsbundle" content:[self httpGet:serverBundle]];
    nsurl=[NSURL fileURLWithPath:fileName];//这是bundle 文件的路径
  }
  return nsurl;
}

-(NSString *) httpGet:(NSString *)ss
{
  //第一步，创建URL
  NSURL *url = [NSURL URLWithString:ss];
  
  //第二步，通过URL创建网络请求
  NSURLRequest *request = [[NSURLRequest alloc]initWithURL:url cachePolicy:NSURLRequestReloadIgnoringLocalAndRemoteCacheData timeoutInterval:10];
  //NSURLRequest初始化方法第一个参数：请求访问路径，第二个参数：缓存协议，第三个参数：网络请求超时时间（秒）
  /*其中缓存协议是个枚举类型包含：
   NSURLRequestUseProtocolCachePolicy（基础策略）
   NSURLRequestReloadIgnoringLocalCacheData（忽略本地缓存）
   NSURLRequestReturnCacheDataElseLoad（首先使用缓存，如果没有本地缓存，才从原地址下载）
   NSURLRequestReturnCacheDataDontLoad（使用本地缓存，从不下载，如果本地没有缓存，则请求失败，此策略多用于离线操作）
   NSURLRequestReloadIgnoringLocalAndRemoteCacheData（无视任何缓存策略，无论是本地的还是远程的，总是从原地址重新下载）
   NSURLRequestReloadRevalidatingCacheData（如果本地缓存是有效的则不下载，其他任何情况都从原地址重新下载）*/
  //第三步，连接服务器
  NSData *received = [NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
  
  NSString *str = [[NSString alloc]initWithData:received encoding:NSUTF8StringEncoding];
  return str;
}

//存储文件
-(NSString *)storeFile:(NSString *)fileName content:(NSString *)writeContent
{
  NSString *pathDocuments=[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
  
  NSString *createPath = [NSString stringWithFormat:@"%@/%@",pathDocuments,fileName];//用文件名补全路径
  NSError *ReadFileError;
  NSString *readContent;
  NSData *data;
  if (nil == writeContent) {
    return nil;
  }
  //判断文件是否已存在
  if ([[NSFileManager defaultManager] fileExistsAtPath:createPath]) {
    [[NSFileManager defaultManager] removeItemAtPath:createPath error:NULL];
  }
  data = [writeContent dataUsingEncoding:NSUTF8StringEncoding];//新文件的初始数据
  [[NSFileManager defaultManager] createFileAtPath:createPath contents:data attributes:nil];//创建文件
  return createPath;
}

@end
