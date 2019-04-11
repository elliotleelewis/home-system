namespace ShopVac
{
	using Microsoft.AspNetCore;
	using Microsoft.AspNetCore.Hosting;
	using Microsoft.EntityFrameworkCore;
	using Microsoft.Extensions.DependencyInjection;
	using ShopVac.Models;

	public static class Program
	{
		public static void Main(string[] args)
		{
			CreateWebHostBuilder(args)
				.Build()
				.MigrateDatabase()
				.Run();
		}

		private static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
			WebHost.CreateDefaultBuilder(args)
				.UseStartup<Startup>();

		private static IWebHost MigrateDatabase(this IWebHost webHost)
		{
			var serviceScopeFactory = (IServiceScopeFactory)webHost.Services.GetService(typeof(IServiceScopeFactory));

			using (var scope = serviceScopeFactory.CreateScope())
			{
				var services = scope.ServiceProvider;
				var dbContext = services.GetRequiredService<PostgresContext>();

				dbContext.Database.EnsureCreated();
			}

			return webHost;
		}
	}
}
