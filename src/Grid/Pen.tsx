import styled from "@emotion/styled";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Colors, Size } from "../globals";
import { type Identifier, selectIsDisabled } from "../state";
import {
	blockSelector,
	columnSelector,
	isBlockValidSelector,
	isColumnValidSelector,
	isRowValidSelector,
	rowSelector,
} from "../validation";

type Props = {
	identifier: Identifier;
	value: string; // 1-9 or empty
};

const Container = styled.span(
	({ isDisabled, isValid }: { isValid: boolean; isDisabled: boolean }) => ({
		fontSize: Size.PenFont,
		lineHeight: Size.PenFont,
		fontWeight: isDisabled ? 600 : "normal",
		color: !isValid ? Colors.Error : isDisabled ? Colors.Disabled : Colors.Fill,
	}),
);

// TODO: Maybe move this to validators
const useIsValid = (id: string) => {
	const isRowValid = useRecoilValue(isRowValidSelector(id));
	const isColumnValid = useRecoilValue(isColumnValidSelector(id));
	const isBlockValid = useRecoilValue(isBlockValidSelector(id));

	return isRowValid && isColumnValid && isBlockValid;
};

const useValueEffect = (id: string, value: string) => {
	const setRow = useSetRecoilState(rowSelector(id));
	const setColumn = useSetRecoilState(columnSelector(id));
	const setBlock = useSetRecoilState(blockSelector(id));

	const setValue = useCallback(
		(value: string) => {
			setRow(value);
			setColumn(value);
			setBlock(value);
		},
		[setRow, setColumn, setBlock],
	);

	// TODO: find a way to prevent this
	useEffect(() => {
		setValue(value);
		return () => setValue(""); // reset validations
	}, [value, setValue]);
};

export const Pen = ({ identifier: id, value }: Props) => {
	const isDisabled = useSelector(selectIsDisabled(id));

	const isValid = useIsValid(id);
	useValueEffect(id, value);

	if (!value) {
		return null;
	}

	return (
		<Container isValid={isValid} isDisabled={isDisabled}>
			{value}
		</Container>
	);
};
