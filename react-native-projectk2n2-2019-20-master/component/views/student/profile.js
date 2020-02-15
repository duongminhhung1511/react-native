import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import {Header, Left, Icon} from 'native-base';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            name: '',
            dob: '',
            phone: '',
            email: '',
            identityID: '',
            credits: 0,
            englishLevel: '',
            schoolYear: 0,
            specialty: ''
        }
    }

    //load data when navigated to this component
    componentDidMount(){
        console.log('profile entered');
        //get item from async storage
        AsyncStorage.getItem('user').then((preData) => {
            let data = JSON.parse(preData);
            console.log(data);
            let dob = data.user.dob.slice(0, 10);
            this.setState({
                name: data.user.name,
                dob: dob,
                phone: data.user.phone,
                email: data.user.email,
                identityID: data.user.identityID,
                credits: data.user.info.credits,
                englishLevel: data.user.info.englishLevel,
                schoolYear: data.user.info.schoolYear,
                specialty: data.user.info.speciality.name,
                loading: false
            });
        }).catch((err) => {
            console.log('')
        });
    }

    // deleteState() {
    //     AsyncStorage.getItem('user').then(() => {
    //         this.setState({
    //             name: null,
    //             dob: null,
    //             phone: null,
    //             email: null,
    //             identityID: null,
    //             credits: null,
    //             englishLevel: null,
    //             schoolYear: null,
    //             specialty: null,
    //             loading: true
    //         })
    //     })
    // }

    // showState(){
    //     console.log(this.state);
    //     AsyncStorage.getItem('user').then((data) => {
    //         console.log(data);
    //     })
    // }

    // //bootleg componentDidMount (will need to fix
    // forceUpdateHandler(){
    //     this.componentDidMount();
    // }

    render() {
            return (
                <View style={styles.general}>
                    <Header style={styles.headerContainer}>
                        <Left style={styles.menuContainer}>
                            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()}/>
                        </Left>
                    </Header>
                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>Họ tên: {this.state.name}</Text>
                        <Text style={styles.text}>Ngày sinh: {this.state.dob}</Text>
                        <Text style={styles.text}>Số điện thoại: {this.state.phone}</Text>
                        <Text style={styles.text}>E-mail: {this.state.email}</Text>
                        <Text style={styles.text}>Khóa: {this.state.schoolYear}</Text>
                        <Text style={styles.text}>Trình độ tiếng anh: {this.state.englishLevel}</Text>
                        <Text style={styles.text}>Chuyên ngành: {this.state.specialty}</Text>
                        <Text style={styles.text}>Số tín chỉ tích lũy: {this.state.credits}</Text>
                        {/* <TouchableOpacity onPress={() => {this.deleteState()}}>
                            <Text>delete state</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.showState()}}>
                            <Text>show state</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.forceUpdateHandler()}}>
                            <Text>Force update</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            )
        }
}

const styles = StyleSheet.create({
    general: {
        flex: 1
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
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        color: 'black',
        padding: 10
    }
});