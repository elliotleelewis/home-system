// <copyright file="Startup.cs" company="Elliot Lewis">
// Copyright (c) Elliot Lewis. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>

namespace ShopVac
{
	using System.IO;
	using System.Linq;
	using Microsoft.AspNetCore.Builder;
	using Microsoft.AspNetCore.Hosting;
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.EntityFrameworkCore;
	using Microsoft.Extensions.Configuration;
	using Microsoft.Extensions.DependencyInjection;
	using ShopVac.Hubs;
	using ShopVac.Models;
	using Swashbuckle.AspNetCore.Swagger;

	public class Startup
	{
		public Startup(IConfiguration configuration, IHostingEnvironment environment)
		{
			this.Configuration = configuration;
			this.Environment = environment;
		}

		private IConfiguration Configuration { get; }

		private IHostingEnvironment Environment { get; }

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app)
		{
			if (this.Environment.IsDevelopment())
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
				app.UseSwaggerUI((c) => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "ShopVac"); });
			}

			app.UseSignalR((routes) => routes.MapHub<ShopVacHub>("/signalr"));

			app.UseMvc();
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			if (this.Environment.IsDevelopment())
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
				options.UseNpgsql(this.Configuration.GetConnectionString("DefaultConnection")));

			services.AddSignalR();

			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

			services.AddSwaggerGen((c) =>
			{
				c.SwaggerDoc("v1", new Info { Title = "ShopVac", Version = "v1" });
				c.IncludeXmlComments(Path.Combine(System.AppContext.BaseDirectory, "ShopVac.xml"));
			});
		}
	}
}
