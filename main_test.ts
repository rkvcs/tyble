import { assertEquals } from "jsr:@std/assert";
import { TableStyle, TextAlign } from "./src/Enums.ts";
import { Table } from "./src/Table.ts";
import { Row } from "./src/Row.ts";
import { Column } from "./src/Column.ts";
import { TextStyle } from "./src/TextStyle.ts";
import { Chalk } from "npm:chalk";

Deno.test("Verifying table structure.", () => {
    const chalk = new Chalk();
	const header = new Row(
		new Column(
			"Col1",
			new TextStyle(chalk.blue).add(chalk.bold)
		),
		new Column(
			"Col2",
			new TextStyle(chalk.magenta).add(chalk.italic)
		)
	);
	const footer = new Row(new Column(""), new Column("TOTAL: 123", new TextStyle(chalk.green)));

	header.setAlign(TextAlign.CENTER);
	footer.setAlign(TextAlign.RIGHT);

	const table = new Table({
		columns: 2,
		width: 15,
		tableStyle: TableStyle.DEFAULT,
	});

	table.addHeader(header);
	table.addFooter(footer);

	table.add(new Row(new Column("Line 1"), new Column("Col 2")));
	table.add(new Row(new Column("Line 2"), new Column("Col 2")));
	table.add(new Row(new Column("Line 3"), new Column("Col 2")));


    let expected_result = "";
    expected_result = expected_result.concat("+-----------------+-----------------+", "\n");
    expected_result = expected_result.concat("|      Col1       |      Col2       |", "\n");
    expected_result = expected_result.concat("+-----------------+-----------------+", "\n");
    expected_result = expected_result.concat("| Line 1          | Col 2           |", "\n");
    expected_result = expected_result.concat("| Line 2          | Col 2           |", "\n");
    expected_result = expected_result.concat("| Line 3          | Col 2           |", "\n");
    expected_result = expected_result.concat("+-----------------+-----------------+", "\n");
    expected_result = expected_result.concat("|                 |      TOTAL: 123 |", "\n");
    expected_result = expected_result.concat("+-----------------+-----------------+", "\n");

    assertEquals(table.render(), expected_result);

});