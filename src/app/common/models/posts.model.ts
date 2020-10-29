export interface post {
    id?: string;
    profileid: string;
    profileName?: string;
    profileImageUrl?:string;
    groupid?: string;
    posttext?: string;
    createddatetime?:string;
    resources?: Array<any>;
    postTextOnly?:boolean;
    postCategory?:string;
}

export interface comment {
    id?: string;
    commentId: string;
    profileid: string;
    profileName?: string;
    profileImageUrl?:string;
    commenttext?: string;
    createddatetime?:string;
    resources:Array<resourse>;
    commentTextOnly?:boolean; 
}
export interface resourse {
    fileType: string;
  url:string;
}



