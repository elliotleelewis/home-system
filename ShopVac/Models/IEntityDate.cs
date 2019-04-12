// <copyright file="IEntityDate.cs" company="Elliot Lewis">
// Copyright (c) Elliot Lewis. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>

namespace ShopVac.Models
{
	using System;

	public interface IEntityDate
	{
		DateTime CreatedAt { get; set; }

		DateTime? UpdatedAt { get; set; }
	}
}
