// import "./chat.css";
import { Media } from "reactstrap";
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import {ref, uploadBytes,getDownloadURL} from 'firebase/storage'

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import React, { useEffect, useRef, useState } from "react";
import ChatMain from "./main";
import { setDefaultTranslations } from "react-switch-lang";

const firebaseConfig = {
  apiKey: "AIzaSyBht2gcwd6obeTZn-2EO8tJltdfGQaZXOw",
  authDomain: "chat-app-9725a.firebaseapp.com",
  projectId: "chat-app-9725a",
  storageBucket: "chat-app-9725a.appspot.com",
  messagingSenderId: "268893906629",
  appId: "1:268893906629:web:14c8c8b1ba63067e45b2ac",
  measurementId: "G-JHXDL2TTGF",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const storage = getStorage()
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

// APP
const Chat = () => {
  const [user] = useAuthState(auth);

  return <div>{user ? <ChatRoom /> : <SignIn />}</div>;
};
export default Chat;
// SignIn

function SignIn() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((cred) => {
        console.log("user created:", cred);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
  };

  return <button onClick={signInWithGoogle}>Sign In With Google </button>;
}

// function SignOut() {
//   const handleSignOut = () => {
//     signOut(auth)
//       .then(() => {
//         console.log("Sign-out successful.");
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   return (
//     auth.currentUser && <button onClick={handleSignOut}> Sign Out </button>
//   );
// }


function ChatRoom() {

  const [imageContent, setImageContent] = useState(null)
  const [image, setImage] = useState(false)
  const [audioContent, setAudioContent] = useState(null)
  const [vidoeContent, setVideoContent] = useState(null)
  const dummy = useRef();
  const messagesRef = collection(firestore, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));

  const [messages] = useCollectionData(q, { idField: "id" });
  
 const [imageAddress, setImageAddress] = useState(null)
  const [formValue, setFormValue] = useState("");
  const { uid, photoURL } = auth.currentUser;

  const scrollToBottom = () => {
    messagesRef.current.scrollIntoView({ behavior: "smooth" });
  };


  const imageUpload = ()=>{
     const imageRef = ref(storage, `images/${imageContent.name}`)
     uploadBytes(imageRef, imageContent).then(()=>{
     getDownloadURL(ref(storage, `images/${imageContent.name}`))
      .then((url) => {
        console.log('url', url)
        setImageAddress(url)
      })
     })
  }

  

  useEffect(()=>{

  },[scrollToBottom, messages])

  const sendMessage = async (e) => {
    e.preventDefault();
    const textValue = formValue;
    setFormValue("");
    let mediaUrl;
    dummy.current.scrollIntoView({ behaviour: "smooth" });
  if(imageContent)
  {
    const imageRef = ref(storage, `images/${imageContent.name}`)
   const snap = await  uploadBytes(imageRef, imageContent)
   const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
         console.log('url', url)
        //  if(url !== null)
        //  {
        //   setImageAddress(url)
        //   console.log('not null')
        //  }

     mediaUrl = url
  }
  

    await addDoc(messagesRef, {
      text: textValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      media: mediaUrl || ""
    }).then(()=>{
      setImageContent(null)
      setImageAddress(null)
       setImage(false)
    })

  };
   console.log('imageContent', imageContent, 'image Addres', imageAddress, 'image', image)
 let time = null
  function ChatMessage(props) {
    const { text, uid, photoURL, createdAt , media} = props.message;
    if(createdAt !== null)
    {
     time = new Date(createdAt.seconds * 1000).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
    }
    return (
     
       <li key={uid} className="clearfix">
       <div className={`message my-message ${uid === auth.currentUser.uid ? 'float-right' : ''}`}>
           <Media src={photoURL}
               className={`rounded-circle ${uid === auth.currentUser.uid ?  'float-right' : 'float-left'} chat-user-img img-30`} alt="" />
           <div className="message-data text-right">
               <span className="message-data-time">{time}</span>
           </div>
           {media ?
           <img src = {media} alt = 'img' style={{width: '190px', maxHeight:'140px', borderRadius:'10px'}}></img>:
          <p>{text}</p> 
  }
       </div>
   </li>
    );
  }

  return (
      <ChatMain messages = {messages} setFormValue = {setFormValue} formValue ={formValue} dummy = {dummy}
       sendMessage = {sendMessage} ChatMessage = {ChatMessage} setAudioContent = {setAudioContent}
       setVideoContent = {setVideoContent} setImageContent = {setImageContent} imageUpload ={imageUpload}
       setImage = {setImage} image = {image}/>
   
  );
}
