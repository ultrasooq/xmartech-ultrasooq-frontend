"use client";

import { useMe } from "@/apis/queries/user.queries";
import { getUserStatusInfo } from "@/utils/statusCheck";
import { Badge } from "@/components/ui/badge";

interface StatusDisplayProps {
  showDetails?: boolean;
  className?: string;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ 
  showDetails = false, 
  className = "" 
}) => {
  const { data: userData, isLoading } = useMe();
  
  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="animate-pulse w-4 h-4 bg-gray-300 rounded-full"></div>
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    );
  }

  if (!userData?.data) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
        <span className="text-sm text-gray-500">Not logged in</span>
      </div>
    );
  }

  const statusInfo = getUserStatusInfo(userData);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 border-green-200";
      case "INACTIVE":
        return "bg-red-100 text-red-800 border-red-200";
      case "SUSPENDED":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`w-4 h-4 rounded-full border-2 ${
        statusInfo.isActive ? "bg-green-500 border-white" :
        statusInfo.isInactive ? "bg-red-500 border-white" :
        statusInfo.isSuspended ? "bg-yellow-500 border-white" :
        "bg-gray-500 border-white"
      }`} />
      
      <Badge 
        variant="outline" 
        className={`text-xs ${getStatusColor(statusInfo.status)}`}
      >
        {statusInfo.status}
      </Badge>
      
      {showDetails && (
        <div className="text-xs text-gray-500 ml-2">
          {statusInfo.isActive && "Full access"}
          {statusInfo.isInactive && "Limited access"}
          {statusInfo.isSuspended && "Access suspended"}
        </div>
      )}
    </div>
  );
};

export default StatusDisplay;
