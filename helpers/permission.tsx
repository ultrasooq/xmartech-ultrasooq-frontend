import { useAuth } from "@/context/AuthContext"

export const PERMISSION_TEAM_MEMBERS = "teammember";
export const PERMISSION_PRODUCTS = "product";
export const PERMISSION_ORDERS = "order";
export const PERMISSION_RFQ_QUOTES = "rfqquote";
export const PERMISSION_RFQ_SELLER_REQUESTS = "rfqsellerrequest";
export const PERMISSION_SELLER_REWARDS = "sellerreward";
export const PERMISSION_SHARE_LINKS = "sharedlink";

export const checkPermission = (permissionName: string): boolean => {
    const { user, permissions } = useAuth();

    if (user?.tradeRole != 'MEMBER') return true;

    if (user?.tradeRole == 'MEMBER' && !permissions.find((permission: any) => permission.permissionDetail?.name == permissionName)) {
        return false;
    }

    return true;
}

export const getPermissions = (): string[] => {
    const { user, permissions } = useAuth();

    return permissions
        .filter((permission: any) => permission.permissionDetail)
        .map((permission: any) => permission.permissionDetail.name);
};