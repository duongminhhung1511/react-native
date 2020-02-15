import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView } from 'react-native';
import {Header, Left, Icon} from 'native-base';
import { Table, Row } from 'react-native-table-component';
import { Dropdown } from 'react-native-material-dropdown';

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this)
        this.state = {
            userID: '',
            sessionToken: '',
            currentSemester: 0,
            currentYear: '',
            list: [],
            subjectList: [],

            //table setting
            tableHeader: ['Tên lớp', 'Phòng', 'Thứ', 'Ca'],
            widthArr: [200,100,100,100],

            //drop down list setting
            filterOptionSemester: [{value: 1}, {value: 2}, {value: 3}],
        }
    }

    //load data when navigated to this component
    componentDidMount(){
        AsyncStorage.getItem('user').then((preData) => {
            //prepare data pre-fetch
            const postData = JSON.parse(preData);
            let holder = this.getCurrentSemesterAndYear();
            this.setState({
                userID: postData.user.info._id,
                sessionToken: postData.token,
                currentSemester: holder.currentSemester,
                currentYear: holder.currentYear
            })
            
            //due to not adding enough data currentSemester will be set as 1
            this.setState({
                currentSemester: 1
            })

            //fetch data from server
            this.getScheduleData(this.state.userID, this.state.currentSemester, this.state.currentYear, this.state.sessionToken);

        }).catch((err) => {console.log('')});
    }

    getCurrentSemesterAndYear(){
        let date = new Date();
        let today = {
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        };
        let schoolTime = {
            currentYear: '',
            currentSemester: 1,
        }
        if(today.month >= 9 && today.month <= 11){
            schoolTime.currentYear = today.year + '-' + (today.year+1);
            schoolTime.currentSemester = 1;
        }
        if(today.month == 12){
            schoolTime.currentYear = today.year + '-' + (today.year+1);
            schoolTime.currentSemester = 2;
        }
        if(today.month <=3){
            schoolTime.currentYear = (today.year-1) + '-' + today.year;
            schoolTime.currentSemester = 2;
        }
        if(today.month >= 4 && today.month <=6){
            schoolTime.currentYear = (today.year-1) + '-' + today.year;
            schoolTime.currentSemester = 3;
        }
        return schoolTime;
    }

    listProcessor(rawList){
            let processedList = [];
            var totalCredits = 0;
            rawList.map((listItem) => {
                //setup variable
                let holder = [];
                let shift = listItem.from.name + '-' + listItem.to.name;

                //push to holder
                holder.push(listItem.class.name);
                holder.push(listItem.classRoom.name);
                holder.push(listItem.dayOfWeek);
                holder.push(shift);

                //push to processed list
                processedList.push(holder);
            })
            this.setState({
                totalCredits: totalCredits
            })
            return processedList;
    }

    getScheduleData(userID, semester, year, token){
        let url = 'https://dangkyhoctlu.herokuapp.com/api/schedule/student/' + userID + '/semester/'+ semester +'/year/'+ year +'?active=true';
        console.log(url);
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((res) => res.json()).then((data) => {
            console.log('blin2');
            if(data == null){
                this.setState({
                    list: [],
                    subjectList: []
                })
                alert('Không có dữ liệu thời khóa biểu của kỳ ' + semester );
            }
            else{
                let holder = this.listProcessor(data.list)
                this.setState({
                    list: [...data.list],
                    subjectList: [...holder]
                });
            }
        }).done();
    }

    onChangeText(semester){
        this.getScheduleData(this.state.userID , semester, this.state.currentYear, this.state.sessionToken)
        console.disableYellowBox = true;
    }

    render() {
        return (
                <View style={styles.general}>
                    <Header style={styles.headerContainer}>
                        <Left style={styles.menuContainer}>
                            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()}/>
                        </Left>
                    </Header>
                    <Dropdown label='Chọn kỳ học' data={this.state.filterOptionSemester} onChangeText={this.onChangeText}/>
                    <View style={styles.tableContainer}>
                        <ScrollView horizontal={true}>
                            <View style={styles.resultTable}>
                                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                    <Row data={this.state.tableHeader} widthArr={this.state.widthArr} style={styles.tableHeader} textStyle={styles.tableText}/>
                                </Table>
                                <ScrollView style={styles.tableDataWrapper}>
                                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                        {
                                            this.state.subjectList.map((rowData, index) => (
                                                <Row key={index} widthArr={this.state.widthArr} data={rowData} style={styles.tableRow} textStyle={styles.tableText}/>
                                            ))
                                        }
                                    </Table>
                                </ScrollView>
                            </View>
                            {/*table end here */}
                        </ScrollView>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    general: { flex: 1 },

    //css for nav bar
    headerContainer: {
        backgroundColor: '#9152f8',
        height: 70,
        position: 'relative'
    },
    menuContainer: {
        position: 'absolute',
        left: 20,
        bottom: 10,
        flex: 1
    },

    //css for filter
    infoContainer: { height:100 },
    Text: { fontSize: 20 },

    //css for table 
    tableContainer: { flex: 1, backgroundColor: '#fff' },
    tableHeader: { height: 50, backgroundColor: '#537791' },
    tableText: { textAlign: 'center', fontWeight: '100' },
    tableDataWrapper: { marginTop: -1 },
    tableRow: { height: 40, backgroundColor: '#E7E6E1'}
});