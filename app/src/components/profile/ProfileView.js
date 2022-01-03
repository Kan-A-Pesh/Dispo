import React from "react";
import { Avatar, Button, Spinner, Text, useTheme } from "@ui-kitten/components";
import { Image, View } from "react-native";
import ProfileAvatar from "./ProfileAvatar";

export default ({ profile, onEdit, onLogout }) => {
	const theme = useTheme();

	let ProfileButtons = ({logout}) => {
		return (
			<View style={{ marginTop: 10, flexDirection: "row" }}>
				<Button
					style={{ marginRight: 5 }}
					size="tiny"
					status="basic"
					appearance="outline"
					onPress={() => onEdit()}
				>
					Modifier profil
				</Button>
				<Button
					style={{ marginRight: 5 }}
					size="tiny"
					status="basic"
					appearance="outline"
					onPress={() => logout()}
				>
					Se déconnecter
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
				<ProfileAvatar url={profile.avatar} />
				<View
					style={{
						marginLeft: 20,
						justifyContent: "center",
					}}
				>
					<Text
						style={{
							fontSize: 20,
							opacity: (profile.name)?1:.5
						}}
					>
						{profile.name || profile.username}
					</Text>
					<ProfileButtons logout={onLogout}/>
				</View>
			</View>
			{
				(profile.bio)?
				<Text
				style={{
					paddingHorizontal: 20,
					marginBottom: 10,
				}}
				numberOfLines={3}
			>
				{profile.bio}
			</Text>:<></>
			}
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
