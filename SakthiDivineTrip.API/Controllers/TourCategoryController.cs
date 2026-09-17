using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SakthiDivineTrip.API.DTO;
using SakthiDivineTrip.API.Models;

namespace SakthiDivineTrip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourCategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TourCategoryController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var Categories = await _applicationDbContext.TourCategories.ToListAsync();
            return Ok(Categories);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult>GetCategoryByID(int id)
        {
            var CategoryById = await _applicationDbContext.TourCategories.FirstOrDefaultAsync(x => x.CategoryId == id);
            if (CategoryById == null)
            {
                return NotFound("TourCategory not found");
            }
            return Ok(CategoryById);
        }
        

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateCategories(TourCategoryRequest tourCategoryRequest)
        {
            var CreateCategory = new TourCategory
            {
                CategoryName = tourCategoryRequest.CategoryName,
                DisplayOrder = tourCategoryRequest.DisplayOrder
            };

            _applicationDbContext.TourCategories.Add(CreateCategory);

            await _applicationDbContext.SaveChangesAsync();
                
            return Ok("Tour Category Created");
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateTourCategory(TourCategoryRequest categoryreq, int id)
        {
            var updateTourCategory=await _applicationDbContext.TourCategories.FirstOrDefaultAsync(x=>x.CategoryId==id);

            if (updateTourCategory == null) {
                return NotFound("Category not found.");
            }

            updateTourCategory.CategoryName = categoryreq.CategoryName;
            updateTourCategory.DisplayOrder = categoryreq.DisplayOrder;

            updateTourCategory.UpdatedOn = DateTime.UtcNow;

             await _applicationDbContext.SaveChangesAsync();
            return Ok(updateTourCategory);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var deleteCategory = await _applicationDbContext.TourCategories.FirstOrDefaultAsync(x => x.CategoryId == id);

            if (deleteCategory == null)
            {
                return NotFound("No Categories to delete");
            }
             _applicationDbContext.TourCategories.Remove(deleteCategory);
            await _applicationDbContext.SaveChangesAsync();
            return Ok("Category deleted successfully");
        }
    }
}
