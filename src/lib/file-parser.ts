export async function extractUUIDs(file: File): Promise<string[]> {
    const text = await file.text();
    const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;
    const matches = text.match(uuidRegex) || [];
    const seen = new Set<string>();
    const unique: string[] = [];
    for (const uuid of matches) {
        const lower = uuid.toLowerCase();
        if (!seen.has(lower)) {
            seen.add(lower);
            unique.push(uuid);
        }
    }
    return unique;
}