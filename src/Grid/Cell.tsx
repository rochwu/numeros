import styled from "@emotion/styled";
import type { MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSetRecoilState } from "recoil";
import { flags, getId, type Indices, Size } from "../globals";
import {
	actions,
	lastSelectedState,
	selectIsFirstSelected,
	selectIsSelected,
	selectValue,
} from "../state";
import { CellOverlay } from "./CellOverlay";
import { Pen } from "./Pen";
import { Pencil } from "./Pencil";

const Container = styled.div(
	{
		display: "grid",
		height: Size.Pen,
		width: Size.Pen,
		backgroundColor: "white",
	},
	({ row, column }: any) => ({
		gridRow: (row % 3) + 1,
		gridColumn: (column % 3) + 1,
	}),
);

export const Cell = ({ row, column }: Indices) => {
	const id = getId(row, column);

	const dispatch = useDispatch();

	const value = useSelector(selectValue(id));

	const setLastSelected = useSetRecoilState(lastSelectedState);

	const isSelected = useSelector(selectIsSelected(id));
	const isFirstSelected = useSelector(selectIsFirstSelected(id));

	const handleMouseEnter: MouseEventHandler = ({ metaKey }) => {
		if (flags.isSelecting) {
			if (metaKey) {
				dispatch(actions.select({ id, isSelected: flags.selectingFill }));
			} else {
				dispatch(actions.select({ id, isSelected: true }));
			}
		}
	};

	const handleMouseDown: MouseEventHandler = ({ metaKey, button }) => {
		if (button !== 0) {
			return;
		}

		flags.selectingFill = !isSelected;

		if (value && !flags.isSelecting && !metaKey) {
			setLastSelected(id);
			dispatch(actions.showPossibleSelection({ id, value }));
			return;
		}

		setLastSelected(id);

		if (!metaKey) {
			dispatch(actions.clearSelected());
		}

		if (metaKey && isSelected) {
			dispatch(actions.select({ id, isSelected: false }));
			return;
		}

		dispatch(actions.select({ id, isSelected: true }));
	};

	return (
		<Container
			row={row}
			column={column}
			onMouseEnter={handleMouseEnter}
			onMouseDown={handleMouseDown}
		>
			<CellOverlay
				identifier={id}
				isSelected={isSelected}
				isFirstSelected={isFirstSelected}
				value={value}
			>
				{value ? (
					<Pen identifier={id} value={value} />
				) : (
					<Pencil identifier={id} />
				)}
			</CellOverlay>
		</Container>
	);
};
