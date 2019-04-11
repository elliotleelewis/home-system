using System;

namespace shopvac.Models
{
	public class Shopvac : IEntityDate
	{
		public string Id { get; set; }
		public bool IsOpen { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime? UpdatedAt { get; set; }
	}
}
