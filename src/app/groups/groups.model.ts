export interface groups {
    groupId?: string,
    groupName?: string,
    privateChanel?: boolean,
    groupDescription?: string,
    groupPhotoPath?: any,
    groupCoverPhoto?: any;
    groupCategory?: string,
    isAdmin?: boolean;
    isMainAdmin?: boolean;
    memberType?: string;
    defaultGroup?: boolean;
    admins?: Array<members> | null;
    members?: Array<members> | null;
}

export interface groupsActions {
    label: string;
    show: boolean;
    showTo: Array<string>;
}

export interface groupsListResponse {
    id?: string;
    name?: string;
    createdById?: string;
    createdDateTime?: any;
    defaultGroup?: boolean;
    groupDescription?: string;
    groupCategory?: string;
    groupMemberType?: string;
    admins?: Array<members> | null;
    members?: Array<members> | null;
    groupSettings?: any;
}

export interface members {
    groupId?: string;
    adminId?: string;
    createdDateTime?: string;
    createdById?: string;
    profileId?: string;
    profileName?: string;
    userId?: string;
    profileImageUrl?: string;
    isAdmin?: boolean;
    profileCoverImageUrl?: string;
    isMember? :boolean;
    isMainAdmin?:boolean;
}

export interface searchMember {
    profileId?: string;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
    profileCoverImageUrl?: string;
}

export interface invitedMembers {
    id: string; 

    groupid: string;

    profileid: string;

    profileName: string;

    profileImageUrl: string;

    invitetext: string;

    invitedbyprofileid?:string;

    actionByAdminProfileid?:string; 

    status?: string;

    invitationSentTime?: any;

    invitationAdminActionTime?: any; 

    inviteeActionTime?: any; 
}

