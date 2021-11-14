import React from "react";
import { Button, Icon, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const fontSize = 12;

module.exports = ({ startTime, endTime, contents, size }) => {
	const stringTime = (time) => {
		let m = time.getMinutes();
		m = m > 9 ? m : "0" + m;
		return time.getHours() + "h" + m;
	};

	const TimeDivider = ({ time, position }) => {
		return (
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					position: "absolute",
					top: position,
				}}
			>
				<View>
					<Text
						style={{
							marginLeft: 5,
							marginRight: 10,
							textAlign: "right",
							color: "#7F7F7F80",
							overflow: "scroll",
							fontSize: fontSize,
							width: 35,
						}}
					>
						{time}
					</Text>
				</View>
				<View
					style={{ flex: 1, height: 1, backgroundColor: "#7F7F7F22" }}
				/>
			</View>
		);
	};

	let time = new Date(startTime);
	let position = 0;
	let dividers = [
		<TimeDivider
			time={stringTime(time)}
			position={position}
			key={"prop.view." + stringTime(time)}
		/>,
	];

	while (true) {
		time.setHours(time.getHours() + 1);

		let viewSize = size;
		if (time.getMinutes() > 0) {
			viewSize = (size * (60 - time.getMinutes())) / 60;
			time.setMinutes(0);
		}

		if (time > endTime) {
			viewSize =
				(size * (60 - new Date(time - endTime).getMinutes())) / 60;
			position += viewSize;
			dividers.push(
				<View
					style={{
						height: viewSize,
					}}
					key={"prop.view." + stringTime(endTime)}
				/>,
				<TimeDivider
					time={stringTime(endTime)}
					position={position}
					key={"prop.timeDivider." + stringTime(endTime)}
				/>
			);
			break;
		} else {
			position += viewSize;
			dividers.push(
				<View
					style={{ height: viewSize }}
					key={"prop.view." + stringTime(time)}
				/>,
				<TimeDivider
					time={stringTime(time)}
					position={position}
					key={"prop.timeDivider." + stringTime(time)}
				/>
			);

			if (time - endTime == 0) break;
		}
	}

	dividers[1].props.style.marginTop = fontSize / 2 + 2;
	dividers[dividers.length - 2].props.style.marginBottom = fontSize / 2 + 5;

	const getPositionByTime = (time) => {
		return (
			position * ((time - startTime) / (endTime - startTime)) +
			fontSize / 2 +
			2
		);
	};

	const elements = [];
	for (let i = 0; i < contents.length; i++) {
		const content = contents[i];

		let start = new Date(content.start);
		let end = new Date(content.end);
		let sStart = false,
			sEnd = false;

		if (start < new Date(startTime)) {
			start = startTime;
			sStart = true;
		}
		if (end > new Date(endTime)) {
			end = endTime;
			sEnd = true;
		}

		start = getPositionByTime(start);
		end = getPositionByTime(end);

		elements.push(
			<View
				key={"prop.content." + i}
				style={{
					borderColor: content.color,
					backgroundColor: "#F0F0F0",
					marginLeft: 50,
					borderLeftWidth: 5,
					borderRadius: 5,
					position: "absolute",
					top: start,
					height: end - start,
					width: "100%",
					paddingHorizontal: 5,
					justifyContent: "space-around",
					borderBottomLeftRadius: sEnd ? 0 : 5,
					borderTopLeftRadius: sStart ? 0 : 5,
					flexWrap: "wrap",
				}}
			>
				<Text
					status="basic"
					style={{
						marginRight: 10,
					}}
				>
					{content.name}
				</Text>
				<Text>
					{stringTime(new Date(content.start)) +
						" - " +
						stringTime(new Date(content.end))}
				</Text>
			</View>
		);
	}

	return (
		<ScrollView
			style={{
				paddingHorizontal: 10,
			}}
		>
			{dividers}
			{elements}
		</ScrollView>
	);
};
