namespace shopvac
{
	using System.IO;
	using System.Linq;
	using Microsoft.AspNetCore.Builder;
	using Microsoft.AspNetCore.Hosting;
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.EntityFrameworkCore;
	using Microsoft.Extensions.Configuration;
	using Microsoft.Extensions.DependencyInjection;
	using shopvac.Hubs;
	using shopvac.Models;
	using Swashbuckle.AspNetCore.Swagger;

	public class Startup
	{
		private IConfiguration Configuration { get; }
		private IHostingEnvironment Environment { get; }

		public Startup(IConfiguration configuration, IHostingEnvironment environment)
		{
			Configuration = configuration;
			Environment = environment;
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app)
		{
			if (Environment.IsDevelopment())
			{
				app.UseCors();
				app.UseDeveloperExceptionPage();
				app.UseSwagger((o) =>
				{
					o.PreSerializeFilters.Add((document, request) =>
					{
						document.Paths =
							document.Paths.ToDictionary(p => p.Key.ToLowerInvariant(), p => p.Value);
					});
				});
				app.UseSwaggerUI((c) => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "shopvac"); });
			}

			app.UseSignalR(routes =>
			{
				routes.MapHub<VacuumHub>("/signalr");
			});

			app.UseMvc();
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			if (Environment.IsDevelopment())
			{
				services.AddCors((options) =>
				{
					options.AddDefaultPolicy((builder) =>
					{
						builder.WithOrigins("http://localhost:4200")
							.AllowAnyHeader()
							.AllowAnyMethod()
							.AllowCredentials();
					});
				});
			}

			services.AddDbContext<PostgresContext>((options) =>
				options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

			services.AddSignalR();

			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

			services.AddSwaggerGen((c) =>
			{
				c.SwaggerDoc("v1", new Info {Title = "shopvac", Version = "v1"});
				c.IncludeXmlComments(Path.Combine(System.AppContext.BaseDirectory, "shopvac.xml"));
			});
		}
	}
}
