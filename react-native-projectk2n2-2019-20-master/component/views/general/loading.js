import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Header, Left, Icon} from 'native-base';

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.general}>
                <Header style={styles.header}>
                    <Left style={styles.menuContainer}>
                        <Icon name='menu' onPress={() => this.props.navigation.openDrawer()}/>
                    </Left>
                </Header>
                <View style={styles.body}>
                    <Text style={styles.text}>Đang tải dữ liệu</Text>
                </View>
            </View>
        )
    } 
    
}

const styles = StyleSheet.create({
    general: {
        flex: 1
    },
    header: {
        backgroundColor: '#9152f8',
        height: 70
    },
    menuContainer: {
        flex: 1
    },
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        color: 'black'
    }
});