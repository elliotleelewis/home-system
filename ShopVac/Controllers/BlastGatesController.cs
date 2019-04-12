// <copyright file="BlastGatesController.cs" company="Elliot Lewis">
// Copyright (c) Elliot Lewis. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>

namespace ShopVac.Controllers
{
	using System.Collections.Generic;
	using System.Linq;
	using System.Threading.Tasks;
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.AspNetCore.SignalR;
	using Microsoft.EntityFrameworkCore;
	using ShopVac.Hubs;
	using ShopVac.Models;
	using ShopVac.Models.Dto;

	[Route("api/[controller]")]
	[ApiController]
	public class BlastGatesController : ControllerBase
	{
		private readonly PostgresContext _dbContext;
		private readonly IHubContext<ShopVacHub, ITypedHubClient> _hubContext;

		public BlastGatesController(PostgresContext dbContext, IHubContext<ShopVacHub, ITypedHubClient> hubContext)
		{
			this._dbContext = dbContext;
			this._hubContext = hubContext;
		}

		[HttpGet]
		public async Task<ActionResult<List<BlastGate>>> GetAll()
		{
			return await this._dbContext.BlastGates.ToListAsync();
		}

		[HttpPost("[action]", Name = "OpenAll")]
		public async Task<ActionResult> Open()
		{
			var blastGates = await this._dbContext.BlastGates.ToListAsync();

			foreach (var s in blastGates)
			{
				s.IsOpen = true;
			}

			await this._dbContext.SaveChangesAsync();

			await this._hubContext.Clients.All.BlastGatesUpdate(await this._dbContext.BlastGates.ToListAsync());

			return this.NoContent();
		}

		[HttpPost("[action]", Name = "CloseAll")]
		public async Task<ActionResult> Close()
		{
			var blastGates = await this._dbContext.BlastGates.ToListAsync();

			foreach (var s in blastGates)
			{
				s.IsOpen = false;
			}

			await this._dbContext.SaveChangesAsync();

			await this._hubContext.Clients.All.BlastGatesUpdate(await this._dbContext.BlastGates.ToListAsync());

			return this.NoContent();
		}

		[HttpGet("{id}", Name = "Get")]
		public async Task<ActionResult<BlastGate>> GetById(string id)
		{
			var blastGate = await this._dbContext.BlastGates.FindAsync(id);
			if (blastGate == null)
			{
				return this.NotFound();
			}

			return blastGate;
		}

		[HttpPost("{id}/[action]", Name = "Activate")]
		public async Task<ActionResult> Activate(string id)
		{
			var blastGates = await this._dbContext.BlastGates.ToListAsync();

			var activate = blastGates.Find((s) => s.Id == id);
			if (activate == null)
			{
				return this.NotFound();
			}

			activate.IsOpen = true;

			var deactivate = blastGates.Where((s) => s.Id != id).ToList();
			foreach (var s in deactivate)
			{
				s.IsOpen = false;
			}

			await this._dbContext.SaveChangesAsync();

			await this._hubContext.Clients.All.BlastGatesUpdate(await this._dbContext.BlastGates.ToListAsync());

			return this.NoContent();
		}

		[HttpPost]
		public async Task<ActionResult<BlastGate>> Create([FromBody] BlastGateCreate dto)
		{
			this._dbContext.BlastGates.Add(new BlastGate
			{
				Id = dto.Id,
				IsOpen = dto.IsOpen,
			});
			await this._dbContext.SaveChangesAsync();

			await this._hubContext.Clients.All.BlastGatesUpdate(await this._dbContext.BlastGates.ToListAsync());

			var blastGate = await this._dbContext.BlastGates.FindAsync(dto.Id);
			return this.CreatedAtRoute("Get", new { id = dto.Id }, blastGate);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult> Update(string id, [FromBody] BlastGateUpdate dto)
		{
			var blastGate = await this._dbContext.BlastGates.FindAsync(id);

			blastGate.IsOpen = dto.IsOpen;
			await this._dbContext.SaveChangesAsync();

			await this._hubContext.Clients.All.BlastGatesUpdate(await this._dbContext.BlastGates.ToListAsync());

			return this.NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(string id)
		{
			var shopVac = await this._dbContext.BlastGates.FindAsync(id);

			this._dbContext.BlastGates.Remove(shopVac);
			await this._dbContext.SaveChangesAsync();

			await this._hubContext.Clients.All.BlastGatesUpdate(await this._dbContext.BlastGates.ToListAsync());

			return this.NoContent();
		}
	}
}
