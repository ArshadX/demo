import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Button, FlatList, Image, Pressable, Text, ToastAndroid, View } from 'react-native';
import { instance } from '../constants/instance';
import { styles } from '../styles/blogListStyles';
import { textStyles } from '../styles/textStyles';
import Dropdownfilter from '../components/Dropdownfilter';

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
  interface ListProps{
    posts:ItemProps[],
    total:number,
    skip:number,
    limit:number
  }

const BlogList = ({navigation}:any) => {
    const [blogs,setBlogs] = useState<ListProps>()
    const [temp,setTemp] = useState<ItemProps[] | undefined>([])
    const [loading,setLoading] = useState(false)
    const  fetchPosts = async() => {
    try{
        setLoading(true)
        const res  =  await instance.get("/posts")
        setBlogs(res?.data)
        setTemp(res?.data?.posts)
        setLoading(false)
    }catch(e:any){
        setLoading(false)
        console.log(e)
        ToastAndroid.showWithGravityAndOffset(`addessess ${e.message}`,ToastAndroid.SHORT,ToastAndroid.BOTTOM,25,50)
    }
    
    }
    useEffect(()=>{
        fetchPosts()
    },[])
    const onclear = () => {
        setTemp(blogs?.posts)
    }
    const onSelect = (id:number) => {
        if(id === null){
            setTemp(blogs?.posts)
        }else{
            const filtered  = temp?.filter((item,index)=>(item.id === id )?true:false)
            setTemp(filtered)
        }
    }
    const _renderItem = useCallback(({item,index}:{item:ItemProps,index:number})=>{
        const handleNavigation = ()=>{
            navigation.navigate("Details",{id:item?.id})
        }
        return (
            <Pressable key={item.id} style={styles.contentCardStyles}  onPress={handleNavigation}>
                <Text style={[textStyles.textlg,textStyles.textBlack]}>{item.title}</Text>
                <View style={styles.tagsView}>
                    {item.tags.map((item,index)=><View key={item+index} style={{backgroundColor:"#008080",padding:"1%"}}><Text style={[textStyles.textWhite,textStyles.textsm]} >{item}</Text></View>)}
                </View>
                <View>
                    <Text ellipsizeMode='tail' numberOfLines={2} style={[textStyles.textGrey,textStyles.textmd]}>{item.body}</Text>
                </View>
                <View style={styles.iconsView}>
                    <View style={styles.iconsContainer}>
                        <Image source={require("../assets/icons/views.png")} style={styles.icons}/>
                        <Text style={[textStyles.textGrey,textStyles.textmd]}>{item.views}</Text>
                    </View>
                    <View style={styles.iconsContainer}>
                        <Image source={require("../assets/icons/thumbsup.png")} style={styles.icons}/>
                        <Text style={[textStyles.textGrey,textStyles.textmd]}>{item.reactions.likes}</Text>
                    </View>
                    <View style={styles.iconsContainer}>
                        <Image source={require("../assets/icons/thumbsdown.png")}  style={styles.icons}/>
                        <Text style={[textStyles.textGrey,textStyles.textmd]}>{item.reactions.dislikes}</Text>
                    </View>
                </View>
            </Pressable>
        )
    },[])
    return ( 
        <View style={{flex:1,backgroundColor:"#fff"}}>
        {
            loading?<ActivityIndicator size={30} color={"#008080"} />:
        
        <>
        <View style={{padding:"2%",position:'absolute',zIndex:100,width:"100%",backgroundColor:"#fff"}}>
            <Dropdownfilter onclear={onclear} onSelect={onSelect} posts={blogs?.posts} />
        </View>
        <FlatList
        data={temp}
        renderItem={_renderItem}
        keyExtractor={(item)=>item.id.toString() }
        contentContainerStyle={styles.contentContainerStyle}
        />
        </>
    }
        </View>
     );
}
 
export default BlogList;