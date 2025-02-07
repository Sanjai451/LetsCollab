export function handleCopyClipBoardResults(roomId: string | null, setCopied: (arg0: boolean) => void): void {
    try {            
        if (!roomId) {
            console.error("No room ID found in localStorage");
            return;
        }
        navigator.clipboard.writeText(roomId)
            .then(() => {
                console.log("Copied to clipboard");
                setCopied(true);
            })
            .catch((err) => {
                console.error("Failed to copy:", err);
            });
    } catch (error) {
        console.error("Unexpected error:", error);
    }
}