namespace DatingApp.API.Helpers
{
    public class PaginationHeader
    {
        public int PageNumber { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }

        public PaginationHeader(int pageNumber, int itemsPerPage, int totalItems, int totalPages)
        {
            this.PageNumber = pageNumber;
            this.ItemsPerPage = itemsPerPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;   
        }
    }
}