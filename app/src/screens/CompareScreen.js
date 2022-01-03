import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import GroupPicker from '../components/group/GroupPicker';
import { fetchCalendar } from '../../api/classes/Calendars';
import { ScrollView } from 'react-native-gesture-handler';
import { RefreshControl } from 'react-native';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CompareView from '../components/calendar/CompareView';

const dayStr = (day) => { return day>9?day:"0"+day; }

export default () => {

    const [group, setGroup] = React.useState(["1", "3", "9", "10", "14"]);
    const [result, setResult] = React.useState(undefined);
    const [calDay, setCalDay] = React.useState(new Date());
	var comparingText = "";

    if (group.length > 0 && !result) {
        var _result = [];
        var _loaded = 0;
        for (let i = 0; i < group.length; i++) {
            fetchCalendar(calDay.toISOString(), group[i]).then((stats) => {
				fetch
                if (stats.status == 200)
					_result.push({
						id: group[i],
						name: "test",
						cal: stats.data.result
					});

                _loaded ++;
                if (_loaded == group.length)
                    setResult(_result);
            })

            // TODO
        }
    }

	if (result)
	{
		comparingText = "Comparing with ";
		switch (result.length) {
			case 0:
				comparingText += "no one ...";
				break;
			case 1:
				comparingText += result[0]["name"];
				break;
			case 2:
				comparingText += result[0]["name"] + " and " + result[1]["name"];
				break;
			case 3:
				comparingText += result[0]["name"] + ", " + result[1]["name"] + " and " + result[2]["name"];
				break;
			default:
				comparingText += result[0]["name"] + ", " + result[1]["name"] + " and " + (result.length-2) + " others";
				break;
		}
	}

    return (
		<Layout style={{ flex: 1 }}>
            <ScrollView
                refreshControl={<RefreshControl
                    refreshing={(result === null)}
                    onRefresh={React.useCallback(async () => {
                        setResult(null);
                    })}
                />}
                contentContainerStyle={{flexGrow: 1}}
            >
                <GroupPicker
                    onGroupChange={
                        (newGroup) => { setGroup([...newGroup]); }
                    }
                    initialGroup={group} />
                {
				(result === 0)?
					<Text>Loading...</Text>
				:
				(
					(result == null)?
                		<Text>No user selected</Text>
					:
					(
						<>
							<Text>{comparingText}</Text>
							<CalendarHeader 
								day={calDay}
								onChangeDay={(newDay) => {setCalDay(new Date(newDay)); setResult(0);}}
							/>
							<CompareView
								startTime={new Date((calDay.getYear()+1900)+"-"+dayStr(calDay.getMonth()+1)+"-"+dayStr(calDay.getDate())+"T08:00:00Z")}
								endTime={new Date((calDay.getYear()+1900)+"-"+dayStr(calDay.getMonth()+1)+"-"+dayStr(calDay.getDate())+"T18:00:00Z")}
								contents={result}
								size={50}
							/>
						</>
					)
				)
                }
            </ScrollView>
        </Layout>
    );
};