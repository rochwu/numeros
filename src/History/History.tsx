import styled from "@emotion/styled";
import React from "react";
import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";
import { showHistoryState } from "../Settings";
import type { State } from "../state";
import { CollapsibleWidth, Divider, SectionHeading } from "../ui";
import { Record } from "./Record";

const Container = styled.div({
	display: "flex",
	flexDirection: "column",
	whiteSpace: "nowrap",
});

const Scroll = styled.div({
	display: "flex",
	flexDirection: "column",
	overflow: "scroll",
	height: `22em`, // Number of Records to show
	paddingTop: `3px`, // accounts for Setting's toggle extra paddings
});

const Timeline = () => {
	const history = useSelector<State, State["history"]>(
		({ history }) => history,
	);

	return (
		<Container>
			<SectionHeading>History + Time Travel</SectionHeading>
			<Scroll>
				{history.map(({ record }, index) => {
					// biome-ignore lint/suspicious/noArrayIndexKey: records are identified by position, time travel uses the index
					return <Record key={index} record={record} index={index} />;
				})}
			</Scroll>
		</Container>
	);
};

export const History = () => {
	const canSeeHistory = useRecoilValue(showHistoryState);

	return (
		<CollapsibleWidth isCollapsed={canSeeHistory}>
			<Divider />
			<Timeline />
		</CollapsibleWidth>
	);
};
