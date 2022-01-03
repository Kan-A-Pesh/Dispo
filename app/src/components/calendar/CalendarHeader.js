import React from "react";
import { Button, Icon, Text } from "@ui-kitten/components";
import { View } from "react-native";
const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
const monthNames = ["Jan.", "Fév.", "Mars", "Avr.", "Mai", "Juin", "Jul.", "Aout", "Sept.", "Oct.", "Nov.", "Déc."]

export default ({ day, onChangeDay }) => {
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-around",
				alignItems: "center",
			}}
		>
			<Button
				appearance="ghost"
				status="basic"
				accessoryLeft={(props) => (
					<Icon {...props} name="chevron-left-outline" />
				)}
				onPress={() => {
					day = day.setDate(day.getDate() - 1);
					onChangeDay(day);
				}}
			/>
			<Text category="p1">{dayNames[day.getDay()] + ". " + day.getDate() + " " + monthNames[day.getMonth()]}</Text>
			<Button
				appearance="ghost"
				status="basic"
				accessoryLeft={(props) => (
					<Icon {...props} name="chevron-right-outline" />
				)}
				onPress={() => {
					day = day.setDate(day.getDate() + 1);
					onChangeDay(day);
				}}
			/>
		</View>
	);
};
