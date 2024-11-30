/**
 * Class to apply some style on column text.
 * 
 * You can pass a function that receive a string and return another string:
 * 
 * ```ts
 *      // TextStyle((text:string) => string)
 *      let youTextStyle = new TextStyle(function(_str:string) {
 *          return _str.toUpperCase()
 *      })
 * ```
 * 
 * To add more than one style:
 * 
 * ```ts
 *      youTextStyle.add(function(_str:string) {
 *          return _str.trim()
 *      })
 * ```
 */
export class TextStyle {
	private fns: [(text: string) => string];

	constructor(fn: (text: string) => string) {
        this.fns = [fn]
        return this
	}

    add(fn: (text: string) => string): TextStyle{
        this.fns.push(fn);
        return this
    }

    /** Apply all styles and return the text formatted. */
	apply(_str: string): string {
        
		this.fns.forEach((style) => {
			_str = style(_str);
		});

		return _str;
	}
}
