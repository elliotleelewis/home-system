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
		public ActionResult<IEnumerable<BlastGate>> GetAll()
		{
			return this._dbContext.BlastGates;
		}

		[HttpPost("[action]", Name = "OpenAll")]
		public async Task<ActionResult> Open()
		{
			var blastGates = this._dbContext.BlastGates;

			foreach (var s in blastGates)
			{
				s.IsOpen = true;
			}

			await this._dbContext.SaveChangesAsync();

			await this._hubContext.Clients.All.BlastGatesUpdate(this._dbContext.BlastGates);

			return this.NoContent();
		}

		[HttpPost("[action]", Name = "CloseAll")]
		public async Task<ActionResult> Close()
		{
			var blastGates = this._dbContext.BlastGates;

			foreach (var s in blastGates)
			{
				s.IsOpen = false;
			}

			await this._dbContext.SaveChangesAsync();

			await this._hubContext.Clients.All.BlastGatesUpdate(this._dbContext.BlastGates);

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
			var blastGates = this._dbContext.BlastGates;

			var activate = await blastGates.FindAsync(id);
			if (activate == null)
			{
				return this.NotFound();
			}

			activate.IsOpen = true;

			var deactivate = blastGates.Where((s) => s.Id != id);
			foreach (var s in deactivate)
			{
				s.IsOpen = false;
			}

			await this._dbContext.SaveChangesAsync();

			await this._hubContext.Clients.All.BlastGatesUpdate(this._dbContext.BlastGates);

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

			await this._hubContext.Clients.All.BlastGatesUpdate(this._dbContext.BlastGates);

			var blastGate = await this._dbContext.BlastGates.FindAsync(dto.Id);
			return this.CreatedAtRoute("Get", new { id = dto.Id }, blastGate);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult> Update(string id, [FromBody] BlastGateUpdate dto)
		{
			var blastGate = await this._dbContext.BlastGates.FindAsync(id);
			if (blastGate == null)
			{
				return this.NotFound();
			}

			blastGate.IsOpen = dto.IsOpen;
			await this._dbContext.SaveChangesAsync();

			await this._hubContext.Clients.All.BlastGatesUpdate(this._dbContext.BlastGates);

			return this.NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(string id)
		{
			var blastGate = await this._dbContext.BlastGates.FindAsync(id);
			if (blastGate == null)
			{
				return this.NotFound();
			}

			this._dbContext.BlastGates.Remove(blastGate);
			await this._dbContext.SaveChangesAsync();

			await this._hubContext.Clients.All.BlastGatesUpdate(this._dbContext.BlastGates);

			return this.NoContent();
		}
	}
}
