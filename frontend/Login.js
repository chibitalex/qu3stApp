import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import logo from './assets/QU3ST2.png';
import bg from './assets/background.png';

export default function Login() {
    var obj = {email:"",password:""}
    const [errorMessage, setErrorMessage] = React.useState("");

    const doRegister = async event => 
    {
      window.location.href = '/register'
    }
    // Function To Log User In
    // Takes Email and 
    // Returns Error JSON If Error Occured
    // Returns Token If Valid
    const doLogin = async event => 
    {
  
        console.log(obj);
        //event.preventDefault();
        // FIXME: Pull Login And Password From Our Fields
        //var obj = {email:"culltrip@gmail.com",password:"COP4331!p"};
        var js = JSON.stringify(obj);
        try
        {    
            //
            const response = await fetch('http://quest-task.herokuapp.com/api/login',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
  
            var res = JSON.parse(await response.text());
            //console.log(res);
              if( res.error )
              {
                console.log(res.error)
                setErrorMessage(res.error.message);
              }
              else
              {
                  console.log("no error");
                  var user = {FirstName:res.FirstName,LastName:res.LastName, Token:res.Token}
                  localStorage.setItem('user_data', JSON.stringify(user));
                  console.log(user);
                  // TODO: Route To Dashboard Page And Send User Info
                  window.location.href = './charCreate';
              }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };
  
       const [state, setState] = useState(
          {
              loginName: "",
              loginPassword: ""
          }
      );
  
      const setEmail = (email) => {
        obj.email = email;
      }
      const setPassword = (password) => {
        obj.password = password;
      }
      

  return (

    <View style={[styles.wrap, {alignContent: 'center'}]}>
      <ImageBackground source={bg} style={{width: '100%', height: '100%', alignItems: 'center'}}>

      <View style={[styles.menuWrap, {justifyContent: 'center'}]}>
      <StatusBar style="auto" />

      <Image source={logo} style={{ maxWidth: 500, height: 200, marginLeft: 20, }} /> 

      <Text>Where your everyday tasks make you the hero.</Text>

      <View style={[styles.inputView, styles.shadowProp]}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={[styles.inputView, styles.shadowProp]}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress = {() => doLogin()} style={[styles.loginBtn, styles.shadowProp]}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <Text>New here, adventurer?</Text>
      <TouchableOpacity onPress = {() => doRegister()} style={styles.registerMe}>
        <Text style={styles.loginText}> Begin your journey here!</Text>
      </TouchableOpacity>

    </View>
    </ImageBackground>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  menuWrap:{
    backgroundColor: "#FBE8B3",
    marginTop: 80,
    borderRadius: 25,
    width: "90%",
    height: "75%",
    alignItems: "center",
    borderColor : "#C92D2D",
    borderWidth: 4,
    overflow: "hidden",
  },

  wrap:{
    backgroundColor:"#a6dee3",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  image: {
    marginTop: -10,
    marginBottom: 20,
    width: 300,
    height: 100,
  },

  inputView: {
    backgroundColor: "#A1869E",
    borderRadius: 30,
    width: "65%",
    height: 40,
    margin: 14,
    alignItems: "center",
  },

  loginText:{
    fontWeight: "bold",
    color: "white",
  },

  TextInput: {
    height: 50,
    flex: 1,
    textAlign: 'center',
  },

  forgot_button: {
    height: 30,
    paddingTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    fontSize: 14,
    fontWeight: "bold",
    marginTop: -10,
    marginBottom: 10,
    padding: 20,
  },

  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  loginBtn: {
    width: "40%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#797596",
  },

  registerMe: {
    width: "60%",
    borderRadius: 20,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: "#797596",
  },
});