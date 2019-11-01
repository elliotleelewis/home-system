// <copyright file="PostgresContext.cs" company="Elliot Lewis">
// Copyright (c) Elliot Lewis. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
namespace ShopVac.Models
{
	using System;
	using System.Linq;
	using System.Threading;
	using System.Threading.Tasks;
	using Microsoft.EntityFrameworkCore;

	public class PostgresContext : DbContext
	{
		public PostgresContext(DbContextOptions options)
			: base(options)
		{
		}

		public DbSet<BlastGate> BlastGates { get; set; }

		public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
		{
			this.ChangeTracker
				.Entries<IEntityDate>()
				.Where((e) => e.State == EntityState.Added)
				.ToList()
				.ForEach((e) =>
				{
					e.Property("CreatedAt").CurrentValue = DateTime.Now;
				});

			this.ChangeTracker
				.Entries<IEntityDate>()
				.Where((e) => e.State == EntityState.Modified)
				.ToList()
				.ForEach((e) =>
				{
					e.Property("UpdatedAt").CurrentValue = DateTime.Now;
				});

			return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
		}
	}
}
