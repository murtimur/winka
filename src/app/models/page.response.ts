export interface PageResponse<T> {
    content: T[];
    totalElement: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}