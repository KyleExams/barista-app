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

export interface OrderHistory {
	coffeeType: CoffeeType;
	orderDate: Date;
	pantryId: number;
}

export interface ReportGroup {
	name: string;
	series: ReportItem[];
}

export interface ReportItem {
	name: string;
	value: number;
}

export enum CoffeeType {
	DoubleAmericano = 1,
	SweetLatte = 2,
	FlatWhite = 3
}