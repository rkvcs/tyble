import type { Row } from "./Row.ts";
import { TableStyle } from "./Enums.ts";

export class Table{
    private rows: Row[] = []
    private max_size:number = 0
    private border_on:boolean = true
    private header:Row|null = null
    private footer:Row|null = null

    private width:number|null
    private columns:number|null
    private tableStyle: TableStyle

    /**
     * 
     * @param .columns number total of columns that will be rendered
     * @param .width max number of character that will be rendered
     * @param .tableStyle style of the table (SIMPLE, DEFAULT, NONE)
     */
    constructor({
        columns= null,
        width= null,
        tableStyle= TableStyle.NONE
    }:{
        columns?: number|null, 
        width?:number|null,
        tableStyle?: TableStyle
    }){
        this.columns = columns
        this.width = width
        this.tableStyle = tableStyle

        if(this.tableStyle == TableStyle.NONE){
            this.border_on = false
        }

        if(this.width != null){
            this.max_size = this.width
        }
    }

    /** Change the style of the table. */
    public setStyle(tableStyle: TableStyle){
        this.tableStyle = tableStyle

        if(this.tableStyle == TableStyle.DEFAULT){
            this.header?.setBorderStyle('|')
            this.footer?.setBorderStyle('|')
        }else{
            this.header?.setBorderStyle('')
            this.footer?.setBorderStyle('')
        }

        this.rows.forEach(item => {
            if(this.tableStyle == TableStyle.DEFAULT){
                item.setBorderStyle('|')
            }else{
                item.setBorderStyle('')
            }
        })
    }

    /** Add new row to table. */
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

    /** It will enable rendering the borders (if deactivated). */
    public border(){
        this.border_on = true
    }

    /** Generates a line that represents a divider between rows. */
    public divider():string {

        if(this.border_on){
            if(this.tableStyle == TableStyle.DEFAULT){
                return `+`.concat('-'.repeat(this.max_size+2)).repeat(this.columns ?? 1).concat('+')+'\n'
            }
            if(this.tableStyle == TableStyle.SIMPLE){
                return ' ' + ('-'.repeat(this.max_size+2)).repeat(this.columns ?? 1) + '- \n'
            }
        }

        return ""
    }

    /** Register a header on the table. */
    public addHeader(header: Row){
        this.header = header
    }

    /** Register a footer on the table. */
    public addFooter(footer: Row){
        this.footer = footer
    }

    /** Return a string with the table formatted. */
    public render():string {
        let tb_str:string = ""

        // Header
        if(this.header){

            this.header.setWidth(this.max_size)
            
            if(this.border_on){
                this.header.border()
            }
            
            if(this.tableStyle == TableStyle.DEFAULT){
                this.header.setBorderStyle('|')
                tb_str = tb_str.concat(`${this.divider()}`)
            }

            tb_str = tb_str.concat(`${this.header.render()}`, '\n')
        }

        // Body
        if(this.border_on){
            tb_str = tb_str.concat(`${this.divider()}`)
        }

        this.rows.forEach(row => {
            if(this.border_on){
                row.border()
            }
            if(this.tableStyle == TableStyle.DEFAULT){
                row.setBorderStyle('|')
            }
            row.setWidth(this.max_size)
            tb_str = tb_str.concat(`${row.render(this.columns)}`, '\n')
        })

        if(this.border_on){
            tb_str = tb_str.concat(`${this.divider()}`)
        }
        
        //Footer
        if(this.footer){
            this.footer.setWidth(this.max_size)

            if(this.border_on){
                this.footer.border()
            }

            if(this.tableStyle == TableStyle.DEFAULT){
                this.footer.setBorderStyle('|')
            }
            
            
            tb_str = tb_str.concat(`${this.footer.render()}`, '\n')
            
            if(this.border_on && this.tableStyle == TableStyle.DEFAULT){
                tb_str = tb_str.concat(`${this.divider()}`)
            }
        }
        
        return tb_str
    }

}