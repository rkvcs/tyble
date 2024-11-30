# Tyble
Helper to create table on terminal.

#### Example to create a table:
````ts
    import { Column, Row, Table, TableStyle, TextAlign, TextStyle } from "@rkvcs/tyble";
    import { Chalk } from "npm:chalk";

    // Using chalk to format the columns.
    const chalk = new Chalk();
    
    const header = new Row(new Column("Col1"), new Column("Col2"))
    const footer = new Row(new Column(""), new Column(
			"TOTAL: 123",
			new TextStyle(chalk.blue).add(chalk.bold)
		))
    
    header.setAlign(TextAlign.CENTER)
    footer.setAlign(TextAlign.RIGHT)
    
    const table = new Table({
        columns: 2,
        width: 15,
        tableStyle: TableStyle.DEFAULT
    })

    table.addHeader(header)
    table.addFooter(footer)
    
    table.add(
        new Row(new Column("Line 1"), 
        new Column("Col 2"))
    )
    table.add(
        new Row(new Column("Line 2"), 
        new Column("Col 2"))
    )
    table.add(
        new Row(new Column("Line 3"), 
        new Column("Col 2"))
    )

    console.info(table.render())
````

Table's styles:

<img src="./screenshot.png" width="400"/>