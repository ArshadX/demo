import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    contentContainerStyle:{
        rowGap:10,
        backgroundColor:'#fff',
        padding:"2%",
        marginTop:70,
    },
    contentContainerStyle1:{
        rowGap:10,
        backgroundColor:'#fff',
        padding:"2%",
        marginTop:10,
    },
    contentCardStyles:{
        backgroundColor:"#fff",
        elevation:5,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.3,
        shadowRadius:5,
        padding:"2%",
        rowGap:10,
    },
    tagsView:{
        flexDirection:'row',
        columnGap:10
    },
    icons:{
        width:20,
        height:20,
        resizeMode:'contain'
    },
    iconsView:{
        flexDirection:'row',
        columnGap:10,
    },
    iconsContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    textField:{
        height: 40,
        borderWidth: 1,
        padding: 12,  
        borderColor:"#000",
        borderRadius:5,
        width:"80%"
    },
    commentBoxView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'stretch',
        width:"100%"
    },
    buttonStyle:{
        width:"20%",
        backgroundColor:"#008080"
    },
    comments:{
        borderWidth: 1,
        padding: 12,  
        borderColor:"#000",
        borderRadius:5,
    }
})