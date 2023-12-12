import { StatusBar, StyleSheet } from "react-native"
import { colors } from "./colors"


export const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginTop: StatusBar.currentHeight + 10,
        //padding: 20,
        height: '100%',
    },
    contentLeft: {
        textAlign: "center",
        alignItems: "center",
        flexGrow: 0.5,
    },
    title: {
        fontSize: 30,
        color: colors.primary,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 20,
        fontWeight: 'bold',
        flexGrow: 1,
        alignSelf: 'center'
    },
    title2: {
        fontSize: 20,
        color: colors.primary,
        paddingBottom: 20,
        paddingTop: 5
    },
    title3: {
        fontSize: 20,
        color: colors.primary,
        paddingBottom: 20,
        paddingTop: 5,
    },
    card: {
        flexDirection: 'row',
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    cardStyle: {
        margin: 8,
        backgroundColor: colors.background
    },
    icon: {
        padding: 5,
        marginRight: 10,
        flexDirection: 'column',
        color: 'rgb(158, 33, 33)'

    },
    bigText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    text: {
        fontSize: 15,
        fontWeight: "bold"
    },
    column: {
        flexGrow: 0.5,
        flexDirection: 'row'
    },

    link: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column'
    },
    background: {
        backgroundColor: colors.tertiary
    },

    // FOOD DIARY -SIVUN TYYLEJÄ -> 
    containerFoodDiary: {
        margin: 20,
        marginTop: StatusBar.currentHeight + 10,
        height: '100%',
        flex: 1,
        alignItems: 'center'
    },
    pressable: {
        padding: 15,
        //borderRadius: 50,
        //borderWidth: 2,
        //borderColor: colors.primary,
        margin: 10,
        justifyContent: 'center'
    },
    pressables: {
        flexDirection: 'row'
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: colors.primary
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})
