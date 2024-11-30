import type { Column } from "./Column.ts";
import { TextAlign } from "./Enums.ts";

/**
 * Class to represent a row in the table.
 */
export class Row {
	private max_size: number = 0;
	private width: number | null = null;
	private columns: Column[] = [];
	private border_style: string = "";
	private border_on: boolean = false;
	private align = TextAlign.LEFT;

    /** Define all columns on the row. */
	constructor(...columns: Column[]) {
		columns.forEach((item) => {
			this.columns.push(item);

			if (item.length > this.max_size) {
				this.max_size = item.length;
			}
		});
	}

    /** You can define the style of the borders of row. */
	public setBorderStyle(borderX: string = "") {
		this.border_style = borderX;
	}

    /** Get max size of characters in a Column. */
	public size(): number {
		return this.max_size;
	}

    /** Set max size of characters in a Column. */
	public setWidth(width: number) {
		this.width = width;
	}

    /** Active the borders to be rendered. */
	public border() {
		this.border_on = true;
	}

    /** Set text align in the column. */
	public setAlign(align: TextAlign) {
		this.align = align;
	}

    /** Get a array of all columns in the row. */
	public all_columns(): Column[] {
		return this.columns;
	}

    /** Return a string with the row formatted. */
	public render(num_cols: number | null = null): string {
		let chars: string[] = [];

		this.columns.forEach((item, index) => {
			const limit_coluns = num_cols ?? this.columns.length;

			if (index >= limit_coluns) {
				return;
			}

			const isize = item.length;
			let icontent = "";
            
			this.max_size = this.width ?? isize;

			if (this.width == null) {
				chars = item.toString().split("");
			} else {
				const _res = this.width - isize;

				if (this.align == TextAlign.LEFT) {
					if (isize < this.width) {
						icontent = item.toString().concat(" ".repeat(_res));
					} else {
						icontent = item.toString().substring(0, this.width);
					}
				}
				if (this.align == TextAlign.RIGHT) {
					if (isize < this.width) {
						icontent = " ".repeat(_res).concat(item.toString());
					} else {
						icontent = item.toString().substring(0, this.width);
					}
				}

				if (this.align == TextAlign.CENTER) {
					if (isize < this.width) {
						const margin_left = Math.floor(_res / 2);
						const margin_right = _res - margin_left;

						icontent = " "
							.repeat(margin_left)
							.concat(item.toString(), " ".repeat(margin_right));
					} else {
						icontent = item.toString().substring(0, this.width);
					}
				}
			}

            icontent = item.applyStyle(icontent)

            if (this.border_on) {
                if(index == 0){
                    icontent = `${this.border_style} ${icontent} ${this.border_style}`;
                }else{
                    icontent = ` ${icontent} ${this.border_style}`;
                }
            }else{

                icontent = ` ${icontent} `;
            }
			chars = chars.concat(icontent.split(""));
		});

		return chars.join("");
	}
}
