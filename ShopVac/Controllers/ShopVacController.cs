using Microsoft.AspNetCore.SignalR;
using ShopVac.Hubs;

namespace ShopVac.Controllers
{
	using System.Collections.Generic;
	using System.Linq;
	using System.Threading.Tasks;
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.EntityFrameworkCore;
	using ShopVac.Models;
	using ShopVac.Models.Dto;

	[Route("api/[controller]")]
	[ApiController]
	public class ShopVacController : ControllerBase
	{
		private readonly PostgresContext _dbContext;
		private readonly IHubContext<ShopVacHub, ITypedHubClient> _hubContext;

		public ShopVacController(PostgresContext dbContext, IHubContext<ShopVacHub, ITypedHubClient> hubContext)
		{
			this._dbContext = dbContext;
			this._hubContext = hubContext;
		}

		[HttpGet]
		public async Task<ActionResult<List<ShopVac>>> GetAll()
		{
			return await this._dbContext.ShopVacs.ToListAsync();
		}

		[HttpPost("[action]", Name = "OpenAll")]
		public async Task<ActionResult> Open()
		{
			var shopVacs = await this._dbContext.ShopVacs.ToListAsync();

			foreach (var s in shopVacs)
			{
				s.IsOpen = true;
			}
			await this._dbContext.SaveChangesAsync();

			this._hubContext.Clients.All.Update(await this._dbContext.ShopVacs.ToListAsync());

			return NoContent();
		}

		[HttpPost("[action]", Name = "CloseAll")]
		public async Task<ActionResult> Close()
		{
			var shopVacs = await this._dbContext.ShopVacs.ToListAsync();

			foreach (var s in shopVacs)
			{
				s.IsOpen = false;
			}
			await this._dbContext.SaveChangesAsync();

			this._hubContext.Clients.All.Update(await this._dbContext.ShopVacs.ToListAsync());

			return NoContent();
		}

		[HttpGet("{id}", Name = "Get")]
		public async Task<ActionResult<ShopVac>> GetById(string id)
		{
			var shopVac = await this._dbContext.ShopVacs.FindAsync(id);
			if (shopVac == null)
			{
				return NotFound();
			}
			return shopVac;
		}

		[HttpPost("{id}/[action]", Name = "Activate")]
		public async Task<ActionResult> Activate(string id)
		{
			var shopVacs = await this._dbContext.ShopVacs.ToListAsync();

			var activate = shopVacs.Find((s) => s.Id == id);
			if (activate == null)
			{
				return NotFound();
			}
			activate.IsOpen = true;

			var deactivate = shopVacs.Where((s) => s.Id != id).ToList();
			foreach (var s in deactivate)
			{
				s.IsOpen = false;
			}

			await this._dbContext.SaveChangesAsync();

			this._hubContext.Clients.All.Update(await this._dbContext.ShopVacs.ToListAsync());

			return NoContent();
		}

		[HttpPost]
		public async Task<ActionResult<ShopVac>> Create([FromBody] ShopVacCreate dto)
		{
			this._dbContext.ShopVacs.Add(new ShopVac
			{
				Id = dto.Id,
				IsOpen = dto.IsOpen,
			});
			await this._dbContext.SaveChangesAsync();

			this._hubContext.Clients.All.Update(await this._dbContext.ShopVacs.ToListAsync());

			var shopVac = await this._dbContext.ShopVacs.FindAsync(dto.Id);
			return CreatedAtRoute("Get", new { id = dto.Id }, shopVac);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult> Update(string id, [FromBody] ShopVacUpdate dto)
		{
			var shopVac = await this._dbContext.ShopVacs.FindAsync(id);

			shopVac.IsOpen = dto.IsOpen;
			await this._dbContext.SaveChangesAsync();

			this._hubContext.Clients.All.Update(await this._dbContext.ShopVacs.ToListAsync());

			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(string id)
		{
			var shopVac = await this._dbContext.ShopVacs.FindAsync(id);

			this._dbContext.ShopVacs.Remove(shopVac);
			await this._dbContext.SaveChangesAsync();

			this._hubContext.Clients.All.Update(await this._dbContext.ShopVacs.ToListAsync());

			return NoContent();
		}
	}
}
