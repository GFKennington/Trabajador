// trabajador-shared
//
// Generic utilities shared across the client and server packages.
// Add domain logic (types, schemas, etc.) here as the project grows.

/** Format a Date as an ISO-8601 date string (YYYY-MM-DD). */
export function formatDate(date: Date): string {
    return date.toISOString().slice(0, 10);
}

/** Format a Date as an ISO-8601 datetime string (UTC, seconds precision). */
export function formatDateTime(date: Date): string {
    return date.toISOString().slice(0, 19) + "Z";
}

/**
 * Parse a value as an integer, returning `fallback` when it is missing or not
 * a finite integer. Useful for query-string parsing.
 */
export function toInt(value: unknown, fallback: number): number {
    if (value === null || value === undefined || value === "") {
        return fallback;
    }
    const n = Number(value);
    return Number.isInteger(n) ? n : fallback;
}

/** A reusable JSON success envelope. */
export interface Ok<T> {
    ok: true;
    data: T;
}

/** A reusable JSON error envelope. */
export interface Err {
    ok: false;
    error: string;
}

export function ok<T>(data: T): Ok<T> {
    return { ok: true, data };
}

export function err(error: string): Err {
    return { ok: false, error };
}
