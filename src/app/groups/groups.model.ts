export interface groups {
    groupId?: string,
    groupName?: string,
    privateChanel?: boolean,
    groupDescription?: string,
    groupPhotoPath?: any,
    groupCoverPhoto?:any;
    groupCategory?: string,
    isAdmin?: boolean;
    isMainAdmin?: boolean;
    memberType?: string;
    defaultGrop?:boolean;
}

export interface groupsActions {
    label: string;
    show: boolean;
    showTo: Array<string>;
}

export interface groupsListResponse {
    id?: string;
    name?: string;
    createdById?:string;
    createdDateTime?: any;
    admins?:Array<members> | null;
    members?: Array<members> | null;
    groupSettings?: any;
    defaultGrop?: any;
}

export interface members {
    groupId?: string;
    adminId?: string;
    createdDateTime?:string;
    createdById?: string;
    userId?: string;
}