import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const RedirectComponent: React.FC<{ to: string }> = ({ to }) => {
    const router = useRouter();

    useEffect(() => {
        router.push(to);
    }, []);

    return (
        <div></div>
    );
};

export default RedirectComponent;