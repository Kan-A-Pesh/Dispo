import { Button, Layout, Spinner, Text } from "@ui-kitten/components";
import React from "react";
import { RefreshControl, View } from "react-native";
import ProfileView from "./../components/profile/ProfileView";
import CalendarView from "../components/calendar/CalendarView";
import CalendarHeader from "../components/calendar/CalendarHeader";

import { fetchCalendar } from "../../api/classes/Calendars";
import { getUser } from "../../api/classes/Users";
import { getAvatar } from "../../api/classes/Avatars";

import PronoteModal from "./../components/modals/import/PronoteModal";
import UploadModal from "./../components/modals/import/UploadModal";
import EmptyModal from "./../components/modals/import/EmptyModal";
import { ScrollView } from "react-native-gesture-handler";

const dayStr = (day) => { return day>9?day:"0"+day; }

export default ({ navigation, onLogout, viewingUser }) => {

	const [calendar, setCalendar] = React.useState(undefined);
	const [userStats, setUserStats] = React.useState(undefined);
	const [refreshing, setRefreshing] = React.useState(false);
	const [day, setDay] = React.useState(new Date());

	const [visiblePronote, setVisiblePronote] = React.useState(false);
	const [visibleUpload, setVisibleUpload] = React.useState(false);
	const [visibleEmpty, setVisibleEmpty] = React.useState(false);

	const onRefresh = React.useCallback(async () => {
		setUserStats(undefined);
		setCalendar(undefined);
		setRefreshing(true);
	}, []);

	if (!userStats)
	{
		getUser(viewingUser).then(result => {
			setUserStats(result.data.result);
			setRefreshing(false);
		});
	}

	let calendarView = <View style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}><Spinner /></View>
	if (calendar)
	{
		calendarView = calendar;
	}
	else
	{
		fetchCalendar(day, viewingUser).then(result => {
			if (result.status == 401)
			{
				if (result.data.message == "No session found, try to reconnect")
				{
					setCalendar([<></>,
						<View style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 30}}>
							<Text style={{textAlign: 'center'}}>Erreur de connexion:{'\n'} Essayez de vous reconnecter</Text>
						</View>
					]);
				}
			}
			
			if (result.status == 404)
			{
				setCalendar([<></>,
					<View style={{flexGrow:1, justifyContent: 'center', alignItems: 'center'}}>
						<Text>Aucun emploi du temps disponible.</Text>
						<Button
							status="basic"
							appearance="outline"
							style={{
								margin: 10,
								marginTop: 25,
								width: "60%"
							}}
							onPress={() => {setVisiblePronote(true)}}
						>
							Importer depuis Pronote
						</Button>
						<Button
							status="basic"
							appearance="outline"
							style={{
								margin: 10,
								width: "60%"
							}}
							onPress={() => {setVisibleUpload(true)}}
						>
							Importer un iCAL
						</Button>
						<Button
							status="basic"
							appearance="outline"
							style={{
								margin: 10,
								width: "60%"
							}}
							onPress={() => {setVisibleEmpty(true)}}
						>
							Créer un calendrier vide
						</Button>
					</View>
				]);
			}

			if (result.status == 200)
			{
				setCalendar([
						<CalendarHeader 
							day={day}
							onChangeDay={(newDay) => {setDay(new Date(newDay)); setCalendar(undefined);}}
						/>,
							<CalendarView
								startTime={new Date((day.getYear()+1900)+"-"+dayStr(day.getMonth()+1)+"-"+dayStr(day.getDate())+"T08:00:00Z")}
								endTime={new Date((day.getYear()+1900)+"-"+dayStr(day.getMonth()+1)+"-"+dayStr(day.getDate())+"T18:00:00Z")}
								contents={result.data.result}
								size={50}
							/>
				]);
			}
		});
	}

	return (
		
		<Layout
			style={{ flex: 1 }}
		>
				{
				(userStats)?
				<ProfileView
					profile={{
						name: userStats.displayName,
						username: userStats.name,
						avatar: getAvatar(userStats.id),
						bio: userStats.bio,
					}}
					
					onLogout={onLogout}
					onEdit={() => {
						navigation.push("EditProfile");
					}}
				/>:<></>
				}
				
				{calendarView[0]}
				<ScrollView
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					contentContainerStyle={{flexGrow: 1}}
				>
					{calendarView[1]}
				</ScrollView>

			<PronoteModal visible={visiblePronote} onClose={() => {setVisiblePronote(false)}} />
			<UploadModal visible={visibleUpload} onClose={() => {setVisibleUpload(false)}} />
			<EmptyModal visible={visibleEmpty} onClose={() => {setVisibleEmpty(false)}} />
		</Layout>
	);
};
