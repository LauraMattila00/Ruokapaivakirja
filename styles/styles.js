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
        justifyContent: "center"
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
    calendar: {
        backgroundColor: colors.background,
        margin: 8
    },
    pressable: {
        padding: 15,
        //borderRadius: 50,
        //borderWidth: 2,
        //borderColor: colors.primary,
        //margin: 10,
        justifyContent: 'center'
    },
    pressables: {
        flexDirection: 'row',
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background
        
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 25,
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
    savedContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: colors.tertiary
    },
    mealCard: {
        backgroundColor: colors.background,
        marginHorizontal: 6,
        marginVertical: 1,
        padding: 5
    },
    cardBackground: {
        backgroundColor: colors.background
    },
    // ADD FOOD -SIVUN TYYLEJÄ ->

    containerAddFood: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },


    ItemStyle: {
        padding: 20,

        justifyContent: 'center'
    },
    ItemStyle: {
        padding: 20,
    },
    /*textInputStyle: {
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'white',
        elevation: 5,
        width: 80,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary
    },*/
    textInputStyle: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '60%',
        backgroundColor: colors.background
    },
    textInputStyle2: {
        //borderBottomWidth: 1,
        //flexDirection: 'row',
        //justifyContent: 'center',
        width: '50%',
        backgroundColor: colors.background,
        alignSelf: 'baseline'
    },
    button: {
        backgroundColor: colors.secondary,
        margin: 10,
        borderRadius: 30,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 18,
        padding: 15,
        elevation: 5,
        //flexDirection: 'row',
        //justifyContent:'space-between',
        //alignItems:'center',
    },
    button2: {
        backgroundColor: colors.secondary,
        marginTop: 5,
        marginLeft: 100,
        marginRight: 100,
        marginBottom: 5,
        borderRadius: 30,
        elevation: 5,
        padding: 15
    },
    buttonText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
    },
    result: {
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    cardContainer: {
        margin: 16,
        borderRadius: 8,
        elevation: 4
    },
    itemContainer: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
    },
    itemText: {
        fontSize: 20,
        color: 'black',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    row3: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
