using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

public class PagedList<T> : List<T>
{

    public PagedList(int currentPage, int pageSize, int totalPages, int itemCount)
    {
        this.CurrentPage = currentPage;
        this.PageSize = pageSize;
        this.TotalPages = totalPages;
        this.ItemCount = itemCount;
    }
    public int CurrentPage { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public int ItemCount { get; set; }

    public PagedList(List<T> items, int count, int pageNumber, int pageSize)
    {
        ItemCount = count;
        CurrentPage = pageNumber;
        PageSize = pageSize;
        TotalPages = (int)Math.Ceiling(count / (double)PageSize);
        this.AddRange(items);
    }

    public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
    {
        int count = await source.CountAsync();
        var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync<T>();
        return new PagedList<T>(items, count, pageNumber, pageSize);
    }
}