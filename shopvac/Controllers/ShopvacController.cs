namespace shopvac.Controllers
{
	using System.Collections.Generic;
	using System.Threading.Tasks;
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.EntityFrameworkCore;
	using shopvac.Models;
	using shopvac.Models.Dto;

	[Route("api/[controller]")]
	[ApiController]
	public class ShopvacController : ControllerBase
	{
		private readonly PostgresContext _context;

		public ShopvacController(PostgresContext context)
		{
			this._context = context;
		}

		[HttpGet]
		public async Task<ActionResult<List<Shopvac>>> GetAll()
		{
			return await this._context.Shopvacs.ToListAsync();
		}

		[HttpGet("{id}", Name = "Get")]
		public async Task<ActionResult<Shopvac>> GetById(string id)
		{
			var shopvac = await this._context.Shopvacs.FindAsync(id);
			if (shopvac == null)
			{
				return NotFound();
			}
			return shopvac;
		}

		[HttpPost]
		public async Task<ActionResult<Shopvac>> Create([FromBody] ShopvacCreate dto)
		{
			this._context.Shopvacs.Add(new Shopvac
			{
				Id = dto.Id,
				IsOpen = dto.IsOpen,
			});
			await this._context.SaveChangesAsync();

			var shopvac = await this._context.Shopvacs.FindAsync(dto.Id);
			return CreatedAtRoute("Get", new { id = dto.Id }, shopvac);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult> Update(string id, [FromBody] ShopvacUpdate dto)
		{
			var shopvac = await this._context.Shopvacs.FindAsync(id);

			shopvac.IsOpen = dto.IsOpen;
			await this._context.SaveChangesAsync();

			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(string id)
		{
			var shopvac = await this._context.Shopvacs.FindAsync(id);

			this._context.Shopvacs.Remove(shopvac);
			await this._context.SaveChangesAsync();

			return NoContent();
		}
	}
}
