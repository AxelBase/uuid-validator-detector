export function isValidUUID(str: string): boolean {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regex.test(str);
}

export function getUUIDVersion(str: string): string {
    if (!isValidUUID(str)) {
        return 'Invalid UUID format';
    }
    const versionChar = str.charAt(14).toLowerCase();
    const version = parseInt(versionChar, 16);
    return `Version ${version}`;
}