using System;

namespace ShopVac.Models
{
	public interface IEntityDate
	{
		DateTime CreatedAt { get; set; }
		DateTime? UpdatedAt { get; set; }
	}
}
