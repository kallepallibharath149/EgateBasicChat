import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { post } from '@app/common/models/posts.model';
import { HttpService } from '@app/interceptors/http.service';
import { Subscription } from 'rxjs';
import { groupPostReloadService } from './groupPost.reload';

@Component({
  selector: 'app-main-page-groups-container',
  templateUrl: './main-page-groups-container.component.html',
  styleUrls: ['./main-page-groups-container.component.less']
})
export class MainPageGroupsContainerComponent implements OnInit {
  subscription:Subscription;
  currentGroupId: string;
  latestPosts: Array<any> = [];
  pageNumber:number = 1;
  showLoader:boolean = false;
  userMessage:Array<any> = [];

  constructor(private httpService:HttpService,
             private activatedRoute: ActivatedRoute,
             private groupReloadService:groupPostReloadService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      // console.log(params.has('id')); // true has() ,get(),      getAll()
      this.currentGroupId = params.get('groupId');
      this.getInitialLatestPosts('initialization');
      // alert(this.currentGroupId);
    });
    this.groupReloadService.reloadGroupLatestPosts.subscribe(state =>{
     if(state){
      this.getInitialLatestPosts('reload');
     }
    });
    
  }

  getInitialLatestPosts(APICallState?) {
    this.userMessage = [];
    this.pageNumber = 1;
   if(APICallState == 'initialization'){
    this.latestPosts = [];
   }
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    this.getLatestPosts(APICallState);
    }
    
  getLatestPosts(state?) {
    this.showLoader = true;
    this.subscription= this.httpService.httpGet(`Post/Posts?groupId=${this.currentGroupId}&pageNumber=${this.pageNumber}`).subscribe((response:Array<post>) => {
      console.log(response);
      setTimeout(()=>{
        this.showLoader = false;
      },100);
      if (Array.isArray(response) && response.length > 0) {
        response.forEach(post=>{
          post.postCategory = '';
          post.postImages.forEach((image,i)=>{
            let imageUrl = `http://3.230.104.70:8888/api/${image}`;
            post.postImages.splice(i,1,imageUrl);
          });
          post.postVideos.forEach((video,i)=>{
            let videoUrl = `http://3.230.104.70:8888/api/${video}`;
            post.postVideos.splice(i,1,videoUrl);
          });
        if(post.postImages.length <=0 && post.postVideos.length<=0){
          post.postTextOnly = true;
        } else {
          post.postTextOnly = false; 
        }
        });
        if(state == 'reload'){
          const results = response.filter(({ id: id1 }) => !this.latestPosts.some(({ id: id2 }) => id2 === id1));
          this.latestPosts = [...results,...this.latestPosts];
        } else {
          this.latestPosts = [...this.latestPosts, ...response];
        }
      } else{
        if(this.latestPosts.length <=0){
          this.userMessage = [{severity:'info', summary:'No posts. You are the first person. Please post here...', detail:''}];  
        } else if(this.latestPosts.length > 0 && Array.isArray(response) && response.length <= 0){
          this.userMessage = [{severity:'info', summary:'End of Posts...', detail:''}];    
        }
      }
    }, (error) => {
      console.log(error);
    });
  }

  onScroll() {
   this.pageNumber = this.pageNumber+1; 
   this.getLatestPosts();
   }

}
