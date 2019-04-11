namespace ShopVac.Hubs
{
	using System.Collections.Generic;
	using System.Threading.Tasks;
	using ShopVac.Models;

	public interface ITypedHubClient
	{
		Task Update(List<ShopVac> shopVacs);
	}
}
