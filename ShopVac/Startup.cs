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
	using Microsoft.AspNetCore.OData;
	using Microsoft.AspNetCore.OData.Formatter;
	using Microsoft.AspNetCore.Routing;
	using Microsoft.EntityFrameworkCore;
	using Microsoft.Extensions.Configuration;
	using Microsoft.Extensions.DependencyInjection;
	using Microsoft.Extensions.Hosting;
	using Microsoft.Net.Http.Headers;
	using Microsoft.OpenApi.Models;
	using ShopVac.Hubs;
	using ShopVac.Models;

	public class Startup
	{
		public Startup(IConfiguration configuration, IWebHostEnvironment environment)
		{
			this.Configuration = configuration;
			this.Environment = environment;
		}

		private IConfiguration Configuration { get; }

		private IWebHostEnvironment Environment { get; }

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app)
		{
			if (this.Environment.IsDevelopment())
			{
				app.UseCors();
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI((c) => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "ShopVac"); });
			}

			app.UseHttpsRedirection();
			app.UseResponseCaching();
			app.UseResponseCompression();

			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints((endpoints) =>
			{
				endpoints.MapControllerRoute(
					name: "default",
					pattern: "{controller}/{action=Index}/{id?}");
				endpoints.MapHub<ShopVacHub>("/signalr");
			});
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.Configure<RouteOptions>((options) => options.LowercaseUrls = true);
			services.AddResponseCaching();
			services.AddResponseCompression();

			services.AddControllers();
			services.AddOData();
			services.AddSignalR();

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

			services.AddMvcCore(options =>
			{
				foreach (var outputFormatter in options.OutputFormatters.OfType<ODataOutputFormatter>().Where((_) => _.SupportedMediaTypes.Count == 0))
				{
					outputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
				}

				foreach (var inputFormatter in options.InputFormatters.OfType<ODataInputFormatter>().Where((_) => _.SupportedMediaTypes.Count == 0))
				{
					inputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
				}
			});

			services.AddDbContext<PostgresContext>((options) =>
				options.UseNpgsql(this.Configuration.GetConnectionString("DefaultConnection")));

			services.AddSwaggerGen((c) =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "ShopVac", Version = "v1" });
				c.IncludeXmlComments(Path.Combine(System.AppContext.BaseDirectory, "ShopVac.xml"));
			});
		}
	}
}
