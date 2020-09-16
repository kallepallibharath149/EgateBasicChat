export interface groups {
    groupId?: string,
    groupName: string,
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
    show: boolean
    showTo: Array<string>
}