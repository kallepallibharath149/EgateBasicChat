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
    defaultGrop?: boolean;
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
    defaultGrop?: boolean;
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
}

export interface searchMember {
    profileId?: string;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
    profileCoverImageUrl?: string;
}