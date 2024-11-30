import type { TextStyle } from "./TextStyle.ts";

/**
 * Class to represent a column in the row.
 */
export class Column {
	public length: number;

    /** Define the text and style of column. */
	constructor(private value: string, private styles?: TextStyle) {
		this.length = this.value.length;
	}

	toString(): string {
		return this.value;
	}

    /** Return a string with all styles registered on the column. */
	applyStyle(_str: string): string {
		if (this.styles) {
			return this.styles.apply(_str);
		}

		return _str;
	}

    /** Get the text of the column formatted. */
	get formatted(): string {
		if (this.styles) {
			return this.styles.apply(this.value);
		}

		return this.value;
	}
}
