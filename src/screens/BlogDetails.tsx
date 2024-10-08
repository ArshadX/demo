import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Button, FlatList, Image, Text, TextInput, ToastAndroid, View } from 'react-native';
import { instance } from '../constants/instance';
import { textStyles } from '../styles/textStyles';
import { styles } from '../styles/blogListStyles';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../redux/store';
import { addComments } from '../redux/commentSlice';

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
const BlogDetails = ({route}:{route:any}) => {
    const comments =  useSelector((state:IRootState)=>state.comments)
    const {id=1} = route.params
    const [blogDetails,setBlogDetails] = useState<ItemProps>()
    const [loading,setLoading] = useState(false)
    const [comment,setcomment] = useState("")
    const dispatch = useDispatch()

    const _renderItem = ({item,index}:{item:string,index:number}) => {
        return (
            <View style={styles.comments}>
            <Text style={[textStyles.textGrey,textStyles.textmd]}>{item}</Text>
            </View>
        )
    }
    const  fetchPosts = async() => {
        try {
            setLoading(true)
            const res  =  await instance.get(`/posts/${id}`)
            setBlogDetails(res?.data)
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
    const addCommnet = async() => {
        if(comment !==""){
            dispatch(addComments(comment))
        }
     
    }
    return ( 
        <View key={blogDetails?.id} style={{padding:"2%",rowGap:10,backgroundColor:"#fff",flex:1}}>
            {
                loading? <ActivityIndicator size={30} color={"#008080"} />:
        <>
        <Text style={[textStyles.textlg,textStyles.textBlack]}>{blogDetails?.title}</Text>
        <View style={styles.tagsView}>
            {blogDetails?.tags.map((item,index)=><View key={item+index} style={{backgroundColor:"#008080",padding:"1%"}}><Text style={[textStyles.textWhite,textStyles.textsm]} >{item}</Text></View>)}
        </View>
        <View>
            <Text style={[textStyles.textGrey,textStyles.textmd]}>{blogDetails?.body}</Text>
        </View>
        <View style={styles.iconsView}>
            <View style={styles.iconsContainer}>
                <Image source={require("../assets/icons/views.png")} style={styles.icons}/>
                <Text style={[textStyles.textGrey,textStyles.textmd]}>{blogDetails?.views}</Text>
            </View>
            <View style={styles.iconsContainer}>
                <Image source={require("../assets/icons/thumbsup.png")} style={styles.icons}/>
                <Text style={[textStyles.textGrey,textStyles.textmd]}>{blogDetails?.reactions.likes}</Text>
            </View>
            <View style={styles.iconsContainer}>
                <Image source={require("../assets/icons/thumbsdown.png")}  style={styles.icons}/>
                <Text style={[textStyles.textGrey,textStyles.textmd]}>{blogDetails?.reactions.dislikes}</Text>
            </View>
        </View>
        <>
            <View style={styles.commentBoxView}>
            <TextInput
                placeholder='search'
                style={styles.textField}
                onChangeText={setcomment}
            />
            <Button title='ADD' onPress={addCommnet} />
            </View>
            <>
            <FlatList 
            data={comments.comments}
            renderItem={_renderItem}
            keyExtractor={(item,index)=>item+index}
            contentContainerStyle={styles.contentContainerStyle1}
            />
            </>
        </>
        </>
        }
    </View>
     );
}
 
export default BlogDetails;