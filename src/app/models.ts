export interface Pantry {
	id: number;
	name: string;
	inventory: Inventory;
}

export interface Inventory {
	coffeeBeansUnits: number;
	sugarUnits: number;
	milkUnits: number;
}

export enum CoffeeType {
	DoubleAmericano = 1,
	SweetLatte = 2,
	FlatWhite = 3
}