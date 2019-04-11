using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace shopvac.Models
{
	using Microsoft.EntityFrameworkCore;

	public class PostgresContext : DbContext
	{
		public DbSet<Shopvac> Shopvacs { get; set; }

		public PostgresContext(DbContextOptions options)
			: base(options)
		{
		}

		public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
		{
			var AddedEntities = ChangeTracker.Entries<IEntityDate>().Where((E) => E.State == EntityState.Added).ToList();

			AddedEntities.ForEach((E) =>
			{
				E.Property("CreatedAt").CurrentValue = DateTime.Now;
			});

			var EditedEntities = ChangeTracker.Entries<IEntityDate>().Where(E => E.State == EntityState.Modified).ToList();

			EditedEntities.ForEach((E) =>
			{
				E.Property("UpdatedAt").CurrentValue = DateTime.Now;
			});

			return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
		}
	}
}
