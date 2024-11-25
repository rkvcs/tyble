import { TextAlign } from "./Enums.ts";

export class Row{
    private max_size:number = 0
    private width:number|null = null
    private columns: string[] = []
    private border_style:string = ""
    private border_on:boolean = false
    private align = TextAlign.LEFT

    constructor( ...columns: string[]){
        columns.forEach(item => {
            this.columns.push(item)
            if(item.length > this.max_size){
                this.max_size = item.length
            }
        });
    }

    public setBorderStyle(borderX: string = ""){
        this.border_style = borderX
    }

    public size():number{
        return this.max_size
    }

    public setWidth(width: number){
        this.width=width
    }

    public border(){
        this.border_on = true
    }

    public setAlign(align: TextAlign){
        this.align = align
    }

    public all_columns(): string[]{
        return this.columns
    }

    public render(num_cols: number|null = null): string{
        let chars: string[] = []

        this.columns.forEach( (item, index) => {
            const limit_coluns = num_cols ?? this.columns.length
            
            if(index >= limit_coluns){
                return
            }

            const isize = item.length
            let icontent = ""
            this.max_size = this.width ?? isize

            if(this.border_on){
                chars.push(this.border_style)
            }

            if(this.width == null){
                chars = item.split("")
            }else{
                const _res = (this.width - isize)

                if(this.align == TextAlign.LEFT){
                    if(isize < this.width){
                        icontent = item.concat(" ".repeat(_res))
                    }else{
                        icontent = item.substring(0, this.width)
                    }
                }
                if(this.align == TextAlign.RIGHT){
                    if(isize < this.width){
                        icontent = " ".repeat(_res).concat(item)
                    }else{
                        icontent = item.substring(0, this.width)
                    }
                }

                if(this.align == TextAlign.CENTER){
                    if(isize < this.width){
                        const margin_left = Math.floor(_res/2);
                        const margin_right = _res - margin_left

                        icontent = " ".repeat(margin_left).concat(item, " ".repeat(margin_right))
                    }else{
                        icontent = item.substring(0, this.width)
                    }
                }
            }
            icontent = ` ${icontent} `
            chars = chars.concat(icontent.split(""))
        })

        if(this.border_on){
            chars.push(this.border_style)
        }
        
        return chars.join("")
    }
}