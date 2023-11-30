import { StatusBar, StyleSheet } from "react-native"
import { colors } from "./colors"


export const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginTop: StatusBar.currentHeight + 10,
        //padding: 20,
        height: '100%'
    },
    contentLeft: {
        textAlign: "center",
        alignItems: "center",
        flexGrow: 0.5
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
        paddingBottom: 30
    },
    card: {
        flexDirection: 'row',
        textAlign: "center",
        alignItems: "center",
        justifyContent:"center"
    },
    icon: {
        padding: 20,
        marginRight: 10
    }
})