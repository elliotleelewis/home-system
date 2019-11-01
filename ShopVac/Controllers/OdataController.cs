// <copyright file="OdataController.cs" company="Elliot Lewis">
// Copyright (c) Elliot Lewis. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
namespace ShopVac.Controllers
{
	using System.Collections.Generic;
	using Microsoft.AspNet.OData;
	using Microsoft.AspNetCore.Mvc;
	using ShopVac.Models;

	[Route("api/[controller]")]
	[ApiController]
	public class OdataController
	{
		private readonly PostgresContext _dbContext;

		public OdataController(PostgresContext dbContext)
		{
			this._dbContext = dbContext;
		}

		[EnableQuery]
		[HttpGet("[action]")]
		public IEnumerable<BlastGate> BlastGate()
		{
			return this._dbContext.BlastGates;
		}
	}
}
