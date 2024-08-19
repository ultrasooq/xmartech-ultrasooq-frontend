import { useState } from "react";
import { downloadAttachment } from "@/apis/requests/chat.requests";
import { useToast } from "@/components/ui/use-toast";

const useDownloadFile = () => {
    const [downloadLoading, setDownloadLoading] = useState(false);
    const { toast } = useToast();

    const downloadFile = async (presignedUrl?: string) => {
        const link: any = document.createElement('a');
        link.href = presignedUrl;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadFile = async (filePath: string) => {
        try {
            if (filePath) {
                setDownloadLoading(true);
                const response: any = await downloadAttachment(filePath);
                if (response?.data?.url) {
                    downloadFile(response?.data?.url);
                } else {
                    toast({
                        title: "Chat",
                        description: "Failed to download the file",
                        variant: "danger",
                    });
                }
                setDownloadLoading(false);
            } else {
                toast({
                    title: "Chat",
                    description: "File path is missing",
                    variant: "danger",
                });
            }
        } catch (error) {
            setDownloadLoading(false);
            toast({
                title: "Chat",
                description: "Failed to download the file",
                variant: "danger",
            });
        }
    };

    return {
        handleDownloadFile,
        downloadLoading
    }
}

export default useDownloadFile