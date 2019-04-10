namespace shopvac.Models
{
	using Microsoft.EntityFrameworkCore;

	public class PostgresContext : DbContext
	{
		public PostgresContext(DbContextOptions options)
			: base(options)
		{
		}
	}
}
