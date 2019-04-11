using System;

namespace shopvac.Models
{
	public interface IEntityDate
	{
		DateTime CreatedAt { get; set; }
		DateTime? UpdatedAt { get; set; }
	}
}
