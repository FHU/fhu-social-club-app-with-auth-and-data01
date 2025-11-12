// import { FlatList, StyleSheet } from 'react-native';

// import { ThemedText as Text } from '@/components/themed-text';
// import { ThemedView as View } from '@/components/themed-view';
// import { APPWRITE_CONFIG, createAppWriteService, MemberRow } from '@/lib/appwrite';
// import { useCallback, useEffect, useMemo, useState } from "react";

// export default function TabTwoScreen() {
//     const [members, setMembers] = useState<MemberRow[] | null>(null)

//     const appWriteService = useMemo(
//         () => createAppWriteService(APPWRITE_CONFIG),
//         []
//     );

//     const loadMembers = useCallback( async()=> {
//         const members = await appWriteService.getMembers("xbx")
//         console.log(members)
//         setMembers(members)
//     }, [appWriteService])

//     useEffect( () => {
//         loadMembers
//     }, [loadMembers]);

//     return (
//         <View style={styles.container}>
//             <Text>Members</Text>
//             <FlatList>
//                 keyExtractor={(member) => {
//                     return member.$id
//                 }}
//             </FlatList>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// })