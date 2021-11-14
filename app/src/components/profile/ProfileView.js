import React from "react";
import { Avatar, Button, Text, useTheme } from "@ui-kitten/components";
import { Image, View } from "react-native";

module.exports = ({ profile }) => {
	const theme = useTheme();

	let ProfileButtons = () => {
		return (
			<View style={{ marginTop: 10, flexDirection: "row" }}>
				<Button
					style={{ marginRight: 5 }}
					size="tiny"
					status="basic"
					appearance="outline"
				>
					Modifier profil
				</Button>
			</View>
		);
	};

	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					paddingHorizontal: 20,
					paddingVertical: 10,
				}}
			>
				<Image
					style={{
						height: 100,
						width: 100,
						marginRight: 20,
						borderRadius: 50,
					}}
					source={{
						uri: profile.avatar,
					}}
					defaultSource={require("./../../../assets/avatar.png")}
				/>
				<View
					style={{
						justifyContent: "center",
					}}
				>
					<Text
						style={{
							fontSize: 20,
						}}
					>
						{profile.name}
					</Text>
					<ProfileButtons />
				</View>
			</View>
			<Text
				style={{
					paddingHorizontal: 20,
					marginBottom: 10,
				}}
				numberOfLines={3}
			>
				{profile.bio}
			</Text>
			<View
				style={{
					borderColor: theme["border-basic-color-2"],
					borderTopWidth: 1,
					borderBottomWidth: 1,
					flexDirection: "row",
					justifyContent: "space-evenly",
					alignItems: "center",
					paddingVertical: 5,
				}}
			>
				<View
					style={{
						alignItems: "center",
					}}
				>
					<Text style={{ fontWeight: "bold" }} category="s1">
						50h
					</Text>
					<Text style={{ opacity: 0.6 }} category="s2">
						occupé(e)
					</Text>
				</View>
				<View
					style={{
						alignItems: "center",
					}}
				>
					<Text style={{ fontWeight: "bold" }} category="s1">
						10h
					</Text>
					<Text style={{ opacity: 0.6 }} category="s2">
						en commun
					</Text>
				</View>
				<View
					style={{
						alignItems: "center",
					}}
				>
					<Text style={{ fontWeight: "bold" }} category="s1">
						30h
					</Text>
					<Text style={{ opacity: 0.6 }} category="s2">
						disponibles
					</Text>
				</View>
			</View>
		</View>
	);
};
