// <copyright file="ITypedHubClient.cs" company="Elliot Lewis">
// Copyright (c) Elliot Lewis. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>

namespace ShopVac.Hubs
{
	using System.Collections.Generic;
	using System.Threading.Tasks;
	using ShopVac.Models;

	public interface ITypedHubClient
	{
		Task BlastGatesUpdate(List<BlastGate> blastGates);
	}
}
