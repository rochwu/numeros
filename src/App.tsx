import styled from "@emotion/styled";
import type { MouseEventHandler } from "react";
import { Game } from "./Game";
import { FontFamily, flags } from "./globals";
import { History } from "./History";
import { Maker } from "./Maker";
import { Settings } from "./Settings";
import { System } from "./System";

const Container = styled.div({
	display: "flex",
	fontFamily: FontFamily.All,
	padding: "20px",
});

const handleMouseUp: MouseEventHandler = () => {
	flags.isSelecting = false;
};

export default function App() {
	return (
		<>
			<System />
			<Container onMouseUp={handleMouseUp}>
				<Game />
				<History />
				<Maker />
				<Settings />
			</Container>
		</>
	);
}
