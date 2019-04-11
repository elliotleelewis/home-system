using Microsoft.AspNetCore.SignalR;
using shopvac.Hubs;

namespace shopvac.Controllers
{
	using System.Collections.Generic;
	using System.Linq;
	using System.Threading.Tasks;
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.EntityFrameworkCore;
	using shopvac.Models;
	using shopvac.Models.Dto;

	[Route("api/[controller]")]
	[ApiController]
	public class ShopvacController : ControllerBase
	{
		private readonly PostgresContext _dbContext;
		private readonly IHubContext<ShopvacHub, ITypedHubClient> _hubContext;

		public ShopvacController(PostgresContext dbContext, IHubContext<ShopvacHub, ITypedHubClient> hubContext)
		{
			this._dbContext = dbContext;
			this._hubContext = hubContext;
		}

		[HttpGet]
		public async Task<ActionResult<List<Shopvac>>> GetAll()
		{
			return await this._dbContext.Shopvacs.ToListAsync();
		}

		[HttpPost("[action]", Name = "OpenAll")]
		public async Task<ActionResult> Open()
		{
			var shopvacs = await this._dbContext.Shopvacs.ToListAsync();

			foreach (var s in shopvacs)
			{
				s.IsOpen = true;
			}
			await this._dbContext.SaveChangesAsync();

			this._hubContext.Clients.All.Update(await this._dbContext.Shopvacs.ToListAsync());

			return NoContent();
		}

		[HttpPost("[action]", Name = "CloseAll")]
		public async Task<ActionResult> Close()
		{
			var shopvacs = await this._dbContext.Shopvacs.ToListAsync();

			foreach (var s in shopvacs)
			{
				s.IsOpen = false;
			}
			await this._dbContext.SaveChangesAsync();

			this._hubContext.Clients.All.Update(await this._dbContext.Shopvacs.ToListAsync());

			return NoContent();
		}

		[HttpGet("{id}", Name = "Get")]
		public async Task<ActionResult<Shopvac>> GetById(string id)
		{
			var shopvac = await this._dbContext.Shopvacs.FindAsync(id);
			if (shopvac == null)
			{
				return NotFound();
			}
			return shopvac;
		}

		[HttpPost("{id}/[action]", Name = "Activate")]
		public async Task<ActionResult> Activate(string id)
		{
			var shopvacs = await this._dbContext.Shopvacs.ToListAsync();

			var activate = shopvacs.Find((s) => s.Id == id);
			if (activate == null)
			{
				return NotFound();
			}
			activate.IsOpen = true;

			var deactivate = shopvacs.Where((s) => s.Id != id).ToList();
			foreach (var s in deactivate)
			{
				s.IsOpen = false;
			}

			await this._dbContext.SaveChangesAsync();

			this._hubContext.Clients.All.Update(await this._dbContext.Shopvacs.ToListAsync());

			return NoContent();
		}

		[HttpPost]
		public async Task<ActionResult<Shopvac>> Create([FromBody] ShopvacCreate dto)
		{
			this._dbContext.Shopvacs.Add(new Shopvac
			{
				Id = dto.Id,
				IsOpen = dto.IsOpen,
			});
			await this._dbContext.SaveChangesAsync();

			this._hubContext.Clients.All.Update(await this._dbContext.Shopvacs.ToListAsync());

			var shopvac = await this._dbContext.Shopvacs.FindAsync(dto.Id);
			return CreatedAtRoute("Get", new { id = dto.Id }, shopvac);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult> Update(string id, [FromBody] ShopvacUpdate dto)
		{
			var shopvac = await this._dbContext.Shopvacs.FindAsync(id);

			shopvac.IsOpen = dto.IsOpen;
			await this._dbContext.SaveChangesAsync();

			this._hubContext.Clients.All.Update(await this._dbContext.Shopvacs.ToListAsync());

			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(string id)
		{
			var shopvac = await this._dbContext.Shopvacs.FindAsync(id);

			this._dbContext.Shopvacs.Remove(shopvac);
			await this._dbContext.SaveChangesAsync();

			this._hubContext.Clients.All.Update(await this._dbContext.Shopvacs.ToListAsync());

			return NoContent();
		}
	}
}
