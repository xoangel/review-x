export default function isImageURL(url: string): boolean {

    const lowercasedUrl = url.toLowerCase();
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
    if(url.startsWith("http://") || url.startsWith("https://")){
        for (const extension of imageExtensions) {
            if (lowercasedUrl.endsWith(extension)) {
                return true;
            }
        }
    }
    return false;
}