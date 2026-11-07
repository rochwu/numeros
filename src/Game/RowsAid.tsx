import styled from "@emotion/styled";

import { Size } from "../globals";

import { AllowedRowValues } from "./AllowedValues";

const Container = styled.div({
	display: "grid",
	gridAutoFlow: "row",
	rowGap: "3px",
	padding: `3px 3px 3px`,
});

const Box = styled.div({
	display: "grid",
	rowGap: "1px",
	gridTemplateColumns: Size.Pen,
	gridTemplateRows: `repeat (3 ${Size.Pen})`,
});

export const RowsAid = () => {
	const boxes = [];

	for (let i = 0; i < 9; i = i + 3) {
		const cells = [];

		for (let j = i; j < i + 3; j++) {
			cells.push(<AllowedRowValues key={j} identifier={j} />);
		}
		boxes.push(<Box key={i}>{cells}</Box>);
	}
	return <Container>{boxes}</Container>;
};
