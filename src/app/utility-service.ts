import { CoffeeType } from './models';

export class UtilityService {
	GetCoffeeName(coffeeType: CoffeeType): string {
		switch (coffeeType) {
			case CoffeeType.DoubleAmericano:
				return "Double Americano";
			case CoffeeType.SweetLatte:
				return "Sweet Latte";
			case CoffeeType.FlatWhite:
				return "Flat White";
		};
	}
}

