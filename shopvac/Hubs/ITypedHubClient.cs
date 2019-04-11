namespace shopvac.Hubs
{
	using System.Collections.Generic;
	using System.Threading.Tasks;
	using shopvac.Models;

	public interface ITypedHubClient
	{
		Task Update(List<Shopvac> shopvacs);
	}
}
