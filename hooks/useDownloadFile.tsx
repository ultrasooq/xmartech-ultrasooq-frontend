/**
 * @fileoverview Custom hook for downloading chat file attachments.
 *
 * Provides a wrapper around the attachment download API that:
 * 1. Fetches a pre-signed URL from the backend via {@link downloadAttachment}.
 * 2. Programmatically creates an invisible anchor element to trigger the browser download.
 * 3. Exposes a loading flag and handles errors with localised toast notifications.
 *
 * @module hooks/useDownloadFile
 */

import { useState } from "react";
import { downloadAttachment } from "@/apis/requests/chat.requests";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "next-intl";

/**
 * Hook that encapsulates file-download logic for chat attachments.
 *
 * @returns {Object} An object with the following properties:
 * @returns {(filePath: string) => Promise<void>} return.handleDownloadFile -
 *   Initiates a file download given its server-side file path. Fetches a
 *   pre-signed URL from the API, then triggers a browser download. Shows
 *   a toast on failure.
 * @returns {boolean} return.downloadLoading - `true` while a download
 *   request is in-flight.
 *
 * @example
 * ```tsx
 * const { handleDownloadFile, downloadLoading } = useDownloadFile();
 *
 * <Button
 *   onClick={() => handleDownloadFile(attachment.filePath)}
 *   disabled={downloadLoading}
 * >
 *   Download
 * </Button>
 * ```
 */
const useDownloadFile = () => {
    const t = useTranslations();
    /** Whether a download request is currently in progress. */
    const [downloadLoading, setDownloadLoading] = useState(false);
    const { toast } = useToast();

    /**
     * Creates a temporary anchor element to initiate a browser download
     * from a pre-signed URL.
     *
     * @param {string} [presignedUrl] - The pre-signed URL pointing to the file.
     * @returns {Promise<void>}
     */
    const downloadFile = async (presignedUrl?: string) => {
        const link: any = document.createElement('a');
        link.href = presignedUrl;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    /**
     * Fetches the pre-signed download URL for the given file path and
     * triggers a browser download. Shows a danger toast if the path is
     * missing, the response does not contain a URL, or the request fails.
     *
     * @param {string} filePath - The server-side storage path of the attachment.
     * @returns {Promise<void>}
     */
    const handleDownloadFile = async (filePath: string) => {
        try {
            if (filePath) {
                setDownloadLoading(true);
                const response: any = await downloadAttachment(filePath);
                if (response?.data?.url) {
                    downloadFile(response?.data?.url);
                } else {
                    toast({
                        title: t("chat"),
                        description: t("file_download_failed"),
                        variant: "danger",
                    });
                }
                setDownloadLoading(false);
            } else {
                toast({
                    title: t("chat"),
                    description: t("file_path_missing"),
                    variant: "danger",
                });
            }
        } catch (error) {
            setDownloadLoading(false);
            toast({
                title: t("chat"),
                description: t("file_download_failed"),
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
