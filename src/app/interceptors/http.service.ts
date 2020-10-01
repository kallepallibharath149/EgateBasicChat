import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { catchError } from 'rxjs/operators/catchError';
import * as uuid from 'uuid';
import * as moment from 'moment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseURL = 'http://3.230.104.70:8888/api/';
  private impersonateUser = '';
  private uniqueID = uuid.v4();
  private servicePath = 'webService';
  private prodSettings: any = {
    'Content-Type': 'application/json',
    'context-uuid': this.uniqueID.replace(/-/gi, ''),
    'source-name': 'Unified-Portal',
    'role': 'Customer',
    'sourceSystem': 'DNM2.0'
  };
  private httpOptions: any;
  private errorObj: any = [];
  // To install the mock server:  npm install -g json-server  To run  json-server --watch mock.json
  private mockDataURL = 'http://localhost:3000';
  // To run Angular against the real services, include the proxy settings:  ng serve --proxy-config proxy.conf.json
  private realServiceURL = '/upiServices/';
  constructor(
    private http: HttpClient
  ) {
    let settings: any = {
      "Content-Type": "application/json",
      // 'Access-Control-Allow-Origin':'*'
    };
    this.httpOptions = {
      headers: new HttpHeaders(settings)
    };
  }

  // this are used for DNM services
  httpGet(endPoint: string, meta?: any): Observable<any> {
         return this.http.get(this.baseURL+endPoint)
        .pipe(
          catchError(err => this.handleError(err))
        );
  //   if(meta.hasExtraHeaders){
  //     let billingId:string = meta.billingId;
  //     this.prodSettings['billingId'] = billingId;
  //   }
  //  // this.options = this.getOptions();
  //   if (this.mockDataURL !== this.baseURL && !environment.production) {
  //     this.getLocalDevBaseUrl(meta.serviceType, meta.network);
  //     if (sessionStorage.impersonateUserInfo) {
  //       sessionStorage.setItem('userAuth', JSON.parse(sessionStorage.impersonateUserInfo));
  //     }
  //     return this.http.get(this.baseURL + endPoint, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   } else if (environment.production) {
  //     this.baseURL = this.getBaseUrl();
  //     let service: string = this.servicePath + '/';
  //     if (meta.restService) {
  //       service = 'rest/';
  //     }
  //     return this.http.get(this.baseURL + service + endPoint, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err, this.baseURL + service + endPoint))
  //       );
  //   } else {
  //     // endPoint = this.formatToMockServerUrl(endPoint);
  //     const mockEndPoint = meta.mockEndPoint;
  //     const baseURL = this.baseURL;
  //     this.baseURL = 'http://localhost:3000';
  //     this.mockDataURL = 'http://localhost:3000';
  //     return this.http.get(baseURL + '/' + mockEndPoint)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   }
  }

  httpPost(endPoint: string, meta?: any): Observable<any> {
    return this.http.post(this.baseURL+endPoint, this.httpOptions)
   .pipe(
     catchError(err => this.handleError(err))
   );
   }

   httpDelete(endPoint: string, meta?: any): Observable<any> {
    return this.http.delete(this.baseURL+endPoint, this.httpOptions)
   .pipe(
     catchError(err => this.handleError(err))
   );
   }
   httpUpdate(endPoint: string, meta?: any): Observable<any> {
    return this.http.put(this.baseURL+endPoint, this.httpOptions)
   .pipe(
     catchError(err => this.handleError(err))
   );
   }
  handleError(error: any, url?: any, genericErrorMes?: any) {
    if(error.foundErrorMessage){
      return;
    }
    if (error.error.respStatus !== undefined ) {
      if (error.status && (error.status === 409 || error.status === 400)) {
        if (error.error.errorDetails && error.error.errorDetails.errorCode !== 'VAMS-5110') {
         // this.messageService.showFormattedErrorMessage(error.error.errorDetails.errorDescription, error.error.errorDetails.errorCode);
        }
      }
      if (error.status && error.status === 500) {
        const commonErrMsg = 'Please accept our apologies. There was an error processing this request. Please return in a few minutes to attempt again. We appreciate your business and apologize for any inconvenience. Thank you for your patience.';
       // this.cuiMessageService.sendMessage('error', commonErrMsg, '', 0);
      }
      return Observable.throw(error.error);
    }
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    const time = moment().format("MM ddd, YYYY hh:mm:ss a")
    const errorObj: any = {
      errorUrl: url,
      err: error,
      time: time,
      error: error.error,
      errorMessage: errorMessage
    };
    this.errorObj.push(errorObj);
  //  this.loadAnimationService.removeAllLoadAction();
    if (genericErrorMes === undefined || genericErrorMes) {
      const commonErrMsg = 'Please accept our apologies. There was an error processing this request. Please return in a few minutes to attempt again. We appreciate your business and apologize for any inconvenience. Thank you for your patience.';
    //  this.cuiMessageService.sendMessage('error', commonErrMsg, '', 0);
    }
    return throwError(error);
  }

  // httpPostOLD(url: string, data: string, methodType: string): Observable<any> {
  //   const urlFormated = url;
  //   if (this.mockDataURL !== this.baseURL && !environment.production) {
  //     if (url.indexOf('/upiServices') !== -1) {
  //       this.baseURL = '/upiServices/';
  //       urlFormated.replace('/upiServices/', '');
  //     }
  //   }
  //   const dataFormated = '&data=' + encodeURIComponent(data);
  //   const methodTypeFormated = '&methodType=' + methodType + this.impersonateUser;
  //   const req = {};
  //   // this.messageService.showInfoMessage('Success!!! '+ url);
  //   if (this.mockDataURL !== this.baseURL) {
  //     if (sessionStorage.impersonateUserInfo) {
  //       sessionStorage.setItem('userAuth', JSON.parse(sessionStorage.impersonateUserInfo));
  //     }
  //     return this.http.post(this.baseURL + urlFormated + dataFormated + methodTypeFormated, req, this.getHttpOptions())
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err, this.baseURL + urlFormated + dataFormated + methodTypeFormated))
  //       );
  //   } else {
  //     url = this.formatToMockServerUrl(url);
  //     const baseURL = this.baseURL;
  //     this.baseURL = 'http://localhost:3000';
  //     this.mockDataURL = 'http://localhost:3000';
  //     return this.http.get(baseURL + url)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   }
  // }

  // httpDataPost(url: string, data: any, meta?: any): Observable<any> {
  //   // check for mockservice
  //   let formUrlEncodedContentType = false;
  //   let formDataReq = '';
  //   let req = data;
  //   if (!meta.onlyData) {
  //     req = '';
  //     formDataReq = this.convertRequest(data, url, meta.nonPostdata, meta.justData);
  //     console.log('formDataReq', formDataReq);
  //   }
  //   if (this.mockDataURL !== this.baseURL && !environment.production) { // check for local real service
  //     this.getLocalDevBaseUrl(meta.serviceType);
  //     return this.apiWrapper(meta.methodType, this.baseURL + formDataReq + this.localDevString, req, '');
  //   } else if (environment.production) { // production
  //     this.baseURL = this.getBaseUrl();
  //     return this.apiWrapper(meta.methodType, this.baseURL + this.servicePath + '/upiServices/' + formDataReq, req, this.options);
  //   } else { // mock service
  //     url = this.formatToMockServerUrl(url);
  //     const baseURL = this.baseURL;
  //     this.baseURL = 'http://localhost:3000';
  //     this.mockDataURL = 'http://localhost:3000';
  //     return this.http.get(baseURL + url)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   }
  // }

  // checkandremove(url) {
  //   return url.replace('&&', '&');
  // }

  // apiWrapper(methodType, url, req, options) {
  //   if (methodType === 'GET') {
  //     return this.http.get(this.checkandremove(url), options)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err, url))
  //       );
  //   } else if (methodType === 'POST') {
  //     return this.http.post(this.checkandremove(url), req, options)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err, url))
  //       );
  //   }
  // }

  // httpFormPost(url: string, data: any, bridgeType: string): Observable<any> {
  //   const req = this.setFormData(data);
  //   if (this.mockDataURL !== this.baseURL && !environment.production) {
  //     this.getLocalDevBaseUrl(undefined);
  //     return this.http.post(this.checkandremove(this.baseURL + url + this.localDevString), req, this.options)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   } else if (environment.production) {
  //     this.baseURL = this.getBaseUrl();
  //     return this.http.post(this.checkandremove(this.baseURL + this.servicePath + '/upiServices/' + url), req, this.options)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err, this.baseURL + this.servicePath + '/upiServices/' + url))
  //       );
  //   } else {
  //     url = this.formatToMockServerUrl(url);
  //     const baseURL = this.baseURL;
  //     this.baseURL = 'http://localhost:3000';
  //     this.mockDataURL = 'http://localhost:3000';
  //     return this.http.get(baseURL + url)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   }
  // }

  // setFormData(data: any) {
  //   const body = new URLSearchParams();
  //   for (const key in data) {
  //     if (data.hasOwnProperty(key)) {
  //       body.set(key, data[key]);
  //     }
  //   }
  //   return body.toString();
  // }

  // httpFormDataPost(url: string, data: any, meta?: any): Observable<any> {
  //   const formDataReq = this.convertFormRequest(data);
  //   if (this.mockDataURL !== this.baseURL && !environment.production) {
  //     this.getLocalDevBaseUrl(meta.serviceType);
  //     return this.apiWrapper(meta.methodType, this.baseURL + url + '?' + meta.queryString + this.localDevString, formDataReq, this.options)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   } else if (environment.production) {
  //     this.baseURL = this.getBaseUrl();
  //     return this.apiWrapper(meta.methodType, this.baseURL + this.servicePath + '/upiServices/' + url + '?' + meta.queryString, formDataReq, this.options)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err, this.baseURL + this.servicePath + '/upiServices/' + url + '?' + meta.queryString))
  //       );
  //   } else {
  //     url = this.formatToMockServerUrl(url);
  //     const baseURL = this.baseURL;
  //     this.baseURL = 'http://localhost:3000';
  //     this.mockDataURL = 'http://localhost:3000';
  //     return this.http.get(baseURL + url)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   }
  // }

  // httpBodyPost(url: string, data: any, meta?: any): Observable<any> {
  //   const req = '';
  //   const formDataReq = this.convertBodyRequest(data, url, meta.paramString);
  //   if (this.mockDataURL !== this.baseURL && !environment.production) {
  //     this.getLocalDevBaseUrl(meta.serviceType);
  //     return this.apiWrapper(meta.methodType, this.baseURL + formDataReq + this.localDevString, req, this.options)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   } else if (environment.production) {
  //     this.baseURL = this.getBaseUrl();
  //     return this.apiWrapper(meta.methodType, this.baseURL + this.servicePath + '/upiServices/' + formDataReq, req, this.options)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err, this.baseURL + this.servicePath + '/upiServices/' + formDataReq))
  //       );
  //   } else {
  //     url = this.formatToMockServerUrl(url);
  //     const baseURL = this.baseURL;
  //     this.baseURL = 'http://localhost:3000';
  //     this.mockDataURL = 'http://localhost:3000';
  //     return this.http.get(baseURL + url)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   }
  // }

  // httpESPPost(url: string, urlparam: any, meta?: any): Observable<any> {
  //   // check for mockservice
  //   let formDataReq = '';
  //   let genericErrorMessage = true;
  //   if (meta.hasOwnProperty('genericErrorMes')) {
  //     genericErrorMessage = meta.genericErrorMes;
  //   }
  //   if (!meta.onlyData) {
  //     // req = '';
  //     formDataReq = this.convertRequest(urlparam, url, meta.nonPostdata, meta.justData);
  //     console.log('formDataReq', formDataReq);
  //   }
  //   console.log('dddddddddddddddddddd', meta.data);
  //   if (this.mockDataURL !== this.baseURL && !environment.production) { // check for local real service
  //     this.getLocalDevBaseUrl(meta.serviceType);
  //     return this.http.post(this.baseURL + formDataReq, meta.data, this.options)
  //     .pipe(
  //       catchError(err => this.handleError(err, undefined, genericErrorMessage))
  //     );
  //     // return this.apiWrapper(meta.methodType, this.baseURL + formDataReq + this.localDevString, req, this.options);
  //   } else if (environment.production) { // production
  //     this.baseURL = this.getBaseUrl();
  //     let service: string = this.servicePath + '/upiServices/';
  //     if (meta.restService) {
  //       service = 'rest/';
  //     }
  //     return this.http.post(this.baseURL + service + formDataReq, meta.data, this.options)
  //     .pipe(
  //       catchError(err => this.handleError(err, this.baseURL + service + url, genericErrorMessage))
  //     );
  //   } else { // mock service
  //     url = this.formatToMockServerUrl(url);
  //     const baseURL = this.baseURL;
  //     this.baseURL = 'http://localhost:3000';
  //     this.mockDataURL = 'http://localhost:3000';
  //     return this.http.get(baseURL + url)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   }
  // }

  // httpQueryPost(url: string, meta?: any): Observable<any> {
  //   // check for mockservice
  //   const req = '';
  //   const formDataReq = url + '?' + meta.data;
  //   if (this.mockDataURL !== this.baseURL && !environment.production) {
  //       this.getLocalDevBaseUrl(meta.serviceType);
  //       return this.apiWrapper(meta.methodType, this.baseURL + formDataReq + this.localDevString, req, this.options)
  //       /* .map(this.extractData) */
  //       .pipe(
  //           catchError(err => this.handleError(err))
  //         );
  //   } else if (environment.production) {
  //     this.baseURL = this.getBaseUrl();
  //     if(meta.changeAPICall){
  //       // this condition is for the vns getuCPEInventoryInfo service request
  //       return this.apiWrapper(meta.methodType, this.baseURL + this.servicePath + '/upiServices/' + url, req, this.options)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err, this.baseURL + this.servicePath + '/upiServices/' + formDataReq))
  //       );
  //     } else {
  //       return this.apiWrapper(meta.methodType, this.baseURL + this.servicePath + '/upiServices/' + formDataReq, req, this.options)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err, this.baseURL + this.servicePath + '/upiServices/' + formDataReq))
  //       );
  //     }
  //   } else {
  //     url = this.formatToMockServerUrl(url);
  //     const baseURL = this.baseURL;
  //     this.baseURL = 'http://localhost:3000';
  //     this.mockDataURL = 'http://localhost:3000';
  //     return this.http.get(baseURL + url)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   }
  // }

  // private convertFormRequest(req: any) {
  //   const data = req.data;
  //   const urlString = req.url;
  //   const body = new URLSearchParams();
  //   for (const key in data) {
  //     if (data.hasOwnProperty(key)) {
  //       body.set(key, data[key]);
  //     }
  //   }
  //   body.set('url', urlString);
  //   return body.toString();
  // }

  // // encoding data into string
  // private convertRequest(req: any, url: string, nonPostdata?: boolean, justData?: boolean) {
  //   const finalObj: any = {};
  //   finalObj.url = url;
  //   let strData = req.data;
  //   const data = req.data;
  //   strData = JSON.stringify(strData);
  //   req.data = strData;
  //   finalObj.postdata = JSON.stringify(req);
  //   let reqPram = 'postdata=';
  //   if (justData) {
  //     reqPram = 'data=';
  //   }
  //   let finalString: any = finalObj.url + '?';
  //   if (nonPostdata) {
  //     for (const key in data) {
  //       if (data.hasOwnProperty(key)) {
  //         const value = data[key];
  //         finalString = finalString + key + '=' + value + '&';
  //       }
  //     }
  //   } else {
  //     finalString = finalString + reqPram + encodeURIComponent(finalObj.postdata);
  //   }
  //   return finalString;
  // }

  // private convertBodyRequest(req: any, url: string, paramString: string) {
  //   const finalObj: any = {};
  //   finalObj.url = url;
  //   let strData = req.data;
  //   strData = JSON.stringify(strData);
  //   req.data = strData;
  //   finalObj.postdata = JSON.stringify(req);
  //   let finalString: any = finalObj.url + '?';
  //   const reqPram = '&body=';
  //   finalString = finalString + paramString + reqPram + encodeURIComponent(finalObj.postdata);
  //   return finalString;
  // }

  // getErrorStackTrace() {
  //   return this.errorObj;
  // }

 

  // // Replace the controller from url as our mock server doesnt accept any extra
  // private formatToMockServerUrl(url: string, methodType?: string) {
  //   if (url && url.includes('/upiServices/unifiedPortalController')) {
  //     url = url.replace('/upiServices/unifiedPortalController', '');
  //   } else if (url && url.includes('/upiServices/diagnosticsController')) {
  //     url = url.replace('/upiServices/diagnosticsController', '');
  //   } else if (url && url.includes('/upiServices/policyController')) {
  //     url = url.replace('/upiServices/policyController', '');
  //   } else if (url && url.includes('cpServices/rest/orderDetailController')) {
  //     url = url.replace('cpServices/rest/orderDetailController', '');
  //   } else if (url && url.includes('/notification')) {
  //     url = url.replace('/notification', '');
  //   } else if (url && url.includes('/upiServices/notification')) {
  //     url = url.replace('/upiServices/notification', '');
  //   } else if (url && url.includes('provisionInterfaceController')) {
  //     url = url.replace('provisionInterfaceController', '');
  //   } else if (url && url.includes('lmmsLicenseSystem')) {
  //     url = url.replace('lmmsLicenseSystem', '');
  //   } else if (url && url.includes('ztpInterfaceController')) {
  //     url = url.replace('ztpInterfaceController', '');
  //   } else if (url && url.includes('manageVnfInterfaceController')) {
  //     url = url.replace('manageVnfInterfaceController', '');
  //   } else if (url && url.includes('controllerInformationInterface')) {
  //     url = url.replace('controllerInformationInterface', '');
  //   } else if (url && url.includes('cpServices/rest/customerPortalController')) {
  //     url = url.replace('cpServices/rest/customerPortalController', '');
  //   } else if (url && url.includes('/dnm/serviceType/')) {
  //     url = url.replace('/dnm/serviceType', '');
  //     url = url.replace('attribute', '');
  //     url = url.replace('//', '_');
  //   } else if (url && url.includes('/dnm/enum/groupName/UPI/subType/PIP')) {
  //     url = url.replace('/dnm/enum/groupName/UPI/subType/PIP', '/SORT_OPTION');
  //   } else if (url && url.includes('vams/')) {
  //     if (url.includes('vams/label/')) {
  //       url = url.replace('vams/label/', '');
  //     } else if (url.includes('vams/')) {
  //     url = url.replace('vams/', '');
  //     }
  //     if (url.includes('configSet') || url.includes('configElement') || (url.includes('label') && !(url.includes('AssociatedLabel'))) ) {
  //       url = methodType + url;
  //     }
  //     this.baseURL = 'http://localhost:4000';
  //     this.mockDataURL = 'http://localhost:4000';
  //   }  else if (url && url.includes('/sciChangeManager')) {
  //     url = url.replace('/sciChangeManager', '');
  //   }
  //   else if (url && url.includes('/sciCatalog')) {
  //     url = url.replace('/sciCatalog', '');
  //   }
  //   return url;
  // }


  // private getHttpOptions() {
  //   const root = window.location;
  //   let headers = new HttpHeaders();
  //   if (root.href.indexOf('localhost') >= 0) {
  //     headers = headers.append('Authorization', 'Basic ' + 'Ym9kdXNlcjpib2R1c2VyMQ==');
  //   }
  //   return { headers: headers, withCredentials: true };
  // }

  // extractData(res: Response) {
  //   return res.json() || {};
  // }

  // setSession<T>(): Observable<T> {
  //   console.log('in setSession');
  //   if (sessionStorage.impersonateUserInfo) {
  //     const sessionURL = window.location.protocol + '//' + window.location.host
  //       + '/customerportal/service?updateSession=true';
  //     const si = JSON.parse(sessionStorage.impersonateUserInfo);
  //     const params = '&vecEnterpriseId=' + si.impersonateUserEnterpriseId
  //       + '&vecPreferredTimezone=' + si.impersonateUserPreferredTimezone
  //       + '&vecUserEmail=' + si.impersonateUserEmail
  //       + '&vecUserName=' + si.impersonateUser;

  //     console.log('In setSession Invoking - ' + sessionURL + params);
  //     return this.http.post(sessionURL + params, {}, this.getHttpOptions()) as Observable<T>; // .map(this.extractData);
  //   }
  // }

  // getLocalDevBaseUrl(serviceType: string, network?: string) {
  //   if (serviceType === 'pipInventory') {
  //     this.baseURL = '/dnm/service/';
  //   } else if (serviceType === 'pipChangeManager') {
  //     this.baseURL = '/dnm/postservice/';
  //   } else if (serviceType === 'pubChangeManager') {
  //     this.baseURL = '/dnm/pubChange/';
  //   } else if (serviceType === 'pipVNS') {
  //     this.options = this.getVnsOptions();
  //     this.baseURL = '/dnm/vns/';
  //   } else if (serviceType === 'routerservice') {
  //     this.baseURL = '/dnm/routerCommand/';
  //   } else if (serviceType === 'pipAnalytics') {
  //     this.baseURL = '/dnm/analytics/';
  //   } else if (serviceType === 'pubInventory') {
  //     this.baseURL = '/dnm/pubService/';
  //   } else if (serviceType === 'dnmCommon') {
  //     this.baseURL = '/dnm/common/';
  //   } else if (serviceType === 'activation') {
  //     this.baseURL = '/dnm/activation/';
  //   } else if (serviceType === 'provRestBridge') {
  //     this.baseURL = '/provision/rest/';
  //   } else if (serviceType === 'upiServices') { // Policy DNM 2.0
  //     this.baseURL = '/upiServices';
  //     this.options = this.getVnsOptions();
  //   } else if (serviceType === 'vams') { // Policy DNM 2.0
  //     this.baseURL = '/';
  //     this.options = this.getVnsOptions();
  //   } else if (serviceType === 'ethernetEline') {
  //     this.baseURL = '/ethernetEline/';
  //     this.options = this.getOptions();
  //   }
  //   else if (serviceType === 'elineChangeManager') {
  //     this.baseURL = '/elineChangeManager/';
  //     this.options = this.getOptions();
  //   } else if (serviceType === 'ethernetAccess') {
  //     this.baseURL = '/ethernetAccess/';
  //     this.options = this.getOptions();
  //   } else if (serviceType === 'ethernetElan') {
  //     this.baseURL = '/ethernetElan/';
  //     this.options = this.getOptions();
  //   } else if (serviceType === 'elanChangeManager') {
  //     this.baseURL = '/elanChangeManager/';
  //     this.options = this.getOptions();
  //   } else if(serviceType === 'sciChangeManager'){
  //     this.baseURL = '/sci/sciChangeManager/'
  //   } else if(serviceType === 'sciCatalog'){
  //     this.baseURL = '/sci/sciCatalog/'
  //   } else {
  //     this.baseURL = '/vns/service/';
  //     this.options = this.getVnsOptions();
  //   }
  // }

  // // Policy DNM 2.0 Wrapper Method to form data to call new http Methods
  // httpPost(url: string, data: string, methodType: string, postData?: string): Observable<any> {
  //   let impersonateUser = '';
  //   if (!environment.production) {
  //     impersonateUser = 'impersonateUser=' + appConstants.IMPERSONATED_USER
  //       + '&userType=I&userid=' + appConstants.IMPERSONATED_USER;
  //     if (data || postData) {
  //       impersonateUser = impersonateUser + '&';
  //     }
  //   }
  //  if (postData) {
  //   impersonateUser = impersonateUser +  postData;
  //  }
  //   let endPoint = url + '?' + impersonateUser;
  //   const meta: any = {};
  //   meta.endPoint = endPoint;
  //   if (!environment.production && this.baseURL.includes('localhost')) {
  //     meta.mockEndPoint = this.formatToMockServerUrl(url, methodType);
  //   }
  //   if (meta.mockEndPoint) {
  //     meta.mockEndPoint = meta.mockEndPoint.replace("upiServices/", "");
  //     // meta.mockEndPoint.substr(2, meta.mockEndPoint.length);
  //   }
  //   if (endPoint.includes('vams')) {
  //     meta.serviceType = 'vams';
  //   } else {
  //     meta.serviceType = 'upiServices';
  //   }
  //   if (this.mockDataURL !== this.baseURL && !environment.production) {
  //     endPoint = endPoint.replace("upiServices/upiServices", "");
  //   }

  //   if (methodType === 'GET') {
  //     return this.httpGet(endPoint + data, meta);
  //   } else if (methodType === 'DELETE') {
  //     return this.httpDelete(endPoint + data, meta);
  //   } else if (methodType === 'POST') {
  //     meta.data = data;
  //     return this.httPost(endPoint, meta);
  //   } else if (methodType === 'PUT') {
  //     meta.data = data;
  //     return this.httPut(endPoint, meta);
  //   }
  // }


  // httpDelete(endPoint: string, meta?: any): Observable<any> {
  //   this.options = this.getOptions();
  //   if (this.mockDataURL !== this.baseURL && !environment.production) {
  //     this.getLocalDevBaseUrl(meta.serviceType, meta.network);
  //     if (sessionStorage.impersonateUserInfo) {
  //       sessionStorage.setItem('userAuth', JSON.parse(sessionStorage.impersonateUserInfo));
  //     }
  //     return this.http.delete(this.baseURL + endPoint, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   } else if (environment.production) {
  //     this.baseURL = this.getBaseUrl();
  //     let service: string = this.servicePath + '/';
  //     if (meta.restService) {
  //       service = 'rest/';
  //     }
  //     return this.http.delete(this.baseURL + service + endPoint, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err, this.baseURL + service + endPoint))
  //       );
  //   } else {
  //     // endPoint = this.formatToMockServerUrl(endPoint);
  //     const mockEndPoint = meta.mockEndPoint;
  //     const baseURL = this.baseURL;
  //     this.baseURL = 'http://localhost:3000';
  //     this.mockDataURL = 'http://localhost:3000';
  //     return this.http.get(baseURL + '/' + mockEndPoint)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   }
  // }

  // httLmmsPost(endPoint: string, meta?: any): Observable<any> {
  //   this.options = this.getVnsOptions();
  //   let genericErrorMessage = true;
  //   if (meta.hasOwnProperty('genericErrorMes')) {
  //     genericErrorMessage = meta.genericErrorMes;
  //   }
  //   if (this.mockDataURL !== this.baseURL && !environment.production) {
  //     this.getLocalDevBaseUrl(meta.serviceType);
  //     return this.http.post(this.baseURL + endPoint, meta.data, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err, undefined, genericErrorMessage))
  //       );
  //   } else if (environment.production) {
  //     this.baseURL = this.getBaseUrl();
  //     let service: string = this.servicePath + '/lmmsService/';
  //     if (meta.restService) {
  //       service = 'rest/';
  //     }
  //     return this.http.post(this.baseURL + service + endPoint, meta.data, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err, this.baseURL + service + endPoint, genericErrorMessage))
  //       );
  //   } else {
  //     endPoint = this.formatToMockServerUrl(endPoint);
  //     // const mockEndPoint = meta.endpoint;
  //     const baseURL = this.baseURL;
  //     this.baseURL = 'http://localhost:3000';
  //     this.mockDataURL = 'http://localhost:3000';
  //     return this.http.get(baseURL + endPoint)
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   }
  // }

  // httVnsPost(endPoint: string, meta?: any): Observable<any> {
  //   this.options = this.getVnsOptions();
  //   let genericErrorMessage = true;
  //   if (meta.hasOwnProperty('genericErrorMes')) {
  //     genericErrorMessage = meta.genericErrorMes;
  //   }
  //   if (this.mockDataURL !== this.baseURL && !environment.production) {
  //     this.getLocalDevBaseUrl(meta.serviceType);
  //     return this.http.post(this.baseURL + endPoint, meta.data, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err, undefined, genericErrorMessage))
  //       );
  //   } else if (environment.production) {
  //     this.baseURL = this.getBaseUrl();
  //     let service: string = this.servicePath + '/upiServices/';
  //     if (meta.restService) {
  //       service = 'rest/';
  //     }
  //     return this.http.post(this.baseURL + service + endPoint, meta.data, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err, this.baseURL + service + endPoint, genericErrorMessage))
  //       );
  //   } else {
  //     // endPoint = this.formatToMockServerUrl(endPoint);
  //     const mockEndPoint = meta.mockEndPoint;
  //     const baseURL = this.baseURL;
  //     this.baseURL = 'http://localhost:3000';
  //     this.mockDataURL = 'http://localhost:3000';
  //     return this.http.get(baseURL + '/' + mockEndPoint)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err, undefined, genericErrorMessage))
  //       );
  //   }
  // }

  // httInfraPost(endPoint: string, data: any, meta?: any): Observable<any> {
  //   this.options = this.getVnsOptions();
  //   let strData = data.data;
  //   strData = JSON.stringify(strData);
  //   data.data = strData;
  //   meta.data = JSON.stringify(data);
  //   if (this.mockDataURL !== this.baseURL && !environment.production) {
  //     this.getLocalDevBaseUrl(meta.serviceType);
  //     return this.http.post(this.baseURL + endPoint, meta.data, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   } else if (environment.production) {
  //     this.baseURL = this.getBaseUrl();
  //     // let service: string = 'service/upiServices/';
  //     let service: string = this.servicePath + '/upiServices/';
  //     return this.http.post(this.baseURL + service + endPoint, meta.data, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err, this.baseURL + service + endPoint))
  //       );
  //   } else {
  //     const mockEndPoint = "getVnsvEdgeControllerInfo";
  //     this.baseURL = 'http://localhost:3000';
  //     return this.http.get(this.baseURL + '/' + mockEndPoint)
  //     .pipe(
  //     catchError(err => this.handleError(err))
  //     );
  //   }
  // }

  // httpVnfPost(url: string, data: any, meta?: any): Observable<any> {
  //   // check for mockservice
  //   meta.url = url;
  //   meta.post = true;
  //   let req = data;
  //   if (this.mockDataURL !== this.baseURL && !environment.production) {
  //     this.getLocalDevBaseUrl(meta.serviceType);
  //     return this.http.post(this.baseURL + url, meta.data, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   } else if (environment.production) {
  //     this.baseURL = this.getBaseUrl();
  //     // let service: string = 'service/upiServices/';
  //     let service: string = this.servicePath + '/upiServices/';
  //     return this.http.post(this.baseURL + service + url, meta.data, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err, this.baseURL + service + url))
  //       );
  //   } else {
  //     const mockEndPoint = meta.mockEndPoint;
  //     return this.http.get(this.baseURL + '/' + mockEndPoint)
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   }
  // }

  // httPost(endPoint: string, meta?: any): Observable<any> {
  //   if(meta.hasExtraHeaders){
  //     let billingId:string = meta.billingId;
  //     this.prodSettings['billingId'] = billingId;
  //   }
  //   this.options = this.getOptions();

  //   let genericErrorMessage = true;
  //   if (meta.hasOwnProperty('genericErrorMes')) {
  //     genericErrorMessage = meta.genericErrorMes;
  //   }

  //   if (this.mockDataURL !== this.baseURL && !environment.production) {
  //     this.getLocalDevBaseUrl(meta.serviceType);
  //     return this.http.post(this.baseURL + endPoint, meta.data, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err, undefined, genericErrorMessage))
  //       );
  //   } else if (environment.production) {
  //     this.baseURL = this.getBaseUrl();
  //     let service: string = this.servicePath + '/';;
  //     if (meta.restService) {
  //       service = 'rest/';
  //     }

  //     return this.http.post(this.baseURL + service + endPoint, meta.data, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err, this.baseURL + service + endPoint, genericErrorMessage))
  //       );
  //   } else {
  //     // endPoint = this.formatToMockServerUrl(endPoint);
  //     const mockEndPoint = meta.mockEndPoint;
  //     const baseURL = this.baseURL;
  //     this.baseURL = 'http://localhost:3000';
  //     this.mockDataURL = 'http://localhost:3000';
  //     return this.http.get(baseURL + '/' + mockEndPoint)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err, undefined, genericErrorMessage))
  //       );
  //   }
  // }

  // httPut(endPoint: string, meta?: any): Observable<any> {
  //   this.options = this.getOptions();
  //   if (this.mockDataURL !== this.baseURL && !environment.production) {
  //     this.getLocalDevBaseUrl(meta.serviceType);
  //     return this.http.put(this.baseURL + endPoint, meta.data, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   } else if (environment.production) {
  //     this.baseURL = this.getBaseUrl();
  //     let service: string = this.servicePath + '/';;
  //     if (meta.restService) {
  //       service = 'rest/';
  //     }
  //     return this.http.put(this.baseURL + service + endPoint, meta.data, this.options)
  //       .pipe(
  //         catchError(err => this.handleError(err, this.baseURL + service + endPoint))
  //       );
  //   } else {
  //     // endPoint = this.formatToMockServerUrl(endPoint);
  //     const mockEndPoint = meta.mockEndPoint;
  //     const baseURL = this.baseURL;
  //     this.baseURL = 'http://localhost:3000';
  //     this.mockDataURL = 'http://localhost:3000';
  //     return this.http.get(baseURL + '/' + mockEndPoint)
  //       /* .map(this.extractData) */
  //       .pipe(
  //         catchError(err => this.handleError(err))
  //       );
  //   }
  // }

  // getOptions() {
  //   const uniqueID = this.uniqueID.replace(/-/gi, '');
  //   let settings: any = {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Basic ZG5tdXNlcjpkbm11c2VyMTIzIQ==',
  //     'userId': appConstants.IMPERSONATED_USER,
  //     'UserName': appConstants.IMPERSONATED_USER,
  //     'impersonateUserId': appConstants.IMPERSONATED_USER,
  //     'context-uuid': uniqueID,
  //     'userType': 'I',
  //     'source-name': 'Unified-Portal',
  //     'firstName': 'e2e_drt_cor', //next 5 used for ethernet
  //     'lastName': '',
  //     'email': 'vicken.mouradian@one.verizon.com',
  //     'impersonateEmail': 'vicken.mouradian@one.verizon.com',
  //     'billingId': 'SF002186',
  //     'sourceSystem': 'DNM2.0'
  //   };
  //   if (environment.production) {
  //     settings = this.prodSettings;
  //   }
  //   const httpOptions = {
  //     headers: new HttpHeaders(settings)
  //   };
  //   return httpOptions;
  // }

  // getVnsOptions() {
  //   const uniqueID = this.uniqueID.replace(/-/gi, '');
  //   let settings: any = {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Basic dm5zcDp2bnNwMTIzIQ==',
  //     'context-uuid': uniqueID,
  //     'source-name': 'Unified-Portal',
  //     'userId': appConstants.IMPERSONATED_USER,
  //     'UserName': appConstants.IMPERSONATED_USER,
  //     'role': 'Customer'
  //   };
  //   if (environment.production) {
  //     settings = this.prodSettings;
  //   }
  //   const httpOptions = {
  //     headers: new HttpHeaders(settings)
  //   };
  //   return httpOptions;
  // }

  // getBaseUrl() {
  //   const origin = window.location.origin;
  //   let pathname = window.location.pathname;
  //   if(VERSION.isWebLogic){
  //     pathname = '/vzips/'
  //   }
  //   return origin + pathname;
  // }

}
