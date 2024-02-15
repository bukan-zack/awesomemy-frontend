export interface Pagination {
    currentPage: number;
    totalPages: number;
    count: number;
    total: number;
}

export function rawIntoPagination(data: any) {
    return {
        currentPage: data.current_page,
        totalPages: data.total_pages,
        count: data.count,
        total: data.total,
    } as Pagination;
}