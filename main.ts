enum TextAlign {
    LEFT,
    RIGHT,
    CENTER
}

enum TableStyle {
    SIMPLE,
    DEFAULT,
    NONE
}

class Row{
    private max_size:number = 0
    private width:number|null = null
    private columns: string[] = []
    private border_style:string = ''
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

    public setBorderStyle(borderX: string){
        this.border_style = borderX
    }

    public size(){
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

    public all_columns(){
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
                chars = chars.concat("", item.split(""), "")
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

class Table{
    private rows: Row[] = []
    private max_size:number = 0
    private border_on:boolean = false
    private header:Row|null = null
    private footer:Row|null = null

    private width:number|null
    private columns:number|null
    private tableStyle: TableStyle

    constructor({
        columns= null,
        width= null,
        tableStyle= TableStyle.DEFAULT
    }:{
        columns?: number|null, 
        width?:number|null,
        tableStyle?: TableStyle
    }){
        this.columns = columns
        this.width = width
        this.tableStyle = tableStyle

        if(this.width != null){
            this.max_size = this.width
        }
    }

    public add(row: Row){
        if(this.width == null){
            row.all_columns().forEach(item => {
                if(this.max_size < item.length){
                    this.max_size = item.length
                }
            })
        }
        this.rows.push(row)
    }

    public border(){
        this.border_on = true
    }

    public divider(){

        if(this.border_on){
            if(this.tableStyle == TableStyle.DEFAULT){
                return `+`.concat('-'.repeat(this.max_size+2)).repeat(this.columns).concat('+')
            }
            if(this.tableStyle == TableStyle.SIMPLE){
                return '-'.repeat(this.max_size+2).repeat(this.columns)
            }
        }

        return ""

    }

    public addHeader(header: Row){
        this.header = header
    }
    public addFooter(footer: Row){
        this.footer = footer
    }

    public render(){
        // Header
        if(this.header){
            
            if(this.border_on){
                this.header.border()
            }

            if(this.tableStyle == TableStyle.DEFAULT){
                this.header.setBorderStyle('|')
            }

            this.header.setWidth(this.max_size)
            console.info(this.divider())
            console.info(`${this.header.render()}`)
        }

        // Body
        if(this.border_on){
            console.info(this.divider())
        }

        this.rows.forEach(row => {
            if(this.border_on){
                row.border()
            }
            if(this.tableStyle == TableStyle.DEFAULT){
                row.setBorderStyle('|')
            }
            row.setWidth(this.max_size)
            console.info(`${row.render(this.columns)}`)
        })

        if(this.border_on){
            console.info(this.divider())
        }
        
        //Footer
        if(this.footer){
            if(this.border_on){
                this.footer.border()
            }

            if(this.tableStyle == TableStyle.DEFAULT){
                this.footer.setBorderStyle('|')
            }
            
            this.footer.setWidth(this.max_size)
            console.info(`${this.footer.render()}`)
            
            if(this.border_on){
                console.info(this.divider())
            }
        }
    }

}

export function main():void{
    const header = new Row("Col1", "Col2")
    const footer = new Row("", "TOTAL: 123")
    const row = new Row("Hello...", "World")
    const row2 = new Row("Aoba", "Mundao", "Trem")
    
    row2.setAlign(TextAlign.CENTER)
    footer.setAlign(TextAlign.RIGHT)
    
    const table = new Table({
        columns: 2,
        width: 15,
        tableStyle: TableStyle.DEFAULT
    })
    table.addHeader(header)
    table.addFooter(footer)
    table.add(row)
    table.add(row)
    table.add(row)
    table.add(row)
    table.add(row2)
    table.border()
    table.render()
    
}



if (import.meta.main) {
  main()
}
