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


