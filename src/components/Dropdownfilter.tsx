import React, { useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { textStyles } from '../styles/textStyles';

type ItemProps = {
    id: number,
    title: string,
    body:string,
    tags: string[],
    reactions: {
    likes: number,
    dislikes: number
    },
    views: number,
    userId: number
  }
const Dropdownfilter = ({posts,onSelect,onclear}:{posts:ItemProps[]|undefined,onSelect:(id:number)=>void,onclear:()=>void}) => {
    const [suggestions,setSuggestions] = useState<ItemProps[]|undefined>([])
    const filters = (text:string) => {
        if(text === ""){
            setSuggestions([])
            onclear()
        }else{
            const filtered  = posts?.filter((item,index)=>(item.title.includes(text)  || item.tags.includes(text))?true:false)
            setSuggestions(filtered)
        }
    }
    const _renderItem = ({item,index}:{item:ItemProps,index:number})=>{
        const handleFilterSelection = () => {
            onSelect(item.id)
            setSuggestions([])
        }
        return (
            <Pressable style={styles.dropdownItem} onPress={handleFilterSelection}>
                <Text style={[textStyles.textWhite,textStyles.textmd]}>{item.title}</Text>
            </Pressable>
        )
    }
    return ( 
        <View style={styles.container}>
            <TextInput 
                placeholder='search'
                style={styles.textField}
                onChangeText={filters}
                
            />
         
            <FlatList
            data={suggestions}
            renderItem={_renderItem}
            keyExtractor={(item,index)=>item.id.toString()}
            contentContainerStyle={styles.contentContainerStyle}
            keyboardShouldPersistTaps='handled'
            />
        
        </View>
       
     );
}
 
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
    },
    textField:{
    height: 40,
    borderWidth: 1,
    padding: 12,  
    borderColor:"#000",
    borderRadius:5,
    },
    contentContainerStyle:{
        paddingTop:"2%",
        rowGap:5
    },
    dropdownItem  : {
        backgroundColor:'#008080',
        padding:"1%"
    }
})
export default Dropdownfilter;