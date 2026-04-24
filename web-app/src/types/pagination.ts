export interface SortInfo {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface PaginationResponse<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
    sort: SortInfo;
    pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
        sort: SortInfo;
    };
}