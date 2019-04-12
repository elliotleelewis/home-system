// <copyright file="ShopVac.cs" company="Elliot Lewis">
// Copyright (c) Elliot Lewis. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>

namespace ShopVac.Models
{
	using System;

	public class ShopVac : IEntityDate
	{
		public string Id { get; set; }

		public bool IsOpen { get; set; }

		public DateTime CreatedAt { get; set; }

		public DateTime? UpdatedAt { get; set; }
	}
}
