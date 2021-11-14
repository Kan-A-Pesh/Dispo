import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import ProfileView from "./../components/profile/ProfileView";
import CalendarView from "../components/calendar/CalendarView";
import CalendarHeader from "../components/calendar/CalendarHeader";

module.exports = ({ navigation }) => {
	return (
		<Layout style={{ flex: 1 }}>
			<ProfileView
				profile={{
					name: "Kan-à-Pesh",
					avatar: "https://m.gjcdn.net/user-avatar/200/3268628-js8fbzie-v4.jpg",
					bio: "🦢 PEACE WAS NEVER AN OPTION.\n🔻Follow me on YouTube!🔻",
				}}
			/>
			<CalendarHeader />
			<CalendarView
				startTime={new Date("2021-11-01T06:30:00Z")}
				endTime={new Date("2021-11-01T17:30:00Z")}
				contents={[
					{
						name: "Maths",
						color: "red",
						start: "2021-11-01T09:00:00Z",
						end: "2021-11-01T10:30:00Z",
					},
					{
						name: "PH",
						color: "orange",
						start: "2021-11-01T11:00:00Z",
						end: "2021-11-01T11:30:00Z",
					},
					{
						name: "Italien",
						color: "tomato",
						start: "2021-11-01T13:00:00Z",
						end: "2021-11-01T13:55:00Z",
					},
					{
						name: "Anglais",
						color: "darkorange",
						start: "2021-11-01T16:00:00Z",
						end: "2021-11-01T18:30:00Z",
					},
				]}
				size={50}
			/>
		</Layout>
	);
};
