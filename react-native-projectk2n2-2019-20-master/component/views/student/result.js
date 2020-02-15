import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView } from 'react-native';
import {Header, Left, Icon} from 'native-base';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';


export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            identityID: '',
            totalCredits: 0,
            list: [],
            processedList: [],
            tableHeader: ['Mã học phần', 'Tên học phần', 'Số tín chỉ', 'Điểm'],
            widthArr: [100,200,100,100]
        }
    }

    //https://dangkyhoctlu.herokuapp.com/api/

    //load data when navigated to this component
    componentDidMount(){
        AsyncStorage.getItem('user').then((preData) => {
            const postData = JSON.parse(preData);
            console.log(postData);
            let url = 'https://dangkyhoctlu.herokuapp.com/api/result/student/' + postData.user.info._id + '?speciality=' + postData.user.info.speciality._id;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + postData.token,
                }
            }).then((res) => res.json()).then((data) => {
                let holder = this.listProcessor(data.results)
                this.setState({
                    userName: postData.user.name,
                    identityID: postData.user.username,
                    list: [...data.results],
                    processedList: holder
                });
            }).done();
        }).catch((err) => {console.log('')}); 
    }

    listProcessor(rawList){
            let processedList = [];
            var totalCredits = 0;
            rawList.map((listItem) => {
                //setup variable 
                let holder = [];

                //push to holder
                holder.push(listItem.subject.subjectID);
                holder.push(listItem.subject.name);
                holder.push(listItem.subject.credits);
                holder.push(listItem.grade);

                //count credits
                totalCredits = totalCredits + listItem.subject.credits;

                //push to processed list
                processedList.push(holder);
            })
            this.setState({
                totalCredits: totalCredits
            })
            return processedList;
    }

    render() {
        return (
                <View style={styles.general}>
                    <Header style={styles.headerContainer}>
                        <Left style={styles.menuContainer}>
                            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()}/>
                        </Left>
                    </Header>
                    <View style={styles.infoContainer}>
                        <Text style={styles.Text}>Họ tên: {this.state.userName}</Text>
                        <Text style={styles.Text}>MSV: {this.state.identityID}</Text>
                        <Text style={styles.Text}>Tổng số tín chỉ tích lũy: {this.state.totalCredits}</Text>
                    </View>
                    <View style={styles.tableContainerMain}>
                        <ScrollView horizontal={true}>
                            <View style={styles.resultTable}>
                                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                    <Row data={this.state.tableHeader} widthArr={this.state.widthArr} style={styles.tableHeader} textStyle={styles.tableText}/>
                                </Table>
                                <ScrollView style={styles.tableDataWrapper}>
                                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                        {
                                            this.state.processedList.map((rowData, index) => (
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
    general: {
        flex: 1,
    },
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
    infoContainer: {
        height:100,
    },
    Text: {
        fontSize: 20
    },
    tableContainerMain: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tableContainer: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    tableHeader: { height: 50, backgroundColor: '#537791' },
    tableText: { textAlign: 'center', fontWeight: '100' },
    tableDataWrapper: { marginTop: -1 },
    tableRow: { height: 40, backgroundColor: '#E7E6E1'}

});