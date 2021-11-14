import React from "react";
import { Button, Icon, Text } from "@ui-kitten/components";
import { View } from "react-native";

module.exports = () => {
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
			/>
			<Text category="p1">20 Avril 2069</Text>
			<Button
				appearance="ghost"
				status="basic"
				accessoryLeft={(props) => (
					<Icon {...props} name="chevron-right-outline" />
				)}
			/>
		</View>
	);
};
